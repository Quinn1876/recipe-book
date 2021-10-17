import { useEffect, useMemo, useReducer, useCallback } from 'react';

import {
  State,
  Action,
  AddListItemType,
  DeleteListItemType,
  UpdateFieldType,
  useRecipeFormHook,
  UpdateListItemActions,
} from 'recipe-form';
import { RecipeQuery, RecipeResponse } from 'recipes';
import api from '../../../api';

export function isNewIngredient(object: any): object is RecipeQuery.NewIngredient {
  return (
    'name' in object
    && 'amount' in object
    && 'unitId' in object
  );
}

export function isNewDirection(object: any): object is RecipeQuery.NewDirection {
  return (
    'direction' in object
    && 'directionNumber' in object
  );
}


const newIngredient = (units: RecipeResponse.Unit[]): State['ingredients'][number] => ({ amount: 0, name: '', unit: units[0] });
const newDirection = (directionNumber: number): State['directions'][number] => ({ direction: '', directionNumber, });

const initializer = (initialState: RecipeQuery.UpdateRecipeRequest): State => ({
  ...initialState,
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
  case 'UpdateName':
    return {
      ...state,
      name: action.updateFieldPayload.value,
    };
  case 'UpdateDescription':
    return {
      ...state,
      description: action.updateFieldPayload.value,
    };
  case 'UpdateImage': {
    return {
      ...state,
      image: action.updateFieldPayload.value,
    };
  }
  case 'UpdateIngredient':
    return {
      ...state,
      ingredients: state.ingredients.map(
        (value, index) => (index === action.updateListItemPayload.index
          ? action.updateListItemPayload.value
          : value
        )
      ),
    };
  case 'AddIngredient':{
    const { units } = state;
    if (units) {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          newIngredient(units)
        ],
      };
    } else {
      return state;
    }
  }
  case 'DeleteIngredient':
    return {
      ...state,
      ingredients: state.ingredients.filter((_1, index) => index !== action.deleteListItemPayload.index),
    };
  case 'UpdateDirection':
    return {
      ...state,
      directions: state.directions.map(
        (value, index) => (index === action.updateListItemPayload.index
          ? action.updateListItemPayload.value
          : value
        )
      ),
    };
  case 'AddDirection':
    return {
      ...state,
      directions: [
        ...state.directions,
        newDirection(state.directions.reduce<number>((acc, curr) => Math.max(acc, curr.directionNumber), 0) + 1),
      ],
    };
  case 'DeleteDirection':
    return {
      ...state,
      directions: state.directions.filter((_1, index) => index !== action.deleteListItemPayload.index),
    };
  case 'SET_UNITS':
    return {
      ...state,
      units: action.unitsPayload,
    };
  default:
    return state;
  }
};



const useRecipeForm: useRecipeFormHook = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initializer(initialState));

  const updateField = useCallback(( type: UpdateFieldType ) => (value: string): void => {
    dispatch({ type, updateFieldPayload: { value }});
  }, [dispatch]);

  const updateListItem = useCallback((updateListItemAction: UpdateListItemActions): void => {
    dispatch(updateListItemAction);
  }, [dispatch]);

  const addListItem = useCallback((type: AddListItemType) => (): void => {
    dispatch({ type, addListItemPayload: {} });
  }, [dispatch]);

  const deleteListItem = useCallback((type: DeleteListItemType) => (index: number) => (): void => {
    dispatch({ type, deleteListItemPayload: {
      index,
    } });
  }, [dispatch]);

  const loading = useMemo<boolean>(() => !state.units, [state.units]);

  useEffect(() => {
    api.recipes.getUnits().then((units) => dispatch({ type: 'SET_UNITS', unitsPayload: units.data }));
  }, [dispatch]);

  return {
    loading,
    name: state.name,
    updateName: updateField('UpdateName'),
    description: state.description,
    updateDescription: updateField('UpdateDescription'),
    image: state.image,
    updateImage: updateField('UpdateImage'),
    ingredients: state.ingredients,
    addIngredient: addListItem('AddIngredient'),
    deleteIngredient: deleteListItem('DeleteIngredient'),
    directions: state.directions,
    updateListItem,
    addDirection: addListItem('AddDirection'),
    deleteDirection: deleteListItem('DeleteDirection'),
    units: state.units,
  };
};

export default useRecipeForm;
