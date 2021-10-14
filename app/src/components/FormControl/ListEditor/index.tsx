import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import DefaultListItem from './ListItem';
import { Button, Typography } from '@material-ui/core';
import { Props } from 'components';

const Container = styled.div`
  border: 1px solid ${({ theme }): string => theme.palette.primary.main};
  border-radius: 10px;
  padding: 8px;
  margin-right: 8px;
`;

const ListEditor: React.FC<Props.ListEditor> = ({
  className,
  items,
  onChange,
  onRemove,
  onAdd,
  label,
  ListItem = DefaultListItem
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const handleChange = useCallback((index: number) => (value: string): void => {
    onChange(index, value);
  }, [onChange]);
  const listItems = items.map((item: string, index: number) => (
    <ListItem
      editable={activeItemIndex === index}
      onChange={handleChange(index)}
      onEdit={(): void => setActiveItemIndex(index)}
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
