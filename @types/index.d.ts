
declare module '*.svg' {
  import React from 'react';
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

/*
  Not sure why, but putting this module declaration anywhere else
  causes react to think it does not exist.
*/
declare module 'recipe-form' {

  export interface SetUnitsAction {
    type: 'SET_UNITS';
    unitsPayload: RecipeResponse.Unit[];
  }
  export interface UpdateFieldAction {
    updateFieldPayload: {
      value: string;
    };
  }
  export type UpdateFieldCb = (value: string) => void;

  export interface UpdateListItemAction<T> {
    updateListItemPayload: {
      value: T;
      index: number;
    };
  }
  export type UpdateListItemCb = (updateListItemAction: UpdateListItemActions) => void;

  export interface DeleteListItemAction {
    deleteListItemPayload: {
      index: number;
    };
  }
  export type DeleteListItemCb = (index: number) => () => void;

  export interface AddListItemAction {
    addListItemPayload: {};
  }
  export type AddListItemCb = () => void;

  export interface UpdateNameAction extends UpdateFieldAction  {
    type: 'UpdateName';
  }

  export interface UpdateDescriptionAction extends UpdateFieldAction {
    type: 'UpdateDescription';
  }

  export interface UpdateImageAction extends UpdateFieldAction {
    type: 'UpdateImage';
  }

  export interface UpdateIngredientAction extends UpdateListItemAction<RecipeQuery.NewIngredient> {
    type: 'UpdateIngredient';
  }

  export interface DeleteIngredientAction extends DeleteListItemAction {
    type: 'DeleteIngredient';
  }

  export interface AddIngredientAction extends AddListItemAction {
    type: 'AddIngredient';
  }

  export interface UpdateDirectionAction extends UpdateListItemAction<RecipeQuery.NewDirection> {
    type: 'UpdateDirection';
  }

  export interface DeleteDirectionAction extends DeleteListItemAction {
    type: 'DeleteDirection';
  }

  export interface AddDirectionAction extends AddListItemAction {
    type: 'AddDirection';
  }

  import { RecipeQuery, RecipeResponse } from 'recipes';
  export type State = RecipeQuery.UpdateRecipeRequest & { units?: RecipeResponse.Unit[]};
  export type Action = UpdateNameAction
                    | UpdateDescriptionAction
                    | UpdateImageAction
                    | UpdateDirectionAction
                    | UpdateIngredientAction
                    | DeleteDirectionAction
                    | DeleteIngredientAction
                    | AddIngredientAction
                    | AddDirectionAction
                    | SetUnitsAction;

  export type UpdateFieldType = SubUnion<Action, UpdateFieldAction>['type'];
  export type UpdateListItemType = SubUnion<Action, UpdateListItemAction<unknown>>['type'];
  export type UpdateListItemActions = SubUnion<Action, UpdateListItemAction<unknown>>;

  type UpdateListItemValueFromType<T, U> = T

  export type DeleteListItemType = SubUnion<Action, DeleteListItemAction>['type'];
  export type AddListItemType = SubUnion<Action, AddListItemAction>['type'];

  export type useRecipeFormHook = (
    initialState: State
  ) => {
    name:               State['name'];
    updateName:         UpdateFieldCb;
    description:        State['description'];
    updateDescription:  UpdateFieldCb;
    image?:             State['image'];
    updateImage:        UpdateFieldCb;
    ingredients:        State['ingredients'];
    updateListItem:     UpdateListItemCb;
    addIngredient:      AddListItemCb;
    deleteIngredient:   DeleteListItemCb;
    directions:         State['directions'];
    addDirection:       AddListItemCb;
    deleteDirection:    DeleteListItemCb;
    loading:            boolean;
    units?:              RecipeResponse.Unit[];
  }
}
