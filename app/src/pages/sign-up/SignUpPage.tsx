import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Link as UnstyledLink, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import MUIButton from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextInput, {onChangeHandler} from '../../components/FormControl/TextInput';
import useSignUp from './hooks/sign-up';
import useAuthContext from '../../hooks/auth-context';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15vh;
`;

const SignUpPaper = styled(Paper)`
  background-color: ${({ theme }): string => theme.palette.background.paper};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 48px 40px 32px 40px;
`;

const Link = styled(UnstyledLink)`
  padding-top: 16px;
  color: ${({theme}): string => theme.palette.text.secondary};
`;

const Button = styled(MUIButton)`
  margin-top: 16px;
`;

const SignUpPage: React.FC = () => {
  const {
    email,
    password,
    name,
    confirmPassword,
    doChangeConfirmPassword,
    doChangeName,
    doChangeEmail,
    doChangePassword,
    doSignUpAttempt,
  } = useSignUp();

  const handleEmailChange: onChangeHandler = useCallback((event) => {
    doChangeEmail(event.target.value);
  }, [doChangeEmail]);

  const handlePasswordChange: onChangeHandler = useCallback((event) => {
    doChangePassword(event.target.value);
  }, [doChangePassword]);

  const handleFormSubmit = useCallback((): void => {
    doSignUpAttempt();
  }, [doSignUpAttempt]);

  const handleNameChange = useCallback((event) => {
    doChangeName(event.target.value);
  }, [doChangeName]);

  const handleConfirmPasswordChange = useCallback((event) => {
    doChangeConfirmPassword(event.target.value);
  }, [doChangeConfirmPassword]);

  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated()) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <SignUpPaper elevation={3}>
        <Typography variant="h6" color="textSecondary">
          Sign-Up
        </Typography>
        <TextInput
          value={name}
          onChange={handleNameChange}
          label="Name"
          type="text"
        />
        <TextInput
          value={email}
          onChange={handleEmailChange}
          label="Email"
          type="email"
        />
        <TextInput
          value={password}
          onChange={handlePasswordChange}
          label="Password"
          type="password"
        />
        <TextInput
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          label="Confirm Password"
          type="password"
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={handleFormSubmit}
        >
          sign up
        </Button>
        <Link to="/sign-in">Log In</Link>
      </SignUpPaper>
    </Container>
  );
};

export default SignUpPage;
