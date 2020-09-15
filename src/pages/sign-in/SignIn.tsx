import React from 'react';
import { Redirect } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core';

// import SignInPaper from './components/SignInComponent';

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: theme.spacing(12),
//   },
// }));

const SignIn: React.FC = () => {
  // const classes = useStyles();

  // if (signedIn) {
  return <Redirect to="/" />;
  // }
  // return (
  //   <div className={classes.root}>
  //     <SignInPaper />
  //   </div>
  // );
};

export default SignIn;
