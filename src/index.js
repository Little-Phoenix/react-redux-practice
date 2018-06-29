import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ClickCounter from './components/ClickCounter'

ReactDOM.render(<ClickCounter />, document.getElementById('root'));
registerServiceWorker();
