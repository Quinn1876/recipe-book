import { useReducer, useCallback } from 'react';

import {
  State,
  Action,
  AddListItemType,
  DeleteListItemType,
  UpdateFieldType,
  UpdateListItemType,
  useRecipeFormHook
} from 'recipe-form';
import { RecipeQuery } from 'recipes';


const newIngredient = (recipeId: number): State['ingredients'][number] => ({ amount: 0, name: '', recipeId, unitId: 1 });
const newDirection = (recipeId: number, directionNumber: number): State['directions'][number] => ({ recipeId, direction: '', directionNumber, });

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
  case 'AddIngredient':
    return {
      ...state,
      ingredients: [
        ...state.ingredients,
        newIngredient()
      ],
    };
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
        newDirection(),
      ],
    };
  case 'DeleteDirection':
    return {
      ...state,
      directions: state.directions.filter((_1, index) => index !== action.deleteListItemPayload.index),
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

  const updateListItem = useCallback(( type: UpdateListItemType ) => (index: number, value: string): void => {
    dispatch({ type, updateListItemPayload: { value, index }});
  }, [dispatch]);

  const addListItem = useCallback((type: AddListItemType) => (): void => {
    dispatch({ type, addListItemPayload: {} });
  }, [dispatch]);

  const deleteListItem = useCallback((type: DeleteListItemType) => (index: number) => (): void => {
    dispatch({ type, deleteListItemPayload: {
      index,
    } });
  }, [dispatch]);

  return {
    name: state.name,
    updateName: updateField('UpdateName'),
    description: state.description,
    updateDescription: updateField('UpdateDescription'),
    image: state.image,
    updateImage: updateField('UpdateImage'),
    ingredients: state.ingredients,
    updateIngredient: updateListItem('UpdateIngredient'),
    addIngredient: addListItem('AddIngredient'),
    deleteIngredient: deleteListItem('DeleteIngredient'),
    directions: state.directions,
    updateDirection: updateListItem('UpdateDirection'),
    addDirection: addListItem('AddDirection'),
    deleteDirection: deleteListItem('DeleteDirection'),
  };
};

export default useRecipeForm;
