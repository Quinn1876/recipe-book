import React from 'react'
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'

import RecipeListItem from './components/RecipeListItem';

import * as Selectors from '../../../store/selectors';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
}));

const recipeMap =  (recipe: Recipe) => <Grid item xs={12} md={4} lg={3} xl={2}><RecipeListItem recipe={recipe} /></Grid>;

const RecipeList = () => {
  const classes = useStyles();
  const recipes = useSelector(Selectors.recipes);

  const recipeItems = recipes.map(recipeMap);

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      alignItems="center"
    >
      {recipeItems}
    </Grid>
  );
};

export default RecipeList;
