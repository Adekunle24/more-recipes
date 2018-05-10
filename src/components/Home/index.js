import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Notifier from '../Notifier';
import HomeCarousel from './carousel';
import HomeForm from './form';

class Home extends React.Component{
    constructor(){
        super();
    }
    
    render(){
        return (
            <div>
            <Header cat={123} ></Header>
            <div className="container" id="body-container">
            <Notifier> </Notifier>
            <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <HomeCarousel>
            <h1 className="intro-title">Welcome to the Biggest Recipe Repository in the World!</h1>
	        <p className="">
		    We are the best and biggest recipe library with over 5 billion active users and over 10 million recipes all around the world.
		    Share your thoughts, reviews, recipes, earn badges, points and much more! 
		    Explore your world of dexterity, Try a new Recipe today!
	        </p>
            <div className="text-center">
	        <a id="register-2" className="btn btn-lg btn-pill-left btn-info white margin-top-20"> Register </a>
	        <a id="login-2" className="btn btn-lg btn-pill-right btn-warning white margin-top-20"> Sign In </a>
	        </div>
            </HomeCarousel>
            </div>
            <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <HomeForm></HomeForm>
            </div>
            </div>
            </div>
            <Footer></Footer>
            </div>
        );
    }
}
export default Home;