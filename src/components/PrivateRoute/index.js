
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import AuthHome from './../Auth/index';
import AddRecipe from '../Recipes/add';
import Footer from './../Footer/index';
import Header from './../Header/index';

function mapStateToProps(state) {
    return {
        isAuthenticated: state.userReducer.isAuthenticated
    };
}

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        if(!this.props.isAuthenticated&&this.props.location.pathname!='/'){
            const {pathname} = this.props.location;
            return   <Redirect to={{pathname:'/',state:{from: pathname}}} />
        }
        if(this.props.isAuthenticated){
        return (
            <div>
             <Header cat={123} ></Header>
            <div className="container" id="body-container">
            <Route path="/home" component={AuthHome} />
            <Route path="/add-recipe" component={AddRecipe} />
            </div>
            <Footer></Footer>
            </div>
        );
        }
        return null;
    }
}

export default withRouter(connect(
    mapStateToProps,
)(PrivateRoute));