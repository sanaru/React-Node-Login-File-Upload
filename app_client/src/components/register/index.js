import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import history from '../utility/history';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import '../../index.css';

var _ = require('lodash');

const dropzone = {
	'height' : '40px',
	'width' : 'inherit',
    'position': 'relative',
    'height': '40px',
    'bottom': '7px',
    'width': 'inherit',
    'marginLeft': '10px'
}

class Register extends Component {
	constructor(props) {
        super(props);
        this.state = {
            data:{},
            loading: true,
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.getData = this.getData.bind(this);
    }

	componentDidMount() {
        var fields = {
            'name': '',
            'mobile':'',
        };
        this.setState({ data: fields}, () => {
            var stateCopy = Object.assign({}, this.state);
            stateCopy.loading = false;
            this.setState(stateCopy);
        });
    }

    getData() {
        this.setState({profilePicture: this.fileUpload.files[0]}, () => {
            // console.log(this.state);
        });
    }

    handleUserInput(e) {
     	var stateCopy = Object.assign({}, this.state);
        var name = e.target.name;
        var value = e.target.value;
        stateCopy.data[name] = value;
        this.setState(stateCopy);
    }

	async registerUser(e) {
        e.preventDefault();
        var stateCopy = Object.assign({}, this.state);
        var check = ['name', 'mobile'];
        var error = [];
        check.forEach(function(key) {
            if(stateCopy.data[key] === '') {
                error.push('fields');
            }
        });
        if( this.state.profilePicture === undefined) {
            error.push('profilePic');
        }
        if(error.length !== 0) {
            if(error[0] === 'fields') {
                NotificationManager.error('Form Incomplete!', '', 2000);
            } else{
                NotificationManager.error('Upload ypur Profile Picture', '', 2000);
            }

        }else {
            try {
                const data = new FormData();
                data.append('avatar', this.fileUpload.files[0]);
                data.append('filename', this.fileUpload.files[0].name);
                let reqObject = {
                    url: 'api/users/upload',
                    method: 'POST',
                    data: data
                }
                let res = await axios(reqObject);
                const imageUrl = res.data.data.fileUrl;
                var dataObject = {};
                dataObject.name = this.state.data.name;
                dataObject.mobile = this.state.data.mobile;
                dataObject.profilePicture = imageUrl
                let requestObject = {
                    url: 'api/users/register',
                    method: 'POST',
                    data: dataObject
                }
                let response = await axios(requestObject);
                localStorage.setItem('user', JSON.stringify(response));
                history.push('/dashboard');
                return response;
            } catch(err) {
                var error = JSON.stringify(err);
                error = JSON.parse(error);
                if(error.response.data.message) {
                    NotificationManager.error(error.response.data.message, '', 2000);
                }
            }
        }
	}

    render() {
        return (
            <div className="signup__container">
            	<div className="container__child signup__thumbnail">
				    <div className="thumbnail__content text-center">
				      	<h1 className="heading--primary">Welcome to My App.</h1>
				      	<h2 className="heading--secondary">Tell us more about yourself!!</h2>
				    </div>
				    <div className="signup__overlay"></div>
			  	</div>
            	<div className="container__child signup__form">
	            	<input type="text" name="name" value= {this.state.name} onChange={this.handleUserInput} placeholder="Full Name" />
	            	<input type="number" name="mobile" value={this.state.mobile} onChange={this.handleUserInput} placeholder="Contact" />
	            	<div className="flex m-b-15">
                        <label htmlFor="file-upload" className="w_33">
                            <img src={require('../../upload.png')} />
                            <span>Upload your Profile Picture</span>
                        </label>
                        <input id="file-upload" ref={(ref) => this.fileUpload = ref} onChange={this.getData} type="file"/>
                        {this.state && this.state.data && this.state.data.profilePicture && (
                            <span>{this.state.data.profilePicture.name}</span>
                        )}
					</div>
					<div className="btn_pos">
						<button type="button" className="submit_btn" onClick={this.registerUser}>Let's get started</button>
					</div>
            	</div>
                <NotificationContainer/>
            </div>
        );
    }
}

export default Register;
// <img src={require('../../upload.png')} />
//                         <input
//                             type='file' label='Upload'
//                             ref={(ref) => this.fileUpload = ref}
//                         />