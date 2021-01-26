import React from 'react';
import styled from 'styled-components';
import MUIIconButton from '@material-ui/core/IconButton';
import MUIArrowDropDown from '@material-ui/icons/ArrowDropDown';


const ArrowDropDown = styled(MUIArrowDropDown)`
  color: white;
`;

const IconButton = styled(MUIIconButton)`
  .flipped {
    transform: scaleY(-1);
  }
`;

interface Props {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  className?: string;

  isFlipped: boolean;
}

const DropdownArrow: React.FC<Props> = ({ onClick, className, isFlipped}) => {
  return (
    <IconButton className={className} onClick={onClick}>
      <ArrowDropDown className={isFlipped ? 'flipped' : ''}/>
    </IconButton>
  );
};

export default DropdownArrow;
