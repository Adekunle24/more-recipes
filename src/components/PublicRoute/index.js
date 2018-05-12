import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import Toast from '../Notifier/toast';
import Home from './../Home/index';

function mapStateToProps(state) {
    return {

    };
}

class PublicRoute extends Component {
    constructor (props) {
        super(props);
    }
    
   
    render() {
        
        return (
            <div>
                <Toast />
                <Route exact path="/" component={Home} />
            </div>
        );
    }
}

export default withRouter(connect(
    mapStateToProps,
)(PublicRoute));