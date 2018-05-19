import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { toggleAppNotification } from './../../actions/index';

function mapStateToProps(state) {
    return {
        appNotificationMessage: state.userReducer.appNotificationMessage,
        showAppNotification: state.userReducer.showAppNotification,
        appNotificationType: state.userReducer.appNotificationType,
    };
}
function mapDispatchToProps(dispatch){
    return{
        toggleAppNotification:data =>{
            dispatch(toggleAppNotification());
        }
    };
}

class Toast extends Component {
    constructor(props) {
        super(props);
    }
    
    showAppNotification(){
        const self = this;
        switch (this.props.appNotificationType) {
            case 'success':
                toast.success(this.props.appNotificationMessage,{onOpen:(obj)=>{
                    self.props.toggleAppNotification();
                }});
                break;
            case 'info':
                toast.info(this.props.appNotificationMessage,{onOpen:(obj)=>{
                    self.props.toggleAppNotification();
                }});
                break;
            case 'error':
                toast.error(this.props.appNotificationMessage,{onOpen:(obj)=>{
                    self.props.toggleAppNotification();
                }});
                break;
            default:
                toast(this.props.appNotificationMessage,{onOpen:(obj)=>{
                    self.props.toggleAppNotification();
                }});
                break;
        }
    }
    render() {
        if(this.props.showAppNotification){
            this.showAppNotification();
        }
        return (
            <ToastContainer/>
        );
    }
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(Toast);