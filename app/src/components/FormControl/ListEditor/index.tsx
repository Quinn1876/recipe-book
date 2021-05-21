import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import { Button, Typography } from '@material-ui/core';

const Container = styled.div`
  border: 1px solid ${({ theme }): string => theme.palette.primary.main};
  border-radius: 10px;
  padding: 8px;
  margin-right: 8px;
`;

interface Props {
  items: string[];
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => () => void;
  onAdd: () => void;
  className?: string;
  label: string;
}

const ListEditor: React.FC<Props> = ({
  className,
  items,
  onChange,
  onRemove,
  onAdd,
  label,
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
