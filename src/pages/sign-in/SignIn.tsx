import React from 'react';
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core'


import SignInPaper from './components/SignInComponent'

import { isSignedIn } from '../../store/selectors'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(12)
  }
}))


const SignIn = () => {
  const classes = useStyles();
  const signedIn = useSelector( isSignedIn );

  if (signedIn) {
    return <Redirect to="/" />
  }

  return (
    <div className={classes.root}>
      <SignInPaper />
    </div>
  )
}


export default SignIn
