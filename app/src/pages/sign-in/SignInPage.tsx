import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import SignInPaper from './components/SignInComponent';
import useAuthContext from '../../hooks/auth-context';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15vh;
`;

const SignIn: React.FC = () => {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated()) {
    return <Redirect to="/recipes" />;
  }
  return (
    <Container>
      <SignInPaper />
    </Container>
  );
};

export default SignIn;
