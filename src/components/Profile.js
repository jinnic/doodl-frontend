import React, { Component } from "react";
import DoodleContainer from "./DoodleContainer";
import ProfileEditForm from "./ProfileEditForm";
import DoodleCanvas from "./DoodleCanvas";

class Profile extends Component {
  state = {
    showEditForm: false,
    userDoodles: [],
    showEditCanvas: false,
    currentlyEditing: {}
  };

  componentDidMount() {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   fetch(`http://localhost:3000/auto_login`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //     .then((resp) => resp.json())
    //     .then((data) => {
    //       this.setState({
    //         currentUser: data,
    //       });
    //     });
    // }


    fetch(`http://localhost:3000/users/${this.props.user.id}`)
      .then((r) => r.json())
      .then((data) => {
        this.setState({ userDoodles: data.doodles });
      });
  }

  componentDidUpdate(prevProps) {
    if(this.props.newDoodle !== prevProps.newDoodle) {
      this.addToState(this.props.newDoodle)
    }
  }

  addToState = (newDood) => {
    this.setState({
      userDoodles: [newDood, ...this.state.userDoodles]
    })
  } 

  //HANDLE DELETE
  handleDelete = (id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/doodles/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then(this.removeFromState(id));
  };

  //HANDLE ADD
  addNewDoodle = (doodle) => {
    const token = localStorage.getItem("token");
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(doodle),
    };
    fetch("http://localhost:3000/doodles", config)
      .then((r) => r.json())
      .then((newDoodle) => {
        this.addToState(newDoodle);
      });
  };

  //HANDLE UPDATE
  handleUpdate = (doodle, id) => {
    const token = localStorage.getItem("token");
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(doodle),
    };
    fetch(`http://localhost:3000/doodles/${id}`, config)
      .then((r) => r.json())
      .then((updatedObj) => {
        this.updateState(updatedObj);
      });
  };

  //DELETE
  //remove one doodle
  removeFromState = (id) => {
    const filtered = this.state.userDoodles.filter((d) => d.id !== id);
    this.setState({
      userDoodles: filtered,
    });
  };

    //ADD
    addToState = (newDoodle) => {
      this.setState({
        userDoodles: [newDoodle, ...this.state.userDoodles],
      });
    };

    //set state for selected doodle for editing
    renderExisting = (dood) => {
      this.setState({
        currentlyEditing: dood,
      });
    };

    //UPDATE
    updateState = (updatedDoodle) => {
      const updatedDoods = this.state.userDoodles.map((doodle) => {
        if (doodle.id === updatedDoodle.id) {
          return updatedDoodle;
        } else {
          return doodle;
        }
      });
      this.setState({
        userDoodles: updatedDoods,
      });
    };

  handleClose = () => {
    this.setState({ showEditForm: false });
  };

  handleShow = () => {
    this.setState({ showEditForm: true });
  };

  handleEditCanvasClose = () => {
    this.setState({ showEditCanvas: false });
  };
  handleEditCanvasShow = () => {
    this.setState({ showEditCanvas: true });
  };

  render() {
    const {
      user,
      handleDelete,
      handleUpdate,
      userUpdate,
      match,
    } = this.props;
    return (
      <div id="profile-page">
        <div>
          <div id="profile-info-container">
            <div id="profile-edit-container">
              <h2>{user.user_name}'s artwork</h2>
              <button
                type="button"
                className="profile-button"
                onClick={this.handleShow}
              >
                edit
              </button>
            </div>
            <p>{user.bio}</p>
            <hr id="line"></hr>
            <ProfileEditForm
              userDelete={this.props.userDelete}
              userUpdate={userUpdate}
              user={user}
              updateUserInfo={this.updateUserInfo}
              show={this.state.showEditForm}
              onHide={this.handleClose}
            />
          </div>
          <DoodleContainer
            user={user}
            handleDelete={this.handleDelete}
            handleUpdate={this.handleUpdate}
            page={this.props.page}
            updateLike={this.props.updateLike}
            handleEditCanvasShow={this.handleEditCanvasShow}
            match={match}
            renderExisting={this.renderExisting}
            doodles={this.state.userDoodles}
          />
        </div>
        <DoodleCanvas
                    user={user}
                    handleUpdate={this.handleUpdate}
                    doodle={this.state.currentlyEditing}
                    show={this.state.showEditCanvas}
                    onHide={this.handleEditCanvasClose}
                  />
      </div>
    );
  }
}
export default Profile;
