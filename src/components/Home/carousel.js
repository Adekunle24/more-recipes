import React from "react";

class HomeCarousel extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src="images/slider-1.png" alt="First slide" />
                <div className="carousel-caption bg-gray d-none d-md-block">
                    <h3>BurgerPlus</h3>
                    <p> Top recipes for classic beef burgers, turkey burgers, veggie burgers, and lamb burgers.</p>
                  </div>
              </div>
              <div className="carousel-item ">
                <img className="d-block w-100" src="images/slider-2.jpg" alt="Second slide" />
                       <div className="carousel-caption bg-gray d-none d-md-block">
                    <h3>Appetizer</h3>
                    <p>I came up with this after having a delicious caprese salad. Be sure to use fresh basil!</p>
                  </div>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="images/slider-3.jpg" alt="Third slide" />
                      <div className="carousel-caption bg-gray d-none d-md-block ">
                    <h3>Mexico</h3>
                    <p>Platillos mexicanos. Fried chicken, fried rice, and others</p>
                  </div>
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
          {this.props.children}
          </div>
        );
    }
}
export default HomeCarousel;