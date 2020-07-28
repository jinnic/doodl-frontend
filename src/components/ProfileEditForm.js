import React, { Component } from "react";

class ProfileEditForm extends Component {
    state = {
        user_name: this.props.user.user_name,
        password: this.props.user.password,
        bio: this.props.user.bio
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const userObj = {
            user_name: this.state.user_name,
            password: this.state.password,
            bio: this.state.bio
        } 

        this.props.userUpdate(userObj, this.props.user.id)
    }
  
    render() {
      return (
        <>  

                        <button onClick={()=> this.props.userDelete(this.props.user.id)}>delete account *gasp*</button>
                        <form onSubmit={this.handleSubmit}>
                            <label>Username:</label>
                            <input name='user_name' value={this.state.user_name} onChange={this.handleChange} type="text"/>
                            <label>Password:</label>
                            <input name='password' value={this.state.password} onChange={this.handleChange} type="password"/>
                            <label>Bio:</label>
                            <input name='bio' value={this.state.bio} onChange={this.handleChange} type="text"/>
                            <button className="ui button" type="submit">update</button>
                        </form>
        </>
      )
    }
}
  export default ProfileEditForm;
  