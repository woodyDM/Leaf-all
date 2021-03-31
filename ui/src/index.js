import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css'
import PageRoute from './PageRoute';
import {BrowserRouter, Route} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Route component={PageRoute}/>
        </BrowserRouter>
    </React.StrictMode>
    ,
    document.getElementById('root')
);
