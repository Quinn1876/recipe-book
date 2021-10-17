import { IconButton, Typography } from '@material-ui/core';
import { Props } from 'components';
import React, { useEffect, useRef } from 'react';
import { RecipeQuery } from 'recipes';
import styled from 'styled-components';
import TextInput from '../../../components/FormControl/TextInput';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const EditContainer = styled.div`
`;

const ViewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px dashed ${({ theme }): string => theme.palette.primary.main};
`;

const EditDeleteContainer = styled.div``;

const DirectionListItem = ({
  onChange,
  onDelete,
  onEdit,
  value,
  editable,
}: Props.ListItem<RecipeQuery.UpdateRecipeRequest['directions'][number]>): React.ReactElement | null => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editable && inputRef.current) {
      console.log('Setting input focus');
      inputRef.current.focus();
    }
  }, [editable]);

  const handleChange = (field: 'direction' | 'directionNumber') => (newValue: string | number ): void => {
    onChange({
      ...value,
      [field]: newValue
    });
  };

  return editable ? (
    <EditContainer>
      <TextInput inputRef={inputRef} value={value.direction} onChange={handleChange('direction')} label="Direction" />
      <TextInput inputRef={inputRef} value={value.directionNumber} onChange={handleChange('directionNumber')} label="Direction Number" type="number"/>
    </EditContainer>
  ) : (
    <ViewContainer>
      <Typography variant="body1" color="textSecondary">{value.directionNumber}. {value.direction}</Typography>
      <EditDeleteContainer>
        <IconButton onClick={onEdit}><EditIcon/></IconButton>
        <IconButton onClick={onDelete}><DeleteIcon/></IconButton>
      </EditDeleteContainer>
    </ViewContainer>
  );
};

export default DirectionListItem;
