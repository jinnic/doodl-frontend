import React, { Component } from "react";
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.min';
class ProfileEditForm extends Component {
    state = {
        user_name:this.props.user.user_name,
        password: this.props.user.password,
        bio: this.props.user.bio
    }
    //set title state when it's edit
    // componentDidMount() {
        
    //     if(this.props.user){
    //         this.setState({
    //             user_name: this.props.user.user_name,
    //             password: this.props.user.password,
    //             bio: this.props.user.bio
    //         })
    //     }
    // }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        },()=>console.log(this.state))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const userObj = {
            user_name: this.state.user_name,
            password: this.state.password,
            bio: this.state.bio
        } 
        // this.props.updateUserInfo(userObj)
        this.props.userUpdate(userObj, this.props.user.id)
        $('#profileModal').modal("hide")
    }
  
    render() {
      return (
        
        <div className="modal fade" id="profileModal" tabIndex="-1" role="dialog" aria-labelledby="profileModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="profileModalLabel">Edit {this.props.user.user_name}'s profile</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    <div className='form-group'>

                            <label>Username:</label>
                            <input className='form-control' name='user_name' value={this.state.user_name} onChange={this.handleChange} type="text"/>
                            <label>Password:</label>
                            <input className='form-control' name='password' value={this.state.password} onChange={this.handleChange} type="password"/>
                            <label>Bio:</label>
                            <input className='form-control' name='bio' value={this.state.bio} onChange={this.handleChange} type="text"/>
                            
                        </div>    
                    </div>
                    <div className="modal-footer">
                    <button className="button" type="submit" >Update</button>
                    {/* <button className="button" onClick={()=> this.props.userDelete(this.props.user.id)}>Delete</button> */}
                    </div>

                </form>
                </div>
            </div>
        </div>
      )
    }
}
  export default ProfileEditForm;
  