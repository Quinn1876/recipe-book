import { useReducer, useCallback } from 'react';

interface UpdateFieldAction {
  updateFieldPayload: {
    value: string;
  };
}

interface UpdateListItemAction {
  updateListItemPayload: {
    value: string;
    index: number;
  };
}

interface UpdateNameAction extends UpdateFieldAction  {
  type: 'UpdateName';
}

interface UpdateDescriptionAction extends UpdateFieldAction {
  type: 'UpdateDescription';
}

interface UpdateImageAction extends UpdateFieldAction {
  type: 'UpdateImage';
}

interface UpdateIngredientAction extends UpdateListItemAction {
  type: 'UpdateIngredient';
}

interface UpdateDirectionAction extends UpdateListItemAction {
  type: 'UpdateDirection';
}

type State = RecipeResponse;
type Action = UpdateNameAction
            | UpdateDescriptionAction
            | UpdateImageAction
            | UpdateIngredientAction
            | UpdateDirectionAction;

type UpdateFieldType = SubUnion<Action, UpdateFieldAction>['type']
type UpdateListItemType = SubUnion<Action, UpdateListItemAction>['type']


const initializer = (initialState: RecipeResponse): State => ({
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
  default:
    return state;
  }
};

type useEditRecipeFormHook = (
  initialState: RecipeResponse
) => {
  name: string;
  updateName: (value: string) => void;
  description: string;
  updateDescription: (value: string) => void;
}

const useEditRecipeForm: useEditRecipeFormHook = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initializer(initialState));

  const updateField = useCallback(( type: UpdateFieldType ) => (value: string): void => {
    dispatch({ type, updateFieldPayload: { value }});
  }, [dispatch]);

  const updateListItem = useCallback(( type: UpdateListItemType ) => (index: number, value: string): void => {
    dispatch({ type, updateListItemPayload: { value, index }});
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
    directions: state.directions,
    updateDirection: updateListItem('UpdateDirection'),
  };
};

export default useEditRecipeForm;
