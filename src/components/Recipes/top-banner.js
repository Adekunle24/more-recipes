import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class TopBanner extends Component {
    render() {
        return (
            <div>
                <section className=" top-banner margin-top-10"  id="subscribe">

<div className="">
<div className="row">
<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
<div className="banner-block">
<div className="top-header">

<div className="top-header-thumb">
<img src="/images/cover_photo.jpg" className="image-full"/>
</div>
<div className="profile-section">
<div className="row">
<div className="col-lg-5 col-md-5">
<ul className="profile-list">
<li>My Recent Recipes</li>
<li>Friends Recipes</li>
</ul>
</div>
<div className="col-lg-5 offset-2 col-md-5 ">
<ul className="profile-list">
<li className="active">My Profile</li>
<li>Add Recipe</li>
 <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">More <span className="caret"></span></a>
          <ul className="dropdown-menu" role="menu">
            <li><a href="#">Edit Profile</a></li>
			  <li><a href="#">Feedback</a></li>
          </ul>
        </li>
</ul>
</div>

</div>
<div className="control-block-button">
<a href="" className=" social-icons icon-circle " ><i className="fa fa-book bg-orange"></i></a>
<a href="" className="social-icons icon-circle" ><i className="fa fa-comment-o"></i></a>
<a href="" className="social-icons icon-circle dropdown-toggle" data-toggle="dropdown" ><i className="fa fa-gear bg-pink-800"></i></a>
 <ul className="dropdown-menu dropdown-menu-danger" role="menu">
            <li><a className="" href="#">Update Profile Photo</a></li>
            <li><a href="#">Update Cover Photo</a></li>
            <li className="divider"></li>
            <li><a href="#">Account settings</a></li>
						
          </ul>

</div>
</div>
<div className="user-header-picture">
<a className="">
<img className="rounded-circle" src="/images/avatar.jpg" />
</a>
 <div className="author-date">
            <a href="author-name" >Olayinka Kunle</a>
            <div className="comment-date country">Lagos, Nigeria </div>
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
)(TopBanner);