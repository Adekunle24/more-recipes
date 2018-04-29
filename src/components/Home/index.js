import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Notifier from '../Notifier';

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
            </div>
            <Footer></Footer>
            </div>
        );
    }
}
export default Home