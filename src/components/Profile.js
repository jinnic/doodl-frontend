import React, { Component } from "react";
import DoodleContainer from "./DoodleContainer";
import ProfileEditForm from "./ProfileEditForm";
import DoodleCanvas from "./DoodleCanvas";
import Pagination from "./Pagination";
import Loading from "./Loading";

class Profile extends Component {
  state = {
    showEditForm: false,
    userDoodles: [],
    showEditCanvas: false,
    currentlyEditing: {},
    page: 1,
    totalPages: 1,
    loading: ""
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetch(`http://localhost:3000/users/${this.props.user.id}`)
      .then((r) => r.json())
      .then((data) => {
        this.setState({
          userDoodles: data.doodles,
          totalPages: data.total_pages,
          page: 1,
        });
      });
      this.setState({ loading: false });
  }

  componentDidUpdate(prevProps) {
    if (this.props.newDoodle !== prevProps.newDoodle) {
      this.addToState(this.props.newDoodle);
    }
  }

  addToState = (newDood) => {
    this.setState({
      userDoodles: [newDood, ...this.state.userDoodles],
    });
  };

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
      // totalPages: Math.ceil(this.state.userDoodles/6)
    });
    // console.log(this.state.page, this.state.userDoodles.length )
    if(this.state.userDoodles.length === 1 && this.state.page > 1) {
      this.handleChangePage(-1);
    }
  };

  //ADD
  addToState = (newDoodle) => {
    this.setState({
      userDoodles: [newDoodle, ...this.state.userDoodles],
      totalPages: Math.ceil(this.state.userDoodles/6)
    });
    // if(Math.ceil(this.state.userDoodles/6)) {
    //   this.setState({
    //     page: this.state.total_pages + 1
    //   })
    // }
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

  handleChangePage = (num) => {
    if (this.state.page + num >= 1) {
      this.setState({ page: this.state.page + num }, () =>
        this.updatePagination()
      );
    }
  };

  updatePagination = () => {
    this.setState({ loading: true });
    fetch(
      `http://localhost:3000/users/${this.props.user.id}/?page=${this.state.page}`
    )
      .then((r) => r.json())
      .then((data) => {
        this.setState({
          userDoodles: data.doodles,
          totalPages: data.total_pages,
          loading: false
        });
      });
  };

  render() {
    const { user, handleDelete, handleUpdate, userUpdate, match } = this.props;
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
          {this.state.loading ? (
            <Loading />
          ) : (
            <>
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
              {this.state.totalPages <= 1 ? (
                ""
              ) : (
                <Pagination
                  handleChangePage={this.handleChangePage}
                  page={this.state.page}
                  totalPages={this.state.totalPages}
                />
              )}{" "}
            </>
          )}
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
