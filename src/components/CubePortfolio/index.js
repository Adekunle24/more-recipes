import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import getMyRecipePosters,{ getMyRecipePostersThunk,setSelectedPoster,resetNoMoreRecipeOnAddRecipe } from './../../actions/recipe';
import { connect } from 'react-redux';
import * as cubeportfolio from './../../static/js/jquery.cubeportfolio.min';
import invokePortfolio from './../../static/js/portfolio-1.min';
import { isNullOrUndefined } from 'util';
import Modal from './../Modal/index';
import { getRecipePostersApi } from './../../api/index';
import { displayAppNotification } from '../../actions';
import * as boostrap from 'bootstrap';

const mapStateToProps = state =>{
    return{
        myRecipePosters: state.recipeReducer.myRecipePosters,
        userToken: state.userReducer.userToken,
        selectedPoster: state.recipeReducer.selectedPoster,
        noMoreRecipePostersAtAddRecipe: state.recipeReducer.noMoreRecipePostersAtAddRecipe,
    };
};
const mapDispatchToProps = dispatch =>{
    return {
        getMyRecipePostersThunk: data => dispatch(getMyRecipePostersThunk()),
        displayAppNotification: data => dispatch(displayAppNotification(data)),
        getMyRecipePosters: data => dispatch(getMyRecipePosters(data)),
        setSelectedPoster: data =>dispatch(setSelectedPoster(data)),
        resetNoMoreRecipeOnAddRecipe: data =>dispatch(resetNoMoreRecipeOnAddRecipe(data))
    };
};
class CubePortfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initCubePortfolio:true,
            initialPosters:props.myRecipePosters.length,
            loading:false,
        };
        this.initCubePortfolio = this.initCubePortfolio.bind(this);
        this.loadMorePosters = this.loadMorePosters.bind(this);
        this.selectPoster = this.selectPoster.bind(this);
    }
    componentDidMount(){
        this.props.getMyRecipePostersThunk();
    }
    initCubePortfolio(){
            if(this.state.initCubePortfolio){
            setTimeout(() => {
               invokePortfolio();
            }, 500);
            this.setState({
                initCubePortfolio: false,
            });
        }
    }
    loadMorePosters(){
        this.setState({
            loading: true
        });
        axios.defaults.headers['x-access-token'] = this.props.userToken;
        axios.get(getRecipePostersApi, {
            params: {
              offset: this.props.myRecipePosters.length
            }
          }).then((response) => {
            $("#js-grid-juicy-projects").cubeportfolio('destroy');
            this.props.getMyRecipePosters(response.data.data);
            invokePortfolio();
            let noMoreRecipePosters = response.data.data.length < 1;
            this.setState(prevState=>({
                loading: !prevState.loading,
            }));
            if(noMoreRecipePosters){
            this.props.displayAppNotification({
                message: 'No more recipe posters to retrieve',
                type: 'info',
                updateState: {}
              });
            this.props.resetNoMoreRecipeOnAddRecipe(true);
            }
          }).catch((error) => {
            this.props.displayAppNotification({
              message: 'Error occured while retrieving your recipe posters',
              type: 'error',
              updateState: {}
            });
        });
    }
    selectPoster(item){
        this.props.setSelectedPoster(item);
        $('#cubePortfolioOnAddRecipe').modal('hide');
    }
    render() {
        if(!this.props.show){
            return null;
        }
        return (
            <div>
            <a data-toggle="modal" onClick={this.initCubePortfolio} data-target="#cubePortfolioOnAddRecipe" className="btn btn-info white margin-top-10" >{this.props.selectedPoster==null ? 'Select Poster' : 'Change Poster' }</a>
              <Modal id={"cubePortfolioOnAddRecipe"} title={"Recipe Posters"} style={{maxWidth:'90%'}}>
              {this.state.loading ? <img src="images/spinner.gif" alt="" className="loading" /> : null }
                                                       <div className="portfolio-content portfolio-1">
                            <div id="js-filters-juicy-projects" className="cbp-l-filters-button">
                                <div data-filter="*" className="cbp-filter-item-active cbp-filter-item btn dark btn-outline uppercase"> All
                                    <div className="cbp-filter-counter">0</div>
                                </div>
                                <div data-filter=".recipe-posters" className="cbp-filter-item btn dark btn-outline text-uppercase">
                                    Recipe Posters
                                    <div className="cbp-filter-counter"></div>
                                </div>
                            </div>
                            <div  id="js-grid-juicy-projects" className="cbp">
                            {
                                this.props.myRecipePosters.map((item)=>
                                    <div  className="cbp-item recipe-posters" key={item.id}>
                                    <div className="cbp-caption">
                                        <div className="cbp-caption-defaultWrap">
                                            <img src={item.source} alt="" /> 
                                            </div>
                                        <div className="cbp-caption-activeWrap">
                                            <div className="cbp-l-caption-alignCenter">
                                                <div className="cbp-l-caption-body">
                                                    <a href="javascript:;" onClick={this.selectPoster.bind(this,item)}  className="cbp-l-caption-buttonLeft btn btn-dark text-uppercase" rel="nofollow">Select</a>
                                                    <a href={item.source} className="cbp-lightbox cbp-l-caption-buttonRight btn btn-danger uppercase btn red text-uppercase" data-title={item.filename}>view larger</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cbp-l-grid-projects-title  text-center text-uppercase text-center">{item.filename}</div>
                                    <div className="cbp-l-grid-projects-desc text-uppercase text-center  text-center">Recipe Posters / {`${Math.round(item.filesize/1000)}KB`}</div>
                                </div>
                                )
                            }
                               

                            </div>
                            <div id="js-loadMore-juicy-projects" className="cbp-l-loadMore-button">
                            {this.props.noMoreRecipePostersAtAddRecipe ? null :
                                <a  href="javascript:;" onClick={this.loadMorePosters} className="btn grey-mint btn-outline btn-outline-dark" rel="nofollow">
                                    <span   className="cbp-l-loadMore-defaultText">LOAD MORE</span> 
                                </a>
                            }
                            </div>
                        </div>
                        </Modal>
            </div>
        );
    }
}

CubePortfolio.propTypes = {
 show: PropTypes.bool
};

export default connect(mapStateToProps,mapDispatchToProps)(CubePortfolio);