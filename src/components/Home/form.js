import React from 'react';
import Spinner from 'react-spinkit';
import {Link} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import * as validate from 'jquery-validation';
import { connect } from 'react-redux';
import { addUserThunk } from '../../actions';

const mapStateToProps = state =>{
    return {
        isUserRegistering: state.isUserRegistering
    };
};
const mapDispatchToProps = dispatch =>{
    return{
        addUserThunk : data => dispatch(addUserThunk(data)) 
    };
};

class HomeForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            fullname:'',
            username:'',
            email:'',
            cpassword:'',
            date:'',
            gender:'Female',
            acceptTerms:true,
        }
        this.completeRegistration = this.completeRegistration.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.dispatchRegistration  = this.dispatchRegistration.bind(this);
    }
    componentDidMount(){
        const self = this;
        $('#registration-form-container').validate({
            rules:{
                cpassword:{
                    equalTo:"#password"
                }
            },
            submitHandler:form=>{
                self.dispatchRegistration();
            }
        });
    }
    completeRegistration(event){
        event.preventDefault();
        if(!this.state.acceptTerms){
            toast('Please check the tickbox to accept terms and conditions');
        }
    }
    dispatchRegistration(){
        const birthday = $('input[name="date"]').val();
        this.setState({
            date:birthday
        });
       this.props.addUserThunk();
    }
    onChangeHandler(event){
        const target = event.target;
        const value = target.type==='checkbox' ? target.checked : target.value;
        this.setState({
          [target.name]  : value
        });
    }
    render(){
        return ( 
            <div className="registration-form">
            <ToastContainer/>
                <ul className="nav flex-column nav-pills inline float-left height-300 registration-nav" id="page-tab" role="tablist">
                    <li data-toggle="tooltip" title="Click here to Register an account" data-placement="right">
                        <a className="nav-link active" role="tab" data-toggle="pill" href="#home"><i className="fa fa-user fa-2x"></i></a></li>
                    <li data-toggle="tooltip" title="Click here to Sign In" data-placement="right">
                        <a className="nav-link " data-toggle="pill" href="#menu1"><i className="fa fa-lock fa-2x"></i></a></li>
                </ul>
                <div className="tab-content">
                    <div id="home" className="tab-pane fade show active" role="tabpanel" >
                        <h3 className="text-center margin-bottom-30">Register</h3>
                        <form className="" id="registration-form-container" onSubmit={this.completeRegistration}>
                            <div className="row">
                                <div className="col-lg-5 col-md-5">
                                    <div className="form-group label-floating is-empty">
                                        <label className="control-label">Full Name</label>
                                        <input required className="form-control" value={this.state.fullname} onChange={this.onChangeHandler} name="fullname" placeholder="Full Name" type="text" />
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-5">
                                    <div className="form-group label-floating is-empty">
                                        <label className="control-label ">User Name</label>
                                        <input required onChange={this.onChangeHandler} className="form-control" name="username" placeholder="User Name" type="text" />
                                    </div>
                                </div>
                                <div className="col-xl-10 col-lg-10 col-md-10 ">
                                    <div className="form-group label-floating is-empty">
                                        <label className="control-label ">Your Email</label>
                                        <input required onChange={this.onChangeHandler} className="form-control" name="email" placeholder="Your Email" type="email" />
                                    </div>
                                    <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                    <div className="form-group label-floating is-empty">
                                        <label className="control-label">Your Password</label>
                                        <input required className="form-control" id="password" name="password" placeholder="" type="password" />
                                    </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                    <div className="form-group label-floating is-empty">
                                        <label className="control-label">Confirm Password</label>
                                        <input required onChange={this.onChangeHandler} className="form-control" name="cpassword" placeholder="" type="password" />
                                    </div>
                                    </div>
                                    </div>
                                    <div className="form-group date-time-picker label-floating">
                                        <label required className="control-label">Your Birthday</label>
                                        <input required onChange={this.onChangeHandler} name="date" value="" />
                                    </div>

                                    <div className="form-group label-floating is-select">
                                        <label className="control-label">Your Gender</label>
                                        <select required onChange={this.onChangeHandler} value={this.state.gender} className="selectpicker form-control" name="gender" size="auto">
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>

                                    <div className="remember">
                                        <div className="checkbox">
                                            <label>
                                                <input onChange={this.onChangeHandler}  checked={this.state.acceptTerms} name="acceptTerms" type="checkbox" />
                                                I accept the <a href="#" data-target="#modalTermsAndConditions" data-toggle="modal">Terms and Conditions</a> of the website
											</label>
                                        </div>
                                    </div>

                                    <div className="text-center margin-30">	
                                   {this.props.isUserRegistering ? <Spinner name="line-scale-pulse-out" color="red" />: null} 
                                    <input disabled={(this.state.acceptTerms && !this.props.isUserRegistering) ? '' : 'disabled'} type="submit" href="#" data-toggle="tooltip" title="Click here to Register an account" className="btn btn-success btn-lg full-width" value="Complete Registration!" /></div>
                                </div>

                                <div style={{paddingBottom:0+'px'}} className='full-tile column col-xs-12 social-links'>
                                    <div className="social-links-title margin-top-10">Go ahead and follow us on social media.</div>
                                    <ul className="icons inline social-icons icon-circle margin-top-20">
                                        <li className="pinterest" data-toggle="tooltip" title="Pinterest"><a href="" target="_blank"><i className="fa fa-pinterest"></i></a></li>
                                        <li className="facebook" data-toggle="tooltip" title="Facebook"><a href=""  target="_blank"><i className="fa fa-facebook"></i></a></li>
                                        <li className="twitter" data-toggle="tooltip" title="Twitter"><a href="" target="_blank"><i className="fa fa-twitter"></i></a></li>
                                        <li className="googleplus" data-toggle="tooltip" title="GooglePlus"><a href="" className="social-icon icon-google_plus" target="_blank"><i className="fa fa-google-plus"></i></a></li>
                                        <li className="instagram" className="tooltip" title="Instagram" ><a href="" target="_blank"><i className="fa fa-instagram"></i></a></li>
                                    
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div id="menu1" className="tab-pane fade" role="tabpanel">
                        <h3 className="text-center margin-bottom-30 margin-top-10">Sign In</h3>
                        <form className="login-form">
                            <div className="row">
                                <div className="col-lg-10 col-md-10">
                                    <div className="form-group label-floating text-center is-empty">
                                        <label className="control-label ">UserName/Email</label>
                                        <input data-ng-mode="LoginUsername" required className="form-control" placeholder="Username or Email" type="text" />
                                    </div>
                                </div>
                                <div className="col-lg-10 col-md-10">
                                    <div className="form-group label-floating text-center is-empty">
                                        <label className="control-label text-center">Password</label>
                                        <input required className="form-control" placeholder="Password" type="password" />
									</div>
                                        <div className="text-center">
                                        	{this.state.isLoading ? <Spinner name="line-scale-pulse-out" color="red" /> : null } 
                                            </div>
                                        <div className="text-center">	<Link to="/home"  className="btn btn-purple btn-lg full-width btn-info" >Sign In</Link></div>

                                    </div>
                                    <div className="col-lg-10 col-md-10">
                                        <div className="full-tile column col-xs-12 social-links text-center">
                                            <div className="social-links-title margin-top-10">Go ahead and sign in with any of the services below.</div>
                                            <ul className="icons inline social-icons icon-circle margin-top-20">
                                                <li className="pinterest" data-toggle="tooltip" title="Pinterest"><a href="" className="elegant-" target="_blank"><i className="fa fa-pinterest"></i></a></li>
                                                <li className="facebook" data-toggle="tooltip" title="Facebook"><a href="" className="elegant-" target="_blank"><i className="fa fa-facebook"></i></a></li>
                                                <li className="twitter" data-toggle="tooltip" title="Twitter"><a href="" className="" target="_blank"><i className="fa fa-twitter"></i></a></li>
                                                <li className="googleplus" data-toggle="tooltip" title="GooglePlus"><a href="" className="social-icon icon-google_plus" target="_blank"><i className="fa fa-google-plus"></i></a></li>
                                                <li className="instagram" className="tooltip" title="Instagram" ><a href="" target="_blank"><i className="fa fa-instagram"></i></a></li>
                                            
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                </form>
                            </div>
                    </div>
                </div>
         );
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HomeForm);