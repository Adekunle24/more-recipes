import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination as PaginationB, PaginationItem, PaginationLink } from 'reactstrap';

function mapStateToProps(state) {
    return {

    };
}

class Pagination extends Component {
    render() {
        return (
                 <PaginationB aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink previous href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
        </PaginationB>
        )
    }
}

export default connect(
    mapStateToProps,
)(Pagination);