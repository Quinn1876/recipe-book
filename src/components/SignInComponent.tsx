import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import TextInput, { onChangeHandler } from './FormControl/TextInput'

import { signInWithEmailAndPassword } from '../store/firebase/actions'


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
    marginTop: theme.spacing(2)
  }
}))

const SignInComponent = () => {
  const [email, updateEmail] = React.useState('')
  const [password, updatePassword] = React.useState('')
  const dispatch = useDispatch()

  const handleEmailChange: onChangeHandler = (event) => {
      updateEmail(event.target.value);
  }
  const handlePasswordChange: onChangeHandler = (event) => {
    updatePassword(event.target.value);
  }
  const handleFormSubmit = (email: string, password: string) => (event: object) => {
    updatePassword('')
    dispatch(signInWithEmailAndPassword(email, password))
  }

  const classes = useStyles();
  return (
    <Paper classes={{
      root: classes.root
    }}
    elevation={3}
    >
      <Typography variant='h6' color='textSecondary'>
        Sign-In
      </Typography>
      <TextInput
        value={email}
        onChange={handleEmailChange}
        label="Email"
        type='email'
      />
      <TextInput
        value={password}
        onChange={handlePasswordChange}
        label="Password"
        type='password'
      />
      <Button
      className={classes.button}
       variant='contained'
       color='primary'
       size="medium"
       onClick={handleFormSubmit(email, password)}
      >
        sign in
      </Button>
    </Paper>
  )
}

export default SignInComponent;
