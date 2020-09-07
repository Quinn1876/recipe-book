import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import App from './App';
import theme, { theme as styledTheme } from './theme';

import { unregister } from './serviceWorker';

import { config } from 'dotenv';
config();

document.body.style.margin = 0;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <StyledThemeProvider theme={styledTheme}>
      <App />
    </StyledThemeProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();
