import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navigator from './layouts/Navigator';
import store from './store/store';
import { Provider } from 'react-redux';
//import MallasStore from './store/MallasStore';
import EleccionMalla from './EleccionMalla';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#004600',
    },
    secondary: {
      main: '#26A69A',
    },
    /* positive: {
      main: '#21BA45',
    },
    negative: {
      main: '#C10015',
    }, */
  },
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Navigator />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
