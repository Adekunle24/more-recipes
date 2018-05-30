import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../Footer';
import { connect } from 'react-redux';
import { logOutUser } from './../../actions/index';
import { Link } from 'react-router-dom';

const mapStateToProps = state =>{
  return {
    isAuthenticated: state.userReducer.isAuthenticated,
    authenticatedUser: state.userReducer.authenticatedUser,
  };
};
const mapDispatchToProps = dispatch =>{
  return {
    logOutUser: data => dispatch(logOutUser())
  };
};
class Header extends React.Component{
    constructor(){
        super();
        this.state = {
            txt: 'this is the state text'
        }
        this.action = this.action.bind(this);
    }
    update(e){
        this.setState({txt: e.target.value});
    }
    action(e){
        this.setState({txt: e.type});
    }
    render(){
        return (
               <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand" href="#page-top">MoreRecipes</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
            <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/top-recipes">Top Recipes</Link>
            </li>
             <li className="nav-item">
              <a className="nav-link" href="#services">Latest Recipes</a>
            </li>
             <li className="nav-item">
              <Link className="nav-link" to="/add-recipe">Add Recipe</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" href="#services">More</a>
							<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item" href="#">FAQs</a>
    <a className="dropdown-item" href="#">Feeback</a>
    <a className="dropdown-item" href="#">Contact us</a> 
		<a className="dropdown-item" href="#">Help & Support</a>
  </div>
            </li>
          </ul>
            <form className="form-inline">
    <input className="form-control mr-sm-2" type="text" onClick={this.action} onChange={this.update.bind(this)} placeholder="Search" aria-label="Search" />
    <button className="btn btn-outline-success my-2 my-sm-0 cursor-pointer" type="submit">Search</button>
  </form>
  {this.props.isAuthenticated ? 
   <div> <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle hover-white" data-toggle="dropdown" aria-haspopup="true">
				<span className="comment-author">{this.props.authenticatedUser.username} <img src="/images/avatar.jpg" className="float-left"  />
        </span>
             </a>
          <div className="dropdown-menu" role="menu">
          <Link to="/add-recipe" className="dropdown-item"  ><i className="fa fa-plus-square padding-right-10"></i>Add Recipe</Link>
						   <a className="dropdown-item" href="#"><i className="fa fa-gear padding-right-10"></i>Profile settings</a>
							  <a className="dropdown-item"  href="#"><i className="padding-right-10"></i>Favourite Recipe</a>
								 <a className="dropdown-item" onClick={this.props.logOutUser}  href="#"><i className="fa fa-lock padding-right-10"></i>Sign out</a>
								  <a className="dropdown-item" href="#"><i className=" padding-right-10"></i>Terms and condition</a>
          </div>
        </div>
        </div>
        : ''
        }
        </div>
      </div>
    </nav>
        );
      }
}
Header.propTypes = {
    txt: PropTypes.string,
    cat: PropTypes.number.isRequired
}
Header.defaultProps = {
    txt : "default message"
}
export default connect(mapStateToProps,mapDispatchToProps)(Header)