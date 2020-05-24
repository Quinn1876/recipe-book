import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom'

import Home from './pages/Home'
import Nav from './components/NavBar'
import { Theme } from './theme'

const About: React.FC = () => <div><h2>About</h2></div>

const App: React.FC = () => {
  return (
    <HashRouter basename="/">
      <div>
        {/* <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/theme">Theme</Link></li>
        </ul>

        <hr /> */}
        <Nav>
          <Link to="/">Home</Link>
          <Link to="/theme">Theme</Link>
        </Nav>

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/theme" component={Theme} />
      </div>
    </HashRouter>
  );
}

export default App;
