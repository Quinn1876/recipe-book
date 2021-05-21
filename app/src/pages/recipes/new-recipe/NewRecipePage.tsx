import React, { useCallback } from 'react';
import useRouterContext from '../../../hooks/router-context';
import { useHistory } from 'react-router';
import api from '../../../api';
import RecipeForm from '../components/RecipeForm';



const NewRecipePage: React.FC = () => {
  const { routerContext } = useRouterContext();
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

  return (
    <RecipeForm
      initialState={{
        createdAt: Date.now(),
        description: '',
        directions: [],
        id: '',
        ingredients: [],
        name: '',
        ownerId: '',
      }}
      onSave={handleSave}
      onBack={handleBack}
    />
  );
};

export default NewRecipePage;
