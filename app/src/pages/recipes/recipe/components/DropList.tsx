import React from 'react';
import styled from 'styled-components';

import MUICollapse from '@material-ui/core/Collapse';
import MUITypography from '@material-ui/core/Typography';

import DropDownArrow from '../../../../components/DropdownArrow';

const Collapse = styled(MUICollapse)`
  background-color: white;
`;

const TopBar = styled.div`
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-left: 32px;
  padding-right: 20px;

  background-color: ${({ theme }): string => theme.palette.primary.main};
`;

const Title = styled(MUITypography)`
  color: ${({ theme }): string => theme.palette.text.primary};
  font: bold 14px Arial;
`;

const Container = styled.div`
  cursor: pointer;
`;

interface DropDownProps {
  title: string;
  className?: string;
  open: boolean;
  onToggle: () => void;
}

const DropList: React.FC<DropDownProps> = ({
  title,
  className,
  children,
  open,
  onToggle,
}) => {
  const handleToggle = (): void => {
    onToggle();
  };
  return (
    <Container className={className} onClick={handleToggle}>
      <TopBar>
        <Title>{title}</Title>
        <DropDownArrow onClick={handleToggle} isFlipped={open} />
      </TopBar>
      <Collapse in={open}>{children}</Collapse>
    </Container>
  );
};

export default DropList;
