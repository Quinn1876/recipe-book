import React, { FC } from 'react';
import { Route, Redirect, useRouteMatch } from 'react-router-dom';
import withAuthRedirect from '../../hoc/AuthRedirect';

import RecipeList from './recipe-list/RecipeList';
import RecipeContainer from './recipe/RecipeContainer';

const RecipeRouter: FC = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <Route exact strict path={`${path}/`}>
        <Redirect to={path}/>
      </Route>
      <Route exact path={path}>
        <RecipeList />
      </Route>
      <Route path={`${path}/:recipeId`}>
        <RecipeContainer />
      </Route>
    </>
  );
};

export default withAuthRedirect(RecipeRouter);
