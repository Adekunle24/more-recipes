import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopBanner from './top-banner';
import Content from './content';

function mapStateToProps(state) {
    return {

    };
}

class AddRecipe extends Component {
    render() {
        return (
            <div>
                <TopBanner/>
                <Content />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(AddRecipe);