import React, { Component } from "react";
import DoodleContainer from "./DoodleContainer";

class Profile extends Component {
  
    render() {
      console.log(this.props)
      const { doodles,  user, handleDelete } = this.props
      return (
        <div>
          <h2>user_name: {user.user_name}</h2>
          <p>{user.bio}</p>
          <DoodleContainer handleDelete={handleDelete} page={this.props.page} doodles={doodles}/>
        </div>
      )
    }
}
  export default Profile;
  