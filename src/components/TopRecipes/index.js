
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Filter from '../Auth/filter';
import axios from 'axios';

function mapStateToProps(state) {
    return {
        userToken: state.userReducer.userToken
    };
}

class TopRecipes extends Component {
    componentDidMount(){
        axios.defaults.headers['x-access-token'] = this.props.userToken;
    }
    render() {
        return (
            <div>
                <Filter></Filter>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(TopRecipes);