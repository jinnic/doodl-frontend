import React, { Component } from "react";
import DoodleContainer from "./DoodleContainer";
import ProfileEditForm from "./ProfileEditForm";

class Profile extends Component {
  state = {
    showEditForm: false
  }

  updateState = (e) => {
    e.preventDefault()
    this.setState(prevState => ({
      showEditForm: !prevState.showEditForm
    }))
  }

  render() {
    const { doodles, user, handleDelete, handleUpdate, userUpdate, renderExisting, match } = this.props
    return (
      <div id="profile-page">
        <div>
          <div id="profile-info-container">
            <div id="profile-edit-container">
              <h2>{user.user_name}'s artwork</h2>
              <button type="button" className="profile-button" data-toggle="modal" data-target="#profileModal">edit</button>
            </div>
            <p>{user.bio}</p>
            <hr id="line"></hr>
            <ProfileEditForm userDelete={this.props.userDelete} userUpdate={userUpdate} user={user} updateUserInfo={this.updateUserInfo}/>
          </div>
          <DoodleContainer 
          user={user}
          handleDelete={handleDelete} 
          handleUpdate={handleUpdate}
          page={this.props.page} 
          updateLike={this.props.updateLike} 
          match={match}
          renderExisting={renderExisting}
          doodles={doodles}/>
        </div>
      </div>
    )
  }
}
  export default Profile;
  