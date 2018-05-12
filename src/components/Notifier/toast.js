import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function mapStateToProps(state) {
    return {
        appNotificationMessage: state.userReducer.appNotificationMessage,
        showAppNotification: state.userReducer.showAppNotification,
        appNotificationType: state.userReducer.appNotificationType,
    };
}

class Toast extends Component {
    constructor(props) {
        super(props);
    }
    
    showAppNotification(){
        switch (this.props.appNotificationType) {
            case 'success':
                toast.success(this.props.appNotificationMessage);
                break;
            case 'info':
                toast.info(this.props.appNotificationMessage);
                break;
            case 'error':
                toast.error(this.props.appNotificationMessage);
                break;
            default:
                toast(this.props.appNotificationMessage);
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
    mapStateToProps,
)(Toast);