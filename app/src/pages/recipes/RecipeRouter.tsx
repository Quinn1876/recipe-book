import React, { FC } from 'react';
import { Route, Redirect, useRouteMatch } from 'react-router-dom';
import withAuthRedirect from '../../hoc/AuthRedirect';
import useRouterContext from '../../hooks/router-context';
import EditRecipePage from './edit-recipe/EditRecipePage';
import RecipeList from './recipe-list/RecipeList';
import RecipeContainer from './recipe/RecipeContainer';
import { RouterContext } from '../../context/router';
import NewRecipePage from './new-recipe/NewRecipePage';

const RecipeRouter: FC = () => {
  const { path } = useRouteMatch();
  const { pageContext } = useRouterContext('RecipeRouter');
  return (
    <RouterContext.Provider value={pageContext}>
      <Route exact strict path={`${path}/`}>
        <Redirect to={path}/>
      </Route>
      <Route exact path={path}>
        <RecipeList />
      </Route>
      <Route path={`${path}/recipe/:recipeId`}>
        <RecipeContainer />
      </Route>
      <Route path={`${path}/edit/:recipeId`}>
        <EditRecipePage />
      </Route>
      <Route path={`${path}/new`}>
        <NewRecipePage />
      </Route>
    </RouterContext.Provider>
  );
};

export default withAuthRedirect(RecipeRouter);
