import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import ListEditor from '../../../components/FormControl/ListEditor';
import useNewRecipeForm from './hooks/new-recipe-form';
import useRouterContext from '../../../hooks/router-context';
import { useHistory } from 'react-router';
import UnstyledTextInput from '../../../components/FormControl/TextInput';
import Paper from '@material-ui/core/Paper';
import UnstyledTypography from '@material-ui/core/Typography';
import UnstyledButton from '@material-ui/core/Button';

const FormGridItem = styled(Grid)`
  padding-bottom: 16px;
`;

const TextInput = styled(UnstyledTextInput)`
  width: 100%;
`;

const Typography = styled(UnstyledTypography)``;

const Button = styled(UnstyledButton)`
  margin-left: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  ${Button}:first-child {
    margin-left: 0px;
  }
`;

const Container = styled(Paper)`
  margin-left: 64px;
  margin-right: 64px;
  margin-top: 32px;
  padding-left: 64px;
  padding-right: 64px;
  padding-top: 32px;
  padding-bottom: 32px;

  @media only screen and (max-width: 400px) {
    margin-left: 0;
    margin-right: 0;
    padding-left: 32px;
    padding-right: 32px;
    height: calc(100vh - 56px - 64px); // viewHeight - headerHeight - padding
  }

  max-width: 900px;
  @media only screen and (min-width: 1028px) { // maxWidth + margins
    margin-left: calc((100vw - 900px)/2);
    margin-right: calc((100vw - 900px)/2);
  }
`;

const NewRecipePage: React.FC = () => {
  const { routerContext } = useRouterContext();
  const history = useHistory();
  const {
    name,
    ingredients,
    directions,
    description,
    currentIngredient,
    currentDirection,
    updateName,
    updateDescription,
    addIngredient,
    addDirection,
    removeIngredient,
    removeDirection,
    updateCurrentIngredient,
    updateCurrentDirection,
    changeCurrentIngredient,
    changeCurrentDirection,
    onSubmit,
    // reset, // May not be needed
  } = useNewRecipeForm();

  const handleSave = useCallback(() => {
    if (name && ingredients && directions && description) {
      onSubmit().then(() => {
        history.push(`${routerContext.url}/`);
      });
    }
  }, [onSubmit, history, routerContext]);

  const handleBack = useCallback(() => {
    history.push(`${routerContext.url}/`);
  }, [history, routerContext]);

  return (
    <Container elevation={4}>
      <Grid container justify="space-between">
        <FormGridItem>
          <Typography color="primary" variant="h6">Add New Recipe</Typography>
        </FormGridItem>
        <FormGridItem item xs={12}>
          <TextInput label="Name" value={name} onChange={updateName} />
        </FormGridItem>
        <FormGridItem item xs={12}>
          <TextInput
            label="Description"
            multiline
            value={description}
            onChange={updateDescription}
          />
        </FormGridItem>
        <FormGridItem item xs={12} md={6}>
          <ListEditor
            activeItemIndex={currentIngredient}
            items={ingredients}
            label="Ingredient"
            onAdd={addIngredient}
            onChange={updateCurrentIngredient}
            onRemove={removeIngredient}
            onEdit={changeCurrentIngredient}
          />
        </FormGridItem>
        <FormGridItem item xs={12} md={6}>
          <ListEditor
            activeItemIndex={currentDirection}
            items={directions}
            label="Direction"
            onAdd={addDirection}
            onChange={updateCurrentDirection}
            onRemove={removeDirection}
            onEdit={changeCurrentDirection}
          />
        </FormGridItem>
      </Grid>
      <ButtonContainer>
        <Button onClick={handleBack} color="primary" variant="outlined">
          Back
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default NewRecipePage;
