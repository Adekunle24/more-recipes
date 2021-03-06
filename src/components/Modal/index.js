
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {

    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
        
    }
    render() {
        return (
            <div className="modal fade" id={this.props.id} role="dialog" aria-labelledby={`${this.props.id}Label`} aria-hidden="true">
                <div className="modal-dialog modal-lg" style={this.props.style} role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`${this.props.id}Label`}>{this.props.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    id: PropTypes.string.isRequired
};
export default Modal;
