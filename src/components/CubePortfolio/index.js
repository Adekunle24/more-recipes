import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../static/css/portfolio.min.css';
import '../../static/js/jquery.cubeportfolio.min';
import invokePortfolio from './../../static/js/portfolio-1.min';
import { getMyRecipePostersThunk } from './../../actions/recipe';
import { connect } from 'react-redux';

const mapStateToProps = state =>{
    return{
        myRecipePosters: state.recipeReducer.myRecipePosters
    };
};
const mapDispatchToProps = dispatch =>{
    return {
        getMyRecipePostersThunk: data => dispatch(getMyRecipePostersThunk(null))
    };
};
class CubePortfolio extends Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
        console.log('CubePortfolio did mount');
        invokePortfolio();
        this.props.getMyRecipePostersThunk();
    }
    render() {
        if(!this.props.show){
            return null;
        }
        return (
            <div>
                <div className="portfolio-content portfolio-1">
                            <div id="js-filters-juicy-projects" className="cbp-l-filters-button">
                                <div data-filter="*" className="cbp-filter-item-active cbp-filter-item btn dark btn-outline uppercase"> All
                                    <div className="cbp-filter-counter"></div>
                                </div>
                                {/* @foreach ($media_categories as $item)
                                     <div data-filter=".{{BladeFacade::kebabCase($item->category)}}" className="cbp-filter-item btn dark btn-outline uppercase">
                                     {{$item->category}}
                                    <div className="cbp-filter-counter"></div>
                                </div>
                                @endforeach */}
                            </div>
                                   <div id="js-grid-juicy-projects" className="cbp">
                                     {/* @foreach ($media as $item)
                                <div className="cbp-item {{BladeFacade::kebabCase($item->category->category)}}">
                                    <div className="cbp-caption">
                                        <div className="cbp-caption-defaultWrap">
                                            <img src="{{asset($item->source)}}" alt=""> </div>
                                        <div className="cbp-caption-activeWrap">
                                            <div className="cbp-l-caption-alignCenter">
                                                <div className="cbp-l-caption-body">
                                                    <a href="../assets/global/plugins/cubeportfolio/ajax/project1.html" className="cbp-singlePage cbp-l-caption-buttonLeft btn red uppercase btn red uppercase" rel="nofollow">more info</a>
                                                    <a href="{{asset($item->source)}}" className="cbp-lightbox cbp-l-caption-buttonRight btn red uppercase btn red uppercase" data-title="{{$item->category->category}}<br>{{$item->original_file_name}}">view larger</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cbp-l-grid-projects-title uppercase text-center">{{$item->original_file_name}}</div>
                                    <div className="cbp-l-grid-projects-desc uppercase text-center">{{$item->category->category}} / {{round($item->size/1000000)}}MB</div>
                                </div>
                            @endforeach */}
                             </div>
                            <div id="js-loadMore-juicy-projects" className="cbp-l-loadMore-button">
                                <a href="javascript:void(0);" className="cbp-l-loadMore-link btn grey-mint btn-outline" rel="nofollow">
                                    <span className="cbp-l-loadMore-defaultText">LOAD MORE</span>
                                    <span className="cbp-l-loadMore-loadingText">LOADING...</span>
                                    <span className="cbp-l-loadMore-noMoreLoading">NO MORE WORKS</span>
                                </a>
                            </div>
                        </div>
            </div>
        );
    }
}

CubePortfolio.propTypes = {
 show: PropTypes.bool
};

export default connect(mapStateToProps,mapDispatchToProps)(CubePortfolio);