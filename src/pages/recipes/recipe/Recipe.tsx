import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 215px;

  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const Recipe = () => {
  const params = useParams();
  console.log(params)
  return (
    <div>Recipe</div>
  );
};

export default Recipe;
