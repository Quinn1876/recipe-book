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
import IngredientListItem from './IngredientListItem';
import DirectionListItem from './DirectionListItem';

const FormGridItem = styled(Grid)`
  padding-bottom: 16px;
`;

const TextInput = styled(props => <UnstyledTextInput<string> {...props} />)`
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
  @media only screen and (min-width: 1028px) {
    // maxWidth + margins
    margin-left: calc((100vw - 900px) / 2);
    margin-right: calc((100vw - 900px) / 2);
  }
`;

interface Props {
  initialState: RecipeQuery.UpdateRecipeRequest;
  onBack: () => void;
  onSave: (recipe: RecipeQuery.UpdateRecipeRequest) => void;
}

const RecipeForm: React.FC<Props> = ({ initialState, onBack, onSave }) => {
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
    updateListItem,
    loading,
    units,
  } = useEditRecipeForm(initialState);

  const handleSave = useCallback(() => {
    onSave({
      ...initialState,
      name,
      ingredients,
      description,
      directions,
    });
  }, [name, ingredients, description, directions, initialState, onSave]);

  const handleIngredientUpdated = (
    index: number,
    ingredient: RecipeQuery.NewIngredient,
  ): void => {
    updateListItem({
      type: 'UpdateIngredient',
      updateListItemPayload: {
        index,
        value: ingredient,
      },
    });
  };

  const handleDirectionUpdated = (
    index: number,
    direction: RecipeQuery.NewDirection,
  ): void => {
    updateListItem({
      type: 'UpdateDirection',
      updateListItemPayload: {
        index,
        value: direction,
      },
    });
  };

  return loading ? (
    <></>
  ) : (
    <Container elevation={4}>
      <Grid container justify="space-between">
        <FormGridItem>
          <Typography color="primary" variant="h6">
            Add New Recipe
          </Typography>
        </FormGridItem>
        <FormGridItem item xs={12}>
          <TextInput label="Name" value={name as string} onChange={updateName} />
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
            label="Ingredients"
            onAdd={addIngredient}
            onChange={handleIngredientUpdated}
            onRemove={deleteIngredient}
            ListItem={IngredientListItem}
            additionalProps={{units}}
          />
        </FormGridItem>
        <FormGridItem item xs={12} md={6}>
          <ListEditor
            items={directions}
            label="Directions"
            onAdd={addDirection}
            onChange={handleDirectionUpdated}
            onRemove={deleteDirection}
            ListItem={DirectionListItem}
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
