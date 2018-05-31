
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Filter from '../Auth/filter';
import HomeCarousel from './../Home/carousel';
import { Facebook } from 'react-content-loader';
import { addRecipeApi } from './../../api/index';
import { dummyRecipes } from './../../local/index';
import axios from 'axios';
import RecipeItem from '../Recipes/single-item';
import {displayAppNotification} from '../../actions/index';
import Pagination from '../Pagination';

function mapStateToProps(state) {
    return {
        userToken: state.userReducer.userToken
    };
}
function mapDispatchToProps(dispatch){
    return {
        displayAppNotification: data => dispatch(displayAppNotification(data))
    };
};

class TopRecipes extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoadingRecipeCarousel : true,
            isLoadingTopRecipes: true,
            recipesForCarousel: [],
            topRecipes: [],
        };
    }
    componentDidMount(){
     this.loadCarouselRecipes();
    }
    loadTopRecipes(){
        axios.defaults.headers['x-access-token'] = this.props.userToken;
        axios.get(`${addRecipeApi}?sort=upvotes&order=desc&limit=9`).then((response)=>{
              this.setState({
                topRecipes: response.data.data
              });
            this.setState({
              isLoadingTopRecipes: false
            });
            
        }).catch((error)=>{
            this.props.displayAppNotification({
                message: 'Oops! Top-Recipes could not be retrieved',
                type: 'error',
                updateState: {}
              });
        });
    }
    loadCarouselRecipes(){
        axios.defaults.headers['x-access-token'] = this.props.userToken;
        axios.get(`${addRecipeApi}?sort=random&limit=3`).then((response)=>{
            if(response.data.data.length>0){
              this.setState({
                recipesForCarousel: response.data.data
              });
            }
            else{
              this.setState({
                recipesForCarousel: formattedRecipes
              });
            }
            this.setState({
              isLoadingRecipeCarousel: false
            });
            this.loadTopRecipes();
        }).catch((error)=>{
            this.props.displayAppNotification({
                message: 'Oops! Recipes for carousel could not be retrieved',
                type: 'error',
                updateState: {}
              });
        });
    }
    render() {
        return (
            <div>
                <Filter></Filter>
                {
            this.state.isLoadingRecipeCarousel ?
            <div className="row">
           <div className="col-md-6">
           <Facebook />
           </div>
           <div className="col-md-6">
           <Facebook />
           </div>
           </div> : <HomeCarousel items={this.state.recipesForCarousel} />
                }
              {
                  this.state.isLoadingTopRecipes ?
                  <div className="row">
                  {[1,2,3].map((item) =>  
                    <div key={item} className="col-md-4">
           <Facebook />
           </div>
                  )}
           </div>
                  :  
                  <div className="row">{
                     this.state.topRecipes.map((item) =>
                      <RecipeItem key={item.id} recipe={item} />
                      )
                  }
                  </div>
              }
              <Pagination />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(TopRecipes);