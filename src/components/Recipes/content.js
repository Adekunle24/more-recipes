import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../static/css/dropzone.css';
import * as Dropzone from 'dropzone';
import { displayAppNotification } from '../../actions';
import CubePortfolio from './../CubePortfolio/index';
import Modal from './../Modal/index';

function mapStateToProps(state) {
    return {
        userToken: state.userReducer.userToken
    };
}
function mapDispatchToProps(dispatch){
    return {
        displayAppNotification: data=>dispatch(displayAppNotification(data))
    }
}
class Content extends Component {
    
  constructor(props) {
      super(props); 
      this.state ={
        uploadedPosters: [],
        showCubePortfolio: true,
      };
  }
  componentDidMount() {
      const self = this;
    const myDropzone  = Dropzone.options.myAwesomeDropzone = {
    paramName: "poster", // The name that will be used to transfer the file
    maxFilesize: 5,
    ur: '/api/v1/upload/recipe-photo',
    uploadMultiple:false,
    init: function() {
        this.on("error", function(file,errorMessage,xhr) { 
            self.props.displayAppNotification({
                message: 'Error occured while uploading the file',
                type: 'error',
                updateState: {}
              });
        });
        this.on("success",(file,response)=>{
            self.props.displayAppNotification({
                message: response.message,
                type: 'success',
                updateState: {}
              });
            self.setState((prevState)=>{
                uploadedPosters: [...prevState.uploadedPosters,response.media]
            });
        });
      },
    headers:{
    'x-access-token': self.props.userToken
    }
  };
  }
  
    render() {
        return (
            <div>
                <div className="main-header">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="banner-block">
                            <div className="profile-tabs">

                                <ul className="nav nav-pills profile-list" role="tablist">
                                    <li className="active"><a className="nav-link" data-toggle="pill" href="#my-recipes">My Recipes</a></li>
                                    <li className=""><a className="nav-link" data-toggle="pill" href="#add-recipe">Add a Recipe</a></li>
                                </ul>
                            </div>
                            <div className="tab-content">
                                <div id="my-recipes" className="tab-pane fade show active">
                                    <div className="row">
                                        {/* <div data-ng-repeat="recipe in TotalRecipes" className="col-md-4 photo-album">
	<div className="banner-block">
	<div data-picturehover>
<img src="{{recipe.poster}}" title='<a className="" data-toggle="tooltip" title="click to edit recipe" data-placement="bottom"><i className="fa fa-edit fa-2x white"></i></a> '>
</div>
<div className="content">
<div><a className="title"><h5>My Recipe Background</h5></a><a className=" margin-left-10 float-left" data-ng-click="DeletePostedRecipe($index)" data-toggle="tooltip"  title="click to delete recipe" data-placement="bottom"><i className="fa fa-trash fa-2x"></i></a></div>
<span className="sub-title">Added 4 hours ago</span>
<span className="float-right"><a > <i  className="fa fa-chevron-down accordion-handle"></i></a></span>
  <div className="margin-top-10 padding-top-10 comment-content collapse" >   <p>I love the recipe. I tried it once and all my kids enjoyed the taste and aroma</p>
    <span>
                <a>
                  <i className="fa fa-spinner fa-spin"></i>
                </a>
            </span>
     <a className="comment-like social-icons icon-rounded" ><i className="fa fa-heart"></i><span className="action-value margin-left-10"> 24 </span></a>
        <span className="delete-recipe"> Reply </span>
         <div className="comment-container margin-top-10 hide">
           <form>
          <div className="input-group">
           <input className="form-control" placeholder="comment"/>
           <span clas="input-group-btn">
           <a className="btn white btn-warning "><i className="fa fa-send white"></i></a>
           </span>
           </div>
            </form>
           </div>
     </div>
</div>
</div>
</div> */}

                                    </div>
                                </div>
                                <div id="add-recipe" className="tab-pane fade">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h4 className="black text-center">Recipe Title</h4>
                                                <input type="text" placeholder="Recipe Title" className="form-control" />
                                                <h4 className="black text-center">Ingredients List</h4>
                                                <table className="table table-bordered table-responsive table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>S/N</th>
                                                            <th>Item</th>
                                                            <th>Quantity</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* <tr data-ng-repeat="x in Ingredients">
        <td>{{$index+1}}</td>
          <td>{{x.item}}</td>
        <td>{{x.quantity}}</td>
        <td><a className="" data-ng-click="RemoveIngredient($index)" style="padding-left:50%;padding-right:50%;" ><i className="fa fa-trash"></i></a></td>
    </tr> */}
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <h4 className="black">Quantity</h4>
                                                <select className="form-control">
                                                    <option>None</option>
                                                    <option>1 quantity</option>
                                                    <option>2 quantities</option>
                                                    <option>2 cups</option>
                                                    <option>4 cups</option>
                                                    <option>6 cups</option>
                                                    <option>1 litre</option>
                                                    <option>2 litres</option>
                                                    <option>2 cups</option>
                                                    <option>little</option>
                                                    <option>1/2 cup</option>
                                                    <option>1/2 litre</option>
                                                </select>
                                                <h4 className="black">Item</h4>
                                                <div className="margin-top-10">
                                                    <input className="form-control input-search inline" placeholder="Item" type="text" />
                                                </div>
                                                <a className="btn btn-danger white margin-top-10">Add Ingredient</a>

                                            </div>
                                            <div className="col-md-6">
                                                {/* Dropzone JS */}
                                                <form action="/api/v1/upload/recipe-photo"
                                                    className="dropzone"
                                                    id="my-awesome-dropzone"></form>
                                                <a data-toggle="modal" data-target="#cubePortfolioOnAddRecipe" className="btn btn-info white margin-top-10" >Select Poster</a>
                                                <Modal id={"cubePortfolioOnAddRecipe"}>
                                                <CubePortfolio show={this.state.showCubePortfolio} />
                                                </Modal>
                                                <div>
                                                    <div className="text-center">     <h4 className="black">Procedures:</h4></div>
                                                    <textarea className="form-control" rows={10} ></textarea>
                                                </div>
                                                <a className="btn btn-dark white margin-bottom-10 margin-top-10" >Post Recipe</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Content);