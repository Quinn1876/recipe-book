import React from 'react';
import styled from 'styled-components';
import { Link as UnstyledLink } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MUIButton from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import MUIFormControlLabel from '@material-ui/core/FormControlLabel';

import useSignIn from '../hooks/sign-in';

const FormControlLabel = styled(MUIFormControlLabel)`
  color: ${({ theme }): string => theme.palette.text.secondary};
`;

import TextInput, {
  onChangeHandler,
} from '../../../components/FormControl/TextInput';

const Link = styled(UnstyledLink)`
  padding-top: 16px;
  color: ${({theme}): string => theme.palette.text.secondary};
`;

const Container = styled(Paper)`
  background-color: ${({ theme }): string => theme.palette.background.paper};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 48px 40px 32px 40px;
`;

const Button = styled(MUIButton)`
  margin-top: 16px;
`;

const SignInComponent: React.FC = () => {
  const {
    email,
    password,
    rememberMe,
    toggleRememberMe,
    doChangeEmail,
    doChangePassword,
    doSignInAttempt,
  } = useSignIn();

  const handleEmailChange: onChangeHandler = event => {
    doChangeEmail(event.target.value);
  };
  const handlePasswordChange: onChangeHandler = event => {
    doChangePassword(event.target.value);
  };
  const handleFormSubmit = (email: string, password: string) => (): void => {
    doSignInAttempt(email, password);
  };

  return (
    <Container
      elevation={3}
    >
      <Typography variant="h6" color="textSecondary">
        Sign-In
      </Typography>
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
        onKeyPress={(event): void => {
          if (event.key === 'Enter'){
            handleFormSubmit(email, password);
          }
        }}
      />
      <FormControlLabel
        control={<Switch checked={rememberMe} onChange={toggleRememberMe} color="primary" />}
        label="Remember Me"
      />
      <Button
        variant="contained"
        color="primary"
        size="medium"
        onClick={handleFormSubmit(email, password)}
      >
        sign in
      </Button>
      <Link to="/sign-up">Create Account</Link>
    </Container>
  );
};

export default SignInComponent;
