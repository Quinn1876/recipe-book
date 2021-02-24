import React from 'react';
import process from 'process';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextInput from '../../components/FormControl/TextInput';

import useDisplayNameDialog from './hooks/display-name-dialog';

import withAuth from '../../hoc/AuthRedirect';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '32px',
    padding: '32px',
    backgroundColor: theme.palette.background.paper,
  },
  dialogTitle: {
    color: theme.palette.primary.main,
  },
}));

const AdminPage: React.FC = () => {
  const { root, dialogTitle } = useStyles();
  const { name, open, doOpen, doClose, doChangeName } = useDisplayNameDialog();

  if (process.env.NODE_ENV !== 'development') {
    return <Redirect to="/home" />;
  }

  const handleAddRecipe = (): void => {
    console.log('DEV COMMAND: Adding Recipe...');
    const recipe: NewRecipeRequest = {
      name: 'Dev Recipe',
      description: 'This is a development Recipe added as a test',
      directions: ['Add Cookies to Sheet', 'Eat the cookies'],
      ingredients: [
        '3/4 cup sugar',
      ],
    };
    console.log('Recipe: ', recipe);
    // dispatch(RecipesActions.recipeAddRequest(recipe));
  };

  const handleAddFriend = (): void => {
    console.log('DEV COMMAND: Adding Friend...');
  };

  const handleChangeName = (): void => {
    console.log('DEV COMMAND: Changing Name...');
    // Firebase.updateUserDisplayName(name);
    doClose();
  };

  const handleLogRecipes = (): void => {
    // console.log(recipes);
  };

  const handleGetRecipes = (): void => {
    console.log('DEV COMMAND: Getting Recipes...');
    // dispatch(RecipesActions.recipesLoadRequest());
  };

  const handleLogState = (): void => {
    // console.log(state);
  };

  return (
    <>
      <Paper variant="outlined" className={root} elevation={2}>
        <Grid container justify="center" direction="column" spacing={2}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleAddRecipe}
            >
              Add Recipe
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleAddFriend}
            >
              Add Friend
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={doOpen}
            >
              Update DisplayName
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleGetRecipes}
            >
              Get Recipes
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleLogRecipes}
            >
              Log Recipes
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleLogState}
            >
              Log State
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Dialog open={open} onClose={doClose}>
        <DialogTitle className={dialogTitle}>Update Display Name</DialogTitle>
        <DialogContent>
          <TextInput
            label="Display Name"
            value={name}
            onChange={(event): void => doChangeName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="primary"
            size="medium"
            onClick={doClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleChangeName}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withAuth(AdminPage);
