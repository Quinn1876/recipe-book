import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core'


import SignInPaper from '../components/SignInComponent'

import {signInWithEmailAndPassword} from '../store/firebase/actions'


const useStyles = makeStyles(theme => ({
  root: {
    height: 'calc(100vh - 88px)',
    backgroundColor: theme.palette.background.default,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}))


const Home = ({ }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SignInPaper />
    </div>
  )
}


export default Home
