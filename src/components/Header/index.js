import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../Footer';
import { connect } from 'react-redux';
import { logOutUser } from './../../actions/index';
import { Link } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';

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
        <Link className="navbar-brand" to="/home">MoreRecipes <span className="sr-only">(current)</span></Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/top-recipes">Top Recipes</Link>
            </li>
             <li className="nav-item">
              <a className="nav-link" href="#services">Latest Recipes</a>
            </li>
             <li className="nav-item">
              <Link className="nav-link" to="/add-recipe">Add Recipe</Link>
            </li>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  More
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <a className="dropdown-item" href="#">FAQs</a>
                  </DropdownItem>
                  <DropdownItem>
                  <a className="dropdown-item" href="#">Feeback</a>
                  </DropdownItem>
                  <DropdownItem divider />
                  <a className="dropdown-item" href="#">Contact us</a>
                </DropdownMenu>
              </UncontrolledDropdown>
          </ul>
            <form className="form-inline">
    <input className="form-control mr-sm-2" type="text" onClick={this.action} onChange={this.update.bind(this)} placeholder="Search" aria-label="Search" />
    <button className="btn btn-outline-success my-2 my-sm-0 cursor-pointer" type="submit">Search</button>
  </form>
  {this.props.isAuthenticated ? 
    <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
		    	<span className="comment-author text-muted">{this.props.authenticatedUser.username} <img src="/images/avatar.jpg" className="float-left"  />
          </span>
                </DropdownToggle>
                <DropdownMenu right>
                <Link to="/add-recipe" className="dropdown-item"  ><i className="fa fa-plus-square padding-right-10"></i>Add Recipe</Link>
                <a className="dropdown-item" href="#"><i className="fa fa-gear padding-right-10"></i>Profile settings</a>
		 					  <a className="dropdown-item"  href="#"><i className="padding-right-10"></i>Favourite Recipe</a>
		 						  <a className="dropdown-item" href="#"><i className=" padding-right-10"></i>Terms and condition</a>
                  <DropdownItem divider />
                  <a className="dropdown-item" onClick={this.props.logOutUser}  href="javascript:void(0);"><i className="fa fa-lock padding-right-10"></i>Sign out</a>
                </DropdownMenu>
              </UncontrolledDropdown>
       
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