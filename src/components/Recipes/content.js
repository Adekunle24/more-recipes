import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../static/css/dropzone.css';
import * as Dropzone from 'dropzone';
import { displayAppNotification } from '../../actions';
import CubePortfolio from './../CubePortfolio/index';
import Modal from './../Modal/index';
import axios from 'axios';
import * as NProgress from 'nprogress';
import { resetNoMoreRecipeOnAddRecipe,setSelectedPoster,getMyRecipesThunk, addRecipe } from './../../actions/recipe';
import showSwalNotification,{ showSwalCallbackNotification } from '../../local/swal';
import { isNull } from 'util';
import { validateAddRecipe } from './../../local/validators';
import { addRecipeApi } from '../../api';
import { Facebook } from 'react-content-loader';
import moment from 'moment';
import initPictureHover from './../../static/js/picturehover';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditor from 'react-froala-wysiwyg';

function mapStateToProps(state) {
    return {
        userToken: state.userReducer.userToken,
        selectedPoster: state.recipeReducer.selectedPoster,
        myRecipes: state.recipeReducer.myRecipes,
        retrievingMyRecipes: state.recipeReducer.retrievingMyRecipes,
    };
}
function mapDispatchToProps(dispatch){
    return {
        displayAppNotification: data=>dispatch(displayAppNotification(data)),
        resetNoMoreRecipeOnAddRecipe: data => dispatch(resetNoMoreRecipeOnAddRecipe(data)),
        setSelectedPoster: data => dispatch(setSelectedPoster(data)),
        getMyRecipesThunk: data => dispatch(getMyRecipesThunk()),
        addRecipe: data => dispatch(addRecipe(data))
    };
}
class Content extends Component {
  constructor(props) {
      super(props); 
      this.state ={
        uploadedPosters: [],
        showCubePortfolio: true,
        ingredients: [],
        recipeTitle:'',
        ingredientQuantity:'1/2 cup',
        ingredientItem:'',
        recipeProcedures: '',
      };
      this.addIngredient = this.addIngredient.bind(this);
      this.onChangeHandler = this.onChangeHandler.bind(this);
      this.removeIngredient = this.removeIngredient.bind(this);
      this.postRecipe = this.postRecipe.bind(this);
      this.handleRecipeProceduresChange = this.handleRecipeProceduresChange.bind(this);
      this.editorConfig = {
        charCounterCount: false
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
            self.props.resetNoMoreRecipeOnAddRecipe(false);
        });
      },
    headers:{
    'x-access-token': self.props.userToken
    }
  };
   $("#addIngredientForm").validate({
    submitHandler:function(form){
        self.addIngredient();
    }
   });
   this.props.getMyRecipesThunk();
  }
  addIngredient(){
    let newIngredient = {item:this.state.ingredientItem,quantity:this.state.ingredientQuantity};
    this.setState((prevState)=>({
        ingredients: [...prevState.ingredients,newIngredient],
        ingredientItem:'',
    }));
  }
  removeIngredient(index){
    let tempArray = [...this.state.ingredients];
    tempArray.splice(index,1);
    this.setState((prevState)=>({
        ingredients: tempArray
    }));
  }
  postRecipe(){
    const recipeTitle = this.state.recipeTitle;
    const ingredients = this.state.ingredients;
    const poster = this.props.selectedPoster;
    const procedures = this.state.recipeProcedures;
    if(validateAddRecipe(recipeTitle,ingredients,poster,procedures)){
       this.submitRecipe();
    }
  }
  submitRecipe(){
      const self = this;
    NProgress.start();
    axios.defaults.headers['x-access-token'] = this.props.userToken;
    axios.post(addRecipeApi,{
        title: this.state.recipeTitle,
        procedures: this.state.recipeProcedures,
        ingredients: JSON.stringify(self.state.ingredients),
        poster: this.props.selectedPoster.id
    }).then((response)=>{
        NProgress.done();
        if(response.data.status == 'success'){
            showSwalNotification('success','Add Recipe',response.data.message);
        }
        else{
            showSwalNotification('error','Add Recipe',response.data.message);
        }
        let addedRecipe = [{
            ...response.data.data.recipe,
            social_values: response.data.data.social_values,
            media: self.props.selectedPoster
        }];
        this.props.addRecipe(addedRecipe);
        this.resetState();
        initPictureHover();
    }).catch((error)=>{
        NProgress.done();
        this.props.displayAppNotification({
            message: 'Oops! Recipe could not be added',
            type: 'error',
            updateState: {}
          });
    });
  }
  resetState(){
      this.setState({
        recipeTitle: '',
        recipeProcedures: '',
        ingredients: [],
      });
      this.props.setSelectedPoster(null);
  }
  onChangeHandler(e){
      const target = e.target;
      this.setState({
        [target.name]: target.value
      });
  }
  handleRecipeProceduresChange(model){
      this.setState({
        recipeProcedures: model
      });
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
                                    {
                                    this.props.retrievingMyRecipes ?
                                        [1,2,3].map((item) =>
                                        <div key={item} className="col-md-4">
                                        <Facebook/>
                                        </div>
                                        )
                                        : null
                                    }
                                   
                                    { this.props.myRecipes.map((recipe,index)=>
                                     <div key={recipe.id}  className="col-md-4 photo-album">
	<div className="banner-block">
	<div data-picturehover>
    <img src={recipe.media.source} title={`
<a class="comment-like social-icons icon-rounded" ><i class="fa fa-comment-o"></i><span class="action-value margin-left-10">${recipe.social_values.replies} </span></a>
<a class="comment-like social-icons icon-rounded" ><i class="fa fa-heart"></i><span class="action-value margin-left-10">${recipe.social_values.upvotes} </span></a>
<a class="comment-like social-icons icon-rounded" ><i class="fa fa-thumbs-down"></i><span class="action-value margin-left-10"> ${recipe.social_values.downvotes} </span></a>
    `
     } />
</div>
<div className="content">
<div>
<a className="title"><h5>{recipe.title}</h5></a>
<a className="margin-left-10 float-left" data-toggle="tooltip" title="click to edit recipe" data-placement="bottom"><i className="fa fa-edit"></i></a> 
<a className="margin-left-10 float-left" data-toggle="tooltip"  title="click to delete recipe" data-placement="bottom">
<i className="fa fa-trash"></i>
</a>
</div>
<span className="sub-title">{moment(recipe.createdAt).fromNow()}</span>
</div>
</div>
</div> 
                                    )}
                                    </div>
                                </div>
                                <div id="add-recipe" className="tab-pane fade">
                                    <div className="container">
                                        <div className="row ">
                                            <div className="col-md-6">
                                                <h4 className="black text-center">Recipe Title</h4>
                                                <input type="text" value={this.state.recipeTitle} name="recipeTitle" onChange={this.onChangeHandler} placeholder="Recipe Title" className="form-control" />
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
                                                    {this.state.ingredients.map((item,index)=>
                                                         <tr key={index}>
        <td>{index+1}</td>
          <td>{item.item}</td>
        <td>{item.quantity}</td>
        <td><a className="" onClick={this.removeIngredient.bind(this,index)} style={{paddingLeft:'50%',paddingRight:'50%'}} ><i className="fa fa-trash"></i></a></td>
    </tr>
                                                    )}
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <form id="addIngredientForm">
                                                <h4 className="black">Quantity</h4>
                                                <select required name="ingredientQuantity" value={this.state.ingredientQuantity} onChange={this.onChangeHandler} className="form-control">
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
                                                    <option value="1/2 cup">1/2 cup</option>
                                                    <option>1/2 litre</option>
                                                </select>
                                                <h4 className="black">Item</h4>
                                                <div className="margin-top-10">
                                                    <input required className="form-control" name="ingredientItem" value={this.state.ingredientItem} onChange={this.onChangeHandler} placeholder="Item" type="text" />
                                                </div>
                                                <input className="btn btn-danger white margin-top-10" type="submit" value="Add Ingredient" />
                                                <div className="margin-top-10">
                                               {this.props.selectedPoster!=null ? <img src={this.props.selectedPoster.source} width="200" height="100" /> : null} 
                                                </div>
                                                </form>
                                            </div>
                                            <div className="col-md-6">
                                                {/* Dropzone JS */}
                                                <form action="/api/v1/upload/recipe-photo"
                                                    className="dropzone"
                                                    id="my-awesome-dropzone"></form>
                                                <CubePortfolio modalId={"cubePortfolioOnAddRecipe"} show={this.state.showCubePortfolio} />
                                                
                                            </div>
                                            <div className="col-md-12">
                                                    <div className="text-center">     <h4 className="black">Procedures:</h4></div>
                                                    <FroalaEditor config={this.editorConfig} tag='textarea' model={this.state.recipeProcedures} onModelChange={this.handleRecipeProceduresChange}/>
                                                    <a onClick={this.postRecipe} className="btn btn-dark white margin-bottom-10 margin-top-10" >Post Recipe</a>
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