import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom'

// import Home from './pages/Home'

const Home: React.FC = () => <div><h2>Home</h2></div>
const About: React.FC = () => <div><h2>About</h2></div>

const App: React.FC = () => {
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
