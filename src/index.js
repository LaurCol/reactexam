import React, {useRef, useEffect, Fragment, useState} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import './index.css';
import './fontawesome.js';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
      
serviceWorker.unregister();



var btn = document.getElementById("navbar-button");
var menu=document.getElementById("navbar-menu");

btn.onclick = function() {
    menu.classList.toggle("active")
}