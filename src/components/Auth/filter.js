
import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        
    };
}

class Filter extends Component {
    render() {
        return (
            <div>
              <section className=" top-banner"  id="subscribe">
     <div className="container">
	<div className="row">
		<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div className="banner-block">
				<div className="padding-top-10">
					<div className="row">
						<div className="col-md-4">
							<div className="banner-select">
						<div className="title">Filter By:</div>
						<fieldset className="form-group">
							<select className="selectpicker form-control" size="auto">
								<option value="NU">Latest 20</option>
								<option value="NU">Favourite</option>
								<option value="NU">Most Viewed</option>
                	<option value="NU">Trending</option>
							</select>
						</fieldset>
					</div>
</div>
<div className="col-md-4">
					<div className="banner-select">
						<fieldset className="input-group">
							<select className="selectpicker form-control" size="auto">
								<option value="NU">Date (Descending)</option>
								<option value="NU">Date (Ascending)</option>
							</select>
									<span className="input-group-btn">				<a href="#" data-toggle="modal" data-target="#create-photo-album" className="btn btn-primary btn-md-2 margin-right-10">Filter</a></span>
						</fieldset>
					</div>
</div>
<div className="col-md-4">
				 <form className="form-inline">
    <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
    <button className="btn btn-outline-success my-2 my-sm-0 cursor-pointer" type="submit">Search</button>
  </form>
					</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

    </section>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Filter);
