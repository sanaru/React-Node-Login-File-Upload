import React, { Component } from 'react';
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Dashboard from './components/dashboard';
import Register from './components/register';
import history from './components/utility/history';

const PrivateRoute = ({ component: Component, ...rest }) => (
     <Route
        {...rest}
        render={props => (
            localStorage.getItem('user') ?
                <Component {...props} /> :
                <Redirect to = '/' />
        )}
    />
);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{},
            loading: true,
        }
    }

    render() {
        return (
           <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Register}  />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
        );
    }
}

export default App;

                    // <Route exact path="/dashboard" component={Dashboard} />

