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
  export interface UpdateFieldAction {
    updateFieldPayload: {
      value: string;
    };
  }
  export type UpdateFieldCb = (value: string) => void;

  export interface UpdateListItemAction {
    updateListItemPayload: {
      value: string;
      index: number;
    };
  }
  export type UpdateListItemCb = (index: number, value: string) => void;

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

  export interface UpdateIngredientAction extends UpdateListItemAction {
    type: 'UpdateIngredient';
  }

  export interface DeleteIngredientAction extends DeleteListItemAction {
    type: 'DeleteIngredient';
  }

  export interface AddIngredientAction extends AddListItemAction {
    type: 'AddIngredient';
  }

  export interface UpdateDirectionAction extends UpdateListItemAction {
    type: 'UpdateDirection';
  }

  export interface DeleteDirectionAction extends DeleteListItemAction {
    type: 'DeleteDirection';
  }

  export interface AddDirectionAction extends AddListItemAction {
    type: 'AddDirection';
  }

  export type State = RecipeResponse;
  export type Action = UpdateNameAction
                    | UpdateDescriptionAction
                    | UpdateImageAction
                    | UpdateDirectionAction
                    | UpdateIngredientAction
                    | DeleteDirectionAction
                    | DeleteIngredientAction
                    | AddIngredientAction
                    | AddDirectionAction;

  export type UpdateFieldType = SubUnion<Action, UpdateFieldAction>['type'];
  export type UpdateListItemType = SubUnion<Action, UpdateListItemAction>['type'];
  export type DeleteListItemType = SubUnion<Action, DeleteListItemAction>['type'];
  export type AddListItemType = SubUnion<Action, AddListItemAction>['type'];

  export type useRecipeFormHook = (
    initialState: RecipeResponse
  ) => {
    name: string;
    updateName: UpdateFieldCb;
    description: string;
    updateDescription: UpdateFieldCb;
    image?: string;
    updateImage: UpdateFieldCb;
    ingredients: string[];
    updateIngredient: UpdateListItemCb;
    addIngredient: AddListItemCb;
    deleteIngredient: DeleteListItemCb;
    directions: string[];
    updateDirection: UpdateListItemCb;
    addDirection: AddListItemCb;
    deleteDirection: DeleteListItemCb;
  }
}
