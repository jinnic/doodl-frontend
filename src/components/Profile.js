import React, { Component } from "react";
import DoodleContainer from "./DoodleContainer";

class Profile extends Component {
  
    render() {
      console.log("IN Profile",this.props)
      const { doodles, user, handleDelete, handleUpdate, match, renderExisting} = this.props
      return (
        <div>
          <h2>user_name: {user.user_name}</h2>
          <p>{user.bio}</p>
          <DoodleContainer 
          user={user}
          handleDelete={handleDelete} 
          handleUpdate={handleUpdate}
          page={this.props.page}
          match={match} 
          doodles={doodles}
          renderExisting={renderExisting}
          />
          
        </div>
      )
    }
}
  export default Profile;
  