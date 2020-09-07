import React from 'react';
import { HashRouter, Route, Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Nav from './components/NavBar';
import SignIn from './pages/sign-in/SignIn';
import Home from './pages/home/Home';
import RecipeRouter from './pages/recipes/RecipeRouter';
import AdminPage from './pages/admin/AdminPage';
import { Theme } from './theme';

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
  return (
    <HashRouter basename="/">
      <div className={classes.root}>
        <Nav>
          <Link to="/">Home</Link>
          <Link to="/theme">Theme</Link>
          <Link to="/recipes">Recipe List</Link>
          <Link to="/admin">Admin</Link>
        </Nav>
        <Route path="/">
          <Redirect to="/recipes"/>
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/theme" component={Theme} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/recipes" component={RecipeRouter} />
        <Route path="/admin" component={AdminPage} />
      </div>
    </HashRouter>
  );
};

export default App;
