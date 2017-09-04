import React from 'react';

class Footer extends React.Component{

  constructor(){
    super();
    this.state = {
      name : 'footer'
    };
  }
  render(){
    return  (
         <footer className="">
<div id="footer-responsive" className="container-fluid">
<div className="row">
<div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
<div className="about-widget">
<a href="#" className="logo">
						<img src="images/logo.png" alt="MoreRecipes" />
						<h6 className="logo-title">MoreRecipes</h6>
						RECIPE LIBRARY
					</a>
					<p>
						More-Recipes​ provides​ ​a​ ​platform​ ​for​ ​users​ ​to​ ​share​ ​the​ ​awesome​ ​and​ ​exciting​ ​​ ​recipe​ ​ideas​ ​they
have​ ​invented​ ​or​ ​learnt.
							</p>
														<div className="padding-bottom-0" className='full-tile column col-xs-12 social-links'>
<div className="social-links-title margin-top-10">Go ahead and follow us on social media.</div>
<ul className="icons inline social-icons icon-circle margin-top-20">
<li className="pinterest" data-toggle="tooltip" title="Pinterest"><a href="" className="elegant-" target="_blank"><i className="fa fa-pinterest"></i></a></li>
<li className="facebook" data-toggle="tooltip" title="Facebook"><a href="" className="elegant-" target="_blank"><i className="fa fa-facebook"></i></a></li>
<li className="twitter" data-toggle="tooltip" title="Twitter"><a href="" className="" target="_blank"><i className="fa fa-twitter"></i></a></li>
<li className="googleplus" data-toggle="tooltip" title="GooglePlus"><a href="" className="social-icon icon-google_plus" target="_blank"><i className="fa fa-google-plus"></i></a></li>
<li className="instagram" className="tooltip" title="Instagram" ><a href="" target="_blank"><i className="fa fa-instagram"></i></a></li>
</ul>
</div>
</div>
	</div>
	<div className="col-lg-2 col-md-4 col-sm-6 col-xs-12">
<h6 className="text-center footer-quicklinks">Quick Links</h6>
<ul className="footer-links">
				<li><a href="/view-recipes/latest">Latest Recipe</a></li>
					<li><a href="/view-recipes/most-view">Most Viewed Recipe</a></li>
					<li><a href="/recipe-user/photos">Photos</a></li>
			<li><a href="/recipe-filter/trending">Trending</a></li>
				<li><a href="/recipe-filter/trending">Friends Recipe</a></li>
</ul>
	</div>
	<div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 recipe-gallery">
<h4 className="text-center">Recipe Gallery</h4>   
<div className="row">
<div className="col-4 col-md-4 col-xs-6">
<a  data-lightbox="gallery-lightbox" href="images/gallery01.png" data-title="Recipe gallery" >	<img src="images/gallery01.png" /></a>
</div>
<div className="col-4 col-md-4 col-xs-6 col-3">
<a  data-lightbox="gallery-lightbox" href="images/gallery02.png" data-title="Recipe gallery" >	<img src="images/gallery02.png" /></a>
</div>
<div className="col-4 col-md-4 col-xs-6 col-3">
<a  data-lightbox="gallery-lightbox" href="images/gallery03.png" data-title="Recipe gallery" >	<img src="images/gallery03.png" /></a>
</div>
</div>
<div className="row">
<div className="col-4 col-md-4 col-xs-6 col-3">
	<a  data-lightbox="gallery-lightbox" href="images/gallery04.png" data-title="Recipe gallery" ><img src="images/gallery04.png" /></a>
</div>
<div className="col-4 col-md-4 col-lg-4 col-xs-4">
<a  data-lightbox="gallery-lightbox" href="images/gallery05.png" data-title="Recipe gallery" >	<img src="images/gallery05.png" /></a>
</div>
<div className="col-4 col-md-4 col-lg-4 col-xs-4">
<a  data-lightbox="gallery-lightbox" href="images/gallery06.png" data-title="Recipe gallery" >	<img src="images/gallery06.png" /></a>
</div>
</div>
<div className="row">
<div className="col-4 col-md-4 col-xs-6">
	<a  data-lightbox="gallery-lightbox" href="images/gallery07.png" data-title="Recipe gallery" ><img src="images/gallery07.png" /></a>
</div>
<div className="col-4 col-md-4 col-lg-4 col-xs-4">
<a  data-lightbox="gallery-lightbox" href="images/gallery08.png" data-title="Recipe gallery" >	<img src="images/gallery08.jpg" /></a>
</div>
<div className="col-4 col-md-4 col-lg-4 col-xs-4">
<a  data-lightbox="gallery-lightbox" href="images/gallery09.png" data-title="Recipe gallery" >	<img src="images/gallery09.jpg" /></a>
</div>
</div>
	</div>
	<div className="col-lg-2 col-md-4 col-sm-6 col-xs-12">
<h6 className="text-center">More Recipe</h6>
<ul className="footer-links">
				<li><a href="/legal/privacy">Privacy</a></li>
					<li><a href="/legal/terms-conditions">Terms and Conditions</a></li>
					<li><a href="/social/forums">Forums</a></li>
			<li><a href="/others/statistics">Statistics</a></li>
				<li><a href="/developer/api/download">Web Developer API</a></li>
</ul>
	</div>
</div>
</div>
</footer>
      )
  }
}
export default Footer;