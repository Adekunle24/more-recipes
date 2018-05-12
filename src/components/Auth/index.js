import React from 'react';
import { connect } from 'react-redux';
import Header from './../Header/index';
import Footer from './../Footer/index';
import Filter  from './filter';
import { Redirect } from 'react-router-dom';


const mapStateToProps = state =>{
    return {
        isAuthenticated: state.isAuthenticated,
        authenticatedUser: state.authenticatedUser,
    };
};

class AuthHome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return ( 
            <div>
            <Filter></Filter>
            <div> Welcome to your personalized Home </div>
            </div>
        )
    }
}
export default connect(mapStateToProps)(AuthHome);