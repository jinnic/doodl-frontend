import React, { Component } from "react";
import DoodleContainer from "./DoodleContainer";

class Profile extends Component {
  
    render() {
      const { doodles,  user, handleDelete, handleUpdate } = this.props
      return (
        <div>
          <h2>user_name: {user.user_name}</h2>
          <p>{user.bio}</p>
          <DoodleContainer handleDelete={handleDelete} 
          handleUpdate={handleUpdate}
          page={this.props.page} 
          doodles={doodles}/>
        </div>
      )
    }
}
  export default Profile;
  