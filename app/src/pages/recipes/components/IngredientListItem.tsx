import { IconButton, MenuItem, Select as MUISelect, Typography } from '@material-ui/core';
import { Props } from 'components';
import React, { useEffect, useRef } from 'react';
import { RecipeQuery, RecipeResponse } from 'recipes';
import styled from 'styled-components';
import TextInput from '../../../components/FormControl/TextInput';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Select = styled(MUISelect)`
  .MuiInputBase-input {
    color: ${({theme}): string => theme.palette.text.secondary};
  }
`;

const EditContainer = styled.div`
`;

const ViewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px dashed ${({ theme }): string => theme.palette.primary.main};
`;

const EditDeleteContainer = styled.div``;

const IngredientListItem = ({
  onChange,
  onDelete,
  onEdit,
  value,
  editable,
  units
}: Props.ListItem<RecipeQuery.UpdateRecipeRequest['ingredients'][number]> & {units: RecipeResponse.Unit[]}): React.ReactElement  | null => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editable && inputRef.current) {
      console.log('Setting input focus');
      inputRef.current.focus();
    }
  }, [editable]);

  const handleChange = (field: keyof typeof value | 'unit.id') => (newValue: string | number ): void => {
    if (field !== 'unit.id') {
      onChange({
        ...value,
        [field]: newValue
      });
    } else {
      onChange({
        ...value,
        unit: units.find((unit) => unit.id === (newValue as unknown as number)) as RecipeResponse.Unit // I don't known how to type this nicer
      });
    }
  };

  return editable ? (
    <EditContainer>
      <TextInput inputRef={inputRef} value={value.name} onChange={handleChange('name')} label="Ingredient" />
      <TextInput inputRef={inputRef} value={value.amount} onChange={handleChange('amount')} label="Amount" type="number"/>
      <Select
        label="Unit"
        color="primary"
        onChange={(e): void => handleChange('unit.id')(e.target.value as (typeof units)[number]['id'])}
        value={value.unit.id}
      >
        {units.map((unit) => <MenuItem key={unit.name} value={unit.id} >{unit.name}</MenuItem>)}
      </Select>
    </EditContainer>
  ) : (
    <ViewContainer>
      <Typography variant="body1" color="textSecondary">{value.amount} {value.unit.name} {value.name}</Typography>
      <EditDeleteContainer>
        <IconButton onClick={onEdit}><EditIcon/></IconButton>
        <IconButton onClick={onDelete}><DeleteIcon/></IconButton>
      </EditDeleteContainer>
    </ViewContainer>
  );
};

export default IngredientListItem;

type Args = Parameters<typeof IngredientListItem>;
