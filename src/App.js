import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom'

function App() {
  return (
    <HashRouter basename="/">
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </div>
    </HashRouter>
  );
}

export default App;
