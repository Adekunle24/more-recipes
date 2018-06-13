import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { upvoteRecipeApi, downvoteRecipeApi } from '../../api';
import {displayAppNotification }  from '../../actions/index';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';


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

class RecipeItem extends Component {
    constructor (props) {
        super(props);
        this.state = {
            recipe: props.recipe,
            isWorking: false,
        };
        this.upvoteRecipe = this.upvoteRecipe.bind(this);
        this.downvoteRecipe = this.downvoteRecipe.bind(this);
    }
    upvoteRecipe(){
        this.setState({
            isWorking: true
        });
        axios.post(upvoteRecipeApi(this.state.recipe.id)).then((response) =>{
            const updatedRecipe = Object.assign({},this.state.recipe,{social_values:response.data.data.social_values});
            this.setState({
                isWorking: false,
                recipe: updatedRecipe
            });
            this.props.displayAppNotification({
                message: response.data.message,
                type: 'success',
                updateState: {}
              });
        }).catch(error =>{
            this.props.displayAppNotification({
                message: 'Oops! Recipe could not be upvoted',
                type: 'error',
                updateState: {}
              });
              this.setState({
                isWorking: false
            });
        });
    }
    downvoteRecipe(){
        this.setState({
            isWorking: true
        });
        axios.post(downvoteRecipeApi(this.state.recipe.id)).then((response) =>{
            const updatedRecipe = Object.assign({},this.state.recipe,{social_values:response.data.data.social_values});
            this.setState({
                isWorking: false,
                recipe: updatedRecipe
            });
            
            this.props.displayAppNotification({
                message: response.data.message,
                type: 'success',
                updateState: {}
              });
        }).catch(error =>{
            this.props.displayAppNotification({
                message: 'Oops! Recipe could not be downvoted',
                type: 'error',
                updateState: {}
              });
              this.setState({
                isWorking: false
            });
        });
    }
    render() {
        return (
		<div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
			<div className="banner-block">
				<article className="recipe-post">

				<div className="recipe-thumb">
                <a href="#">
					<img src={this.state.recipe.media.source} alt="photo" />
                    </a>
				</div>

				<div className="recipe-content">
					<a href="#" className="recipe-category bg-orange">TOP RECIPES</a>
			<h4>		<a href="#" className=" recipe-title black">{this.state.recipe.title}</a></h4>

					<div className="recipe-author">
						by &nbsp;
						<a className="" href="#">{this.state.recipe.user.username}</a>
						<div className="recipe-date inline-block">
							<time className="published">
								- {moment(this.state.recipe.createdAt).fromNow()}
							</time>
						</div>
					</div>
	<div className="recipe-actions inline-items">
<span className={this.state.isWorking ? '' : 'invisible'}>
                <a>
                  <i className="fa fa-spinner fa-spin"></i>
                </a>
            </span>
						<ul className="action-items icons inline social-icons icon-circle">
							<li>
								<a onClick={this.upvoteRecipe} >
								<i className="fa fa-thumbs-up"></i>
             <span className="action-value">{this.state.recipe.social_values.upvotes}</span>
								</a>
							</li>
              	<li>
								<a onClick={this.downvoteRecipe} >
								<i className="fa fa-thumbs-down"></i>
             <span className="action-value">{this.state.recipe.social_values.downvotes}</span>
								</a>
							</li>
              <li>
                <a className="recipe-item-comment inline-items">
                <i className="fa fa-comment-o"></i>
								<span className="action-value">{this.state.recipe.social_values.replies}</span>
							</a>
              </li>
						</ul>
						</div>
<div className="comment-container margin-top-10 invisible">
<form>	 <div className="input-group">
           <input className="form-control" placeholder="comment"/>
           <span clas="input-group-btn">
           <a className="btn white btn-warning "><i className="fa fa-send white"></i></a>
           </span>
           </div>
	</form></div>
					</div>
			</article>
			</div>
            </div>
            )
    }
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(RecipeItem);