import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ClickCounter from './components/ClickCounter';
import EventLoop from './eventloop/EventLoop';
import MicroTask from './eventloop/MicroTask';
import Worker from './eventloop/Worker'

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';


const BasicRoute = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/clickcounter">ClickCounter</Link></li>
                <li><Link to="/eventloop">EventLoop</Link></li>
                <li><Link to="/microTask">MicroTask</Link></li>
                <li><Link to="/worker">Worker</Link></li>
                <li><Link to="/app">App</Link></li>
            </ul>

            <hr/>

            <Route exact path="/clickcounter" component={ ClickCounter }/>
            <Route path="/eventloop" component={ EventLoop } />
            <Route path="/microTask" component={ MicroTask } />
            <Route path="/worker" component={ Worker } />
            <Route path="/app" component={ App }/>
        </div>
    </Router>
)


ReactDOM.render(<BasicRoute />, document.getElementById('root'));
registerServiceWorker();
