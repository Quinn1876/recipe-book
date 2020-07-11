import React, { FC } from 'react';
import { Route, Redirect, useRouteMatch } from 'react-router-dom';

import RecipeList from './recipe-list/RecipeList';
import RecipeContainer from './recipe/RecipeContainer';

import withAuth from '../../hoc/AuthRedirect';

const RecipeRouter: FC = () => {
  const { path, url } = useRouteMatch();
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

export default withAuth(RecipeRouter);
