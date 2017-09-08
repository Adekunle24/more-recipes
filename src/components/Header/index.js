import React from 'react';
import Footer from '../Footer';
class Header extends React.Component{
    constructor(){
        super();
        this.state = {
            txt: 'this is the state text'
        }
        this.action = this.action.bind(this);
    }
    update(e){
        this.setState({txt: e.target.value})
    }
    action(e){
        this.setState({txt: e.type});
    }
    render(){
        return (
            <div>
               <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand" href="#page-top">MoreRecipes</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active"><a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a></li>
            <li className="nav-item">
              <a className="nav-link" href="#services">Top Recipes</a>
            </li>
             <li className="nav-item">
              <a className="nav-link" href="#services">Latest Recipes</a>
            </li>
             <li className="nav-item">
              <a className="nav-link" href="/add-recipe">Add Recipe</a>
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
        </div>
      </div>
    </nav>
    <div>{this.state.txt}</div>
    <Footer></Footer>
           </div>
        )}
}
Header.propTypes = {
    txt: React.PropTypes.string,
    cat: React.PropTypes.number.isRequired
}
Header.defaultProps = {
    txt : "default message"
}
export default Header