import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        backgroundColor: '#5a8bb0',
        'max-height': '48px'
    },
    font_white: {
        color: 'white',
        'font-size': '16px',
        'font-weight': '600'
    },
    block:{
        'padding':'20px',
        'background-color': '#f0fff0',
        'background-image': 'url("https://www.transparenttextures.com/patterns/green-gobbler.png")'
    }
});

class SimpleExpansionPanel extends React.Component {
    // const { classes } = props;

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        };
        this.getUser = this.getUser.bind(this);
    }

    async getUser() {
        var data = JSON.parse(localStorage.getItem('user'));
        let requestObject = {
            url: 'api/users/dashboard',
            method: 'GET',
            params: {
                userId: data.data.mobile
            }
        }
        let response = await axios(requestObject);
        this.setState({data: response.data[0]}, () => {
            var stateCopy = Object.assign({}, this.state);
            stateCopy.loading = false;
            this.setState(stateCopy);
        });
        return response;
    }

    render() {
        return (
            <div >
                <ExpansionPanel >
                    <ExpansionPanelSummary className={this.props.classes.heading} onClick={this.getUser}>
                        <Typography className={this.props.classes.font_white}>About Me </Typography>
                    </ExpansionPanelSummary>
                 <ExpansionPanelDetails className={this.props.classes.block}>
                    <Typography >
                        {this.state.loading && (
                            <span>Loading...</span>
                        )}
                        {this.state.loading === false && (
                            <span>
                                <span className="flex f-16">
                                    You are now registered with us!
                                </span>
                                <img className="v_align image" src={this.state.data.profilePicture} />
                                <span className="v_align">
                                    <span>Name: {this.state.data.name} </span>
                                    <span>Contact: {this.state.data.mobile}</span>
                                </span>
                            </span>
                        )}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default withStyles(styles)(SimpleExpansionPanel);
