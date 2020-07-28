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
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#profileModal">edit user profile</button>

          <div class="modal fade" id="profileModal" tabindex="-1" role="dialog" aria-labelledby="profileModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="profileModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
                          
                        <ProfileEditForm userDelete={this.props.userDelete} userUpdate={this.props.userUpdate} user={this.props.user}/>

                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
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
  