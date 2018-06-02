import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination as PaginationB, PaginationItem, PaginationLink } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

function mapStateToProps(state) {
    return {

    };
}

class Pagination extends Component {
  constructor(props){
    super(props);
  }
    render() {
        let links = [];
        for(let x=1; x<=this.props.count; x++){
          links.push(x);
        }
        return (
                 <PaginationB aria-label="Page navigation example">
        <PaginationItem disabled={this.props.current==1}>
        <Link  className="page-link" aria-label="Previous" to={`${this.props.match.url}?page=${parseInt(this.props.current)-1}`}>
      <span aria-hidden="true">«</span><span className="sr-only">Previous</span>
        </Link>
        </PaginationItem>
       
        {
         links.map((item) => <PaginationItem key={item} active={this.props.current==item} >
        <Link className="page-link" to={`${this.props.match.url}?page=${item}`}>{item}</Link>
      </PaginationItem>
         )
        }
        <PaginationItem disabled={this.props.current==this.props.count}>
        <Link  className="page-link" aria-label="Next" to={`${this.props.match.url}?page=${parseInt(this.props.current)+1}`}>
      <span aria-hidden="true">»</span><span className="sr-only">Next</span>
        </Link>
        </PaginationItem>
        </PaginationB>
        )
    }
}

export default withRouter(connect(
    mapStateToProps,
)(Pagination));