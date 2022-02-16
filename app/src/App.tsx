import React from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Nav from './components/NavBar';
import SignIn from './pages/sign-in/SignInPage';
import Home from './pages/home/Home';
import RecipeRouter from './pages/recipes/RecipeRouter';
import { Theme } from './theme';
import useAuth from './hooks/auth';
import { AuthContext } from './context/auth';
import SignUpPage from './pages/sign-up/SignUpPage';
import Profile from './pages/profile/ProfileContainer';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    width: '100%',
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  const { userId, signIn, signUp, loading: authenticating } = useAuth(true);
  return (
    <AuthContext.Provider value={{userId, signIn, signUp, loading: authenticating}}>
      <BrowserRouter basename="/">
        {!authenticating && (
          <div className={classes.root}>
            <Nav>
              <Link to="/recipes">Recipe List</Link>
              <Link to="/profile">Profile</Link>
              {/* <Link to="/home">Home</Link>
              <Link to="/theme">Theme</Link> */}
              {/* <Link to="/admin">Admin</Link> */}
            </Nav>
            <Route path="/" >
              <Redirect to="/recipes"/>
            </Route>
            <Route path="/recipes" component={RecipeRouter} />
            <Route path="/home" component={Home} />
            <Route path="/theme" component={Theme} />
            <Route path="/sign-in" component={SignIn} />
            {/* <Route path="/admin" component={AdminPage} /> */}
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/profile" component={Profile} />
          </div>
        )}
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
