import React from 'react';
import styled from 'styled-components';

import MUICollapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import MUIArrowDropDown from '@material-ui/icons/ArrowDropDown';

const Collapse = styled(MUICollapse)``;
const ArrowDropDown = styled(MUIArrowDropDown)`
  color: white;
`;

const TopBar = styled.div`
  width: 100%;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-left: 32px;
  padding-right: 32px;

  // background-color: ${({ theme }) => theme.palette.primary.main};
  background-color: white;
  color: ${({ theme }) => theme.palette.text.primary};
  font: bold 14px Arial;

  width: 100%;
`;

const Container = styled.div``;

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
  const handleToggle = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    onToggle();
  };
  return (
    <Container className={className}>
      <TopBar>
        {title}
        <IconButton onClick={handleToggle} href="">
          <ArrowDropDown/>
        </IconButton>
      </TopBar>
      <Collapse in={open}>{children}</Collapse>
    </Container>
  );
};

export default DropList;
