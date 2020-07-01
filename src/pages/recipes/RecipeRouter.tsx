import React, { FC } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';

import RecipeList from './recipe-list/RecipeList';
import Recipe from './recipe/Recipe';

const RecipeRouter: FC = () => {
  const { path, url } = useRouteMatch();
  console.log('path', path);
  console.log('url', url);
  return (
    <>
      <Route exact strict path={`${path}/`}>
        <Redirect to={path}/>
      </Route>
      <Route exact path={path}>
        <RecipeList />
      </Route>
      <Route path={`${path}/:recipeId`}>
        <Recipe />
      </Route>
    </>
  );
};

export default RecipeRouter;
