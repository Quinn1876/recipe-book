import React, { useCallback } from 'react';
import useRouterContext from '../../../hooks/router-context';
import { useHistory } from 'react-router';
import api from '../../../api';
import RecipeForm from '../components/RecipeForm';
import useAuthContext from '../../../hooks/auth-context';



const NewRecipePage: React.FC = () => {
  const { routerContext } = useRouterContext();
  const { userId } = useAuthContext();
  const history = useHistory();

  const handleSave = useCallback(({ name, ingredients, directions, description}) => {
    if (name && ingredients && directions && description) {
      api
        .recipes
        .createRecipe({
          name,
          directions,
          description,
          ingredients,
        })
        .then(() => {
          history.push(`${routerContext.url}/`);
        });
    }
  }, [history, routerContext]);

  const handleBack = useCallback(() => {
    history.push(`${routerContext.url}/`);
  }, [history, routerContext]);

  return userId ? (
    <RecipeForm
      initialState={{
        description: '',
        directions: [],
        id: -1,
        ingredients: [],
        name: '',
        ownerId: userId,
      }}
      onSave={handleSave}
      onBack={handleBack}
    />
  ) : ( // TODO Add loading screen
    <></>
  );
};

export default NewRecipePage;
