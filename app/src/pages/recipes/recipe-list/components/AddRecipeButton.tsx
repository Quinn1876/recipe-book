import React from 'react';
import styled from 'styled-components';
import MUIPaper from '@material-ui/core/Paper';
import MUITypography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import UnstlyedAddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const Header = styled(MUITypography)`
  padding-left: 8px;
`;
const AddCircleOutlineIcon = styled(UnstlyedAddCircleOutlineIcon)`
  color: ${({ theme }): string => theme.palette.text.secondary};
`;

const Paper = styled(MUIPaper)`
  width: 311px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}): string => theme.palette.background.paper};
  cursor: pointer;

`;


interface Props {
  onClick: () => void;
}

const AddRecipeButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Paper elevation={2} onClick={onClick} component={ButtonBase}>
      <AddCircleOutlineIcon />
      <Header variant="h6" color="textSecondary">
        Add Recipe
      </Header>
    </Paper>
  );
};

export default AddRecipeButton;
