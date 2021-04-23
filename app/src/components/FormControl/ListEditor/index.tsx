import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import { onChangeHandler } from '../TextInput';
import { Button, Typography } from '@material-ui/core';

const Container = styled.div`
  border: 1px solid ${({ theme }): string => theme.palette.primary.main};
  border-radius: 10px;
  padding: 8px;
  margin-right: 8px;
`;

interface Props {
  items: string[];
  activeItemIndex: number;
  onChange: onChangeHandler;
  onRemove: (index: number) => () => void;
  onAdd: () => void;
  onEdit: (index: number) => () => void;
  className?: string;
  label: string;
}

const ListEditor: React.FC<Props> = ({
  className,
  items,
  activeItemIndex,
  onChange,
  onRemove,
  onAdd,
  onEdit,
  label,
}) => {
  const listItems = items.map((item: string, index: number) => (
    <ListItem
      editable={activeItemIndex === index}
      onChange={onChange}
      onEdit={onEdit(index)}
      onDelete={onRemove(index)}
      value={item}
      key={index}
    />
  ));

  const containerRef = useRef<HTMLDivElement>(null);
  const handelEnter = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      if (containerRef.current) {
        containerRef.current.blur();
        onAdd();
      }
    }
  }, [onAdd]);

  useEffect(() => {
    if (items.length === 0) {
      onAdd();
    }
  }, [items]);

  return (
    <Container ref={containerRef} className={className} onKeyPress={handelEnter}>
      <Typography variant="h6" color="textSecondary">{label}s</Typography>
      {listItems}
      <Button onClick={onAdd} color="primary">Add {label}</Button>
    </Container>
  );
};

export default ListEditor;
