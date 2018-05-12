import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopBanner from './top-banner';

function mapStateToProps(state) {
    return {

    };
}

class AddRecipe extends Component {
    render() {
        return (
            <div>
                <TopBanner/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(AddRecipe);