import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addArticle,testThunk} from './../../actions/index';


const mapStateToProps = state =>{
    return { articles :  state.articles };
};

const mapDispatchToProps = dispatch => {
    return {
        addArticle: article => dispatch(addArticle(article)),
       testThunk: item => dispatch(testThunk(item))
    };
};

class Notifier extends React.Component{
    constructor(props){
        super(props);
        this.hideNotifier = this.hideNotifier.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state ={
            message:'You have a new notification message',
            show:true,
            articles: props.articles
        }
    }
    hideNotifier(){
        this.setState(prevState=>({
            show:!prevState.show
        }));
    }
    onClick(){
        let newArticle = {name:'React-Redux',id:123,author:'Adekunle',created_at: Date()}
        this.props.testThunk(newArticle);
        this.setState(prevState=>({
            articles: [...prevState.articles,newArticle]
        }));
    }
    render(){
        if(!this.props.show){
            return null;
        }
        if(!this.state.show){
            return null;
        }
        return (
                
                <section className=" master-notification margin-bottom-10"  id="subscribe">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 text-center">
                                <span id="master-notify-close" onClick={this.hideNotifier} className="white hover-black cursor-pointer float-left"><i className="fa fa-close"></i></span>
                                <p>{this.state.message}</p>
                            </div>
                        </div>
                    </div>
                </section>      
        );
    }
}
Notifier.propTypes = {
    message:PropTypes.string,
    articles:PropTypes.array,
    show : PropTypes.bool.isRequired,
}
export default connect(mapStateToProps,mapDispatchToProps)(Notifier); 