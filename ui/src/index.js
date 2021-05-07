import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css'
import PageEntry from './page/PageEntry';
import { Route, BrowserRouter } from 'react-router-dom';
ReactDOM.render(
  <BrowserRouter>
    <Route component={PageEntry} />
  </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
