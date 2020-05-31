import React from 'react';
import { useSelector } from 'react-redux'
import { HashRouter, Route, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import Nav from './components/NavBar'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import RecipeList from './pages/recipe-list/RecipeList'
import { Theme } from './theme'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    width: '100%',
  }
}))


const About: React.FC = () => <div><h2>About</h2></div>

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <HashRouter basename="/">
      <div className={classes.root}>
        {/* <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/theme">Theme</Link></li>
        </ul>

        <hr /> */}
        <Nav>
          <Link to="/">Home</Link>
          <Link to="/theme">Theme</Link>
          <Link to="/recipes">Recipe List</Link>
        </Nav>

        {/* <Route exact path="/" component={Home} /> */}
        {/* <Route path="/about" component={About} />
        <Route path="/theme" component={Theme} />
        <Route path="/signIn" component={SignIn} />
        <Route path='/recipes' component={RecipeList} /> */}
        <Route path="/" component={RecipeList} />
      </div>
    </HashRouter>
  );
}

export default App;
