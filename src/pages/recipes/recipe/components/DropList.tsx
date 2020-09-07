import React from 'react';
import styled from 'styled-components';

import MUICollapse from '@material-ui/core/Collapse';
import MUIArrowDropDown from '@material-ui/icons/ArrowDropDown';
import MUITypography from '@material-ui/core/Typography';

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
  title: string
  className?: string
}

const DropList: React.FC<DropDownProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      <TopBar>
        {title}
        <ArrowDropDown/>
      </TopBar>
      <Collapse>
        {children}
      </Collapse>
    </Container>
  );
};

export default DropList;
