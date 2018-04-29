import React from 'react';
import PropTypes from 'prop-types';

class Notifier extends React.Component{
    constructor(){
        super();
        this.hideNotifier = this.hideNotifier.bind(this);
        this.state ={
            message:'You have a new notification message',
            show:true
        }
    }
    hideNotifier(){
        this.setState(prevState=>({
            show:!prevState.show
        }));
    }
    render(){
        if(!this.state.show){
            return null;
        }
        return (
            <section className=" master-notification margin-bottom-10"  id="subscribe">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 text-center">
                        <span id="master-notify-close" onClick={this.hideNotifier} className="white hover-black cursor-pointer float-left"><i className="fa fa-close"></i></span>
                        <p>{this.state.message}</p>
                    </div>
                </div>
            </div>
        </section>
        );
    }
}
Notifier.propTypes = {
    message:PropTypes.string
}
export default Notifier;