import React, { Component } from 'react';
import axios from 'axios';
import SimpleExpansionPanel from './accordion';
import history from '../utility/history';
import '../../index.css';

class Dashboard extends Component {
	constructor(props) {
        super(props);
        this.state = {
            data:{},
            loading: false,
        };
    }

    componentWillMount() {
    	if(!localStorage.getItem('user') || localStorage.getItem('user') === undefined) {
    		history.push('/');
    	}
    }

	async componentDidMount() {
		// var data = JSON.parse(localStorage.getItem('user'));
		// let requestObject = {
		// 	url: 'api/users/dashboard',
		// 	method: 'GET',
		// 	params: {
		// 		userId: data.data.mobile
		// 	}
		// }
		// let response = await axios(requestObject);
		// this.setState({data: response.data}, () => {
		// 	var stateCopy = Object.assign({}, this.state);
  //           stateCopy.loading = false;
  //           this.setState(stateCopy);
		// });
		// return response;
    }

    render() {
		return (
            <div className="dash_container">
            	<div className="m-b-20">
            		<img className="v_align" src={require('../../welcome.png')} />
            		<h3 className="v_align">Hi, Welcome to My-App!</h3>
        		</div>
        		<SimpleExpansionPanel data={this.state.data} />
            </div>
        );
    }
}

export default Dashboard;