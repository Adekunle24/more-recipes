import React from "react";
import {Carousel, CarouselIndicators, CarouselItem, CarouselCaption, CarouselControl } from 'reactstrap';
import PropTypes from 'prop-types';


class HomeCarousel extends React.Component {
    constructor(props) {
        super(props);
        const formattedRecipes = this.addSrcPropertyToRecipes(this.props.items);
        this.state = {
          activeIndex: 0,
          recipes: formattedRecipes
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }
      addSrcPropertyToRecipes(recipes){
        let result = [];
        recipes.map((item)=>
        result.push(Object.assign({},item, {src: `${item.media.source}With${item.id}` }))
        );
        return result;
      }
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.recipes.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.recipes.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
    render(){
       
        return (
            <div>
               <Carousel
        activeIndex={this.state.activeIndex}
        next={this.next}
        previous={this.previous}
        interval={false}
      >
        <CarouselIndicators items={this.state.recipes} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
       { this.state.recipes.map((item) => 
          <CarouselItem
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={item.id}
            style={{width:'50%',height:'50%'}}
          >
            <img src={item.media.source} alt={item.altText} />
            <CarouselCaption captionText={`By ${item.user.username}`} captionHeader={item.title.substring(0,30)} />
          </CarouselItem>
        )
      }
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
          {this.props.children}
          </div>
        );
    }
}
HomeCarousel.propTypes = {
    items: PropTypes.array.isRequired
};
export default HomeCarousel;
