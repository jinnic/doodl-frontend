import React, { Component } from "react";
import DoodleContainer from "./DoodleContainer";
import ProfileEditForm from "./ProfileEditForm";

class Profile extends Component {
  state = {
    showEditForm: false
  }

  renderForm = () => {
    if (this.state.showEditForm === true) {
      return <ProfileEditForm userDelete={this.props.userDelete} userUpdate={this.props.userUpdate} user={this.props.user}/>
    }
  }

  updateState = (e) => {
    e.preventDefault()
    this.setState(prevState => ({
      showEditForm: !prevState.showEditForm
    }))
  }

  render() {
    const { doodles, user, handleDelete, handleUpdate, userUpdate } = this.props
    return (
      <div>
        <div>
          <h2>{user.user_name}'s artwork</h2>
          <p>bio: {user.bio}</p>
          {this.renderForm()}
          <button onClick={this.updateState}>edit user profile</button>
        </div>

        <div>
          <DoodleContainer 
          user={user}
          handleDelete={handleDelete} 
          handleUpdate={handleUpdate}
          page={this.props.page} 
          doodles={doodles}/>
        </div>
      </div>
    )
  }
}
  export default Profile;
  