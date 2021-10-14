import React, { useCallback } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import ListEditor from '../../../components/FormControl/ListEditor';
import UnstyledTextInput from '../../../components/FormControl/TextInput';
import Paper from '@material-ui/core/Paper';
import UnstyledTypography from '@material-ui/core/Typography';
import UnstyledButton from '@material-ui/core/Button';
import useEditRecipeForm from '../hook/recipe-form';
import { RecipeQuery, RecipeResponse } from 'recipes';

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

interface Props {
  initialState: RecipeQuery.UpdateRecipeRequest;
  onBack: () => void;
  onSave: (recipe: RecipeQuery.UpdateRecipeRequest) => void;
}

const RecipeForm: React.FC<Props> = ({
  initialState,
  onBack,
  onSave,
}) => {
  const {
    name,
    ingredients,
    directions,
    description,
    updateName,
    updateDescription,
    addIngredient,
    addDirection,
    deleteIngredient,
    deleteDirection,
    updateIngredient,
    updateDirection,
  } = useEditRecipeForm(initialState);

  const handleSave = useCallback(() => {
    onSave({
      ...initialState,
      name,
      ingredients,
      description,
      directions
    });
  }, [name, ingredients, description, directions, initialState, onSave]);
  return (
    <Container elevation={4}>
      <Grid container justify="space-between">
        <FormGridItem>
          <Typography color="primary" variant="h6">
            Add New Recipe
          </Typography>
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
            items={ingredients}
            label="Ingredient"
            onAdd={addIngredient}
            onChange={updateIngredient}
            onRemove={deleteIngredient}
          />
        </FormGridItem>
        <FormGridItem item xs={12} md={6}>
          <ListEditor
            items={directions}
            label="Direction"
            onAdd={addDirection}
            onChange={updateDirection}
            onRemove={deleteDirection}
          />
        </FormGridItem>
      </Grid>
      <ButtonContainer>
        <Button onClick={onBack} color="primary" variant="outlined">
          Back
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default RecipeForm;
