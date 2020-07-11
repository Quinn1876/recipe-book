import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../store/selectors';
import * as recipesActions from '../store/recipes/actions';

const useRecipes = () => {
  const recipes = useSelector(selectors.recipesByOrder);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(recipesActions.recipesLoadRequest());
  }, [dispatch])

  return {
    recipes
  }
}

export default useRecipes;
