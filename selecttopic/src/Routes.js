import React from 'react';
//import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import browserHistory from "./history";
import {Router, Route} from 'react-router';
import {Provider} from 'react-redux';
import {BrowserRouter,Switch} from 'react-router-dom';

import {syncHistoryWithStore} from 'react-router-redux';

import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Admin from "./components/admin/Admin";
import Student from "./components/student/Student";
import Teacher from "./components/teacher/Teacher";
import store from './Store.js';

const createElement = (Component, props) => {
    return (
        <Provider store={store}>
            <Component {...props} />
        </Provider>
    );
};

const history = syncHistoryWithStore(browserHistory, store);

const Routes = () => (
    <BrowserRouter>
        <Router history={history} createElement={createElement}>
            <Switch>
                <Route path="/" component={Login} exact={true}/>
                <Route path="/login" component={Login} exact={true}/>
                <Route path="/register" component={Register} />
                <Route path="/teacher" component={Teacher} />
                <Route path="/student" component={Student} />
                <Route path="/admin" component={Admin} />
            </Switch>
        </Router>
    </BrowserRouter>
)

export default Routes;
