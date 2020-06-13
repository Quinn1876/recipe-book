import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import useSignIn from '../hooks/sign-in';

import TextInput, {
  onChangeHandler,
} from '../../../components/FormControl/TextInput';

const useStyles = makeStyles(theme => ({
  root: {
    // width: '40%',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: theme.spacing(6, 5),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const SignInComponent = () => {
  const classes = useStyles();
  const {
    email,
    password,
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
  const handleFormSubmit = (email: string, password: string) => (
    event: object
  ) => {
    doSignInAttempt()
  };

  return (
    <Paper
      classes={{
        root: classes.root,
      }}
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
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        size="medium"
        onClick={handleFormSubmit(email, password)}
      >
        sign in
      </Button>
    </Paper>
  );
};

export default SignInComponent;
