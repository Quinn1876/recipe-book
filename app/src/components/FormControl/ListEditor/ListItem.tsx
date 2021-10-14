import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Typography, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextInput from '../TextInput';
import { Props } from 'components';

const EditContainer = styled.div`
`;

const ViewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px dashed ${({ theme }): string => theme.palette.primary.main};
`;

const EditDeleteContainer = styled.div``;

const ListItem: React.FC<Props.ListItem> = ({
  value,
  editable = false,
  onChange,
  onEdit,
  onDelete,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editable && inputRef.current) {
      console.log('Setting input focus');
      inputRef.current.focus();
    }
  }, [editable]);
  return editable ? (
    <EditContainer>
      <TextInput inputRef={inputRef} value={value} onChange={onChange} label="" />
    </EditContainer>
  ) : (
    <ViewContainer>
      <Typography variant="body1" color="textSecondary">{value}</Typography>
      <EditDeleteContainer>
        <IconButton onClick={onEdit}><EditIcon/></IconButton>
        <IconButton onClick={onDelete}><DeleteIcon/></IconButton>
      </EditDeleteContainer>
    </ViewContainer>
  );
};

export default ListItem;
