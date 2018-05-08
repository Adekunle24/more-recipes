import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import addArticle from './../../actions/index';


const mapStateToProps = state =>{
    return { articles :  state.articles };
};

const mapDispatchToProps = dispatch =>{
    return {addArticle : article => dispatch(addArticle(article))};
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
        console.log('log on click is called@NotifierComponent');
        let newArticle = {name:'React-Redux',id:123,author:'Adekunle',created_at: Date()}
        this.props.addArticle(newArticle);
        this.setState(prevState=>({
            articles: [...prevState.articles,newArticle]
        }));
    }
    render(){
        if(!this.state.show){
            return null;
        }
        return (
                <section className=" master-notification margin-bottom-10"  id="subscribe">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 text-center">
                                <span id="master-notify-close" onClick={this.hideNotifier} className="white hover-black cursor-pointer float-left"><i className="fa fa-close"></i></span>
                                <p>{this.state.message}{this.state.articles.length} <button className="btn btn-info " onClick={this.onClick}>Click Here</button></p>
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
}
export default connect(mapStateToProps,mapDispatchToProps)(Notifier); 