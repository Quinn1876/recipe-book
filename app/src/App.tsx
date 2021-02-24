import React from 'react';
import { HashRouter, Route, Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Nav from './components/NavBar';
import SignIn from './pages/sign-in/SignInPage';
import Home from './pages/home/Home';
import RecipeRouter from './pages/recipes/RecipeRouter';
import AdminPage from './pages/admin/AdminPage';
import { Theme } from './theme';
import useAuth from './hooks/auth';
import { AuthContext } from './context/auth';
import SignUpPage from './pages/sign-up/SignUpPage';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    width: '100%',
  },
}));

const About: React.FC = () => (
  <div>
    <h2>About</h2>
  </div>
);

const App: React.FC = () => {
  const classes = useStyles();
  const { userId, signIn, signUp, loading } = useAuth(true);
  return (
    <AuthContext.Provider value={{userId, signIn, signUp, loading}}>
      <HashRouter basename="/">
        {!loading && (
          <div className={classes.root}>
            <Nav>
              <Link to="/">Home</Link>
              <Link to="/theme">Theme</Link>
              <Link to="/recipes">Recipe List</Link>
              {/* <Link to="/admin">Admin</Link> */}
            </Nav>
            <Route path="/" >
              <Redirect to="/recipes"/>
            </Route>
            <Route path="/recipes" component={RecipeRouter} />
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/theme" component={Theme} />
            <Route path="/sign-in" component={SignIn} />
            {/* <Route path="/admin" component={AdminPage} /> */}
            <Route path="/sign-up" component={SignUpPage} />
          </div>
        )}
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;
