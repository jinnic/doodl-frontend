import React, { Component } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";
import DoodleContainer from "./components/DoodleContainer";
import Nav from "./components/Nav";
import Profile from "./components/Profile";
import DoodleCanvas from "./components/DoodleCanvas";
import NewCanvas from "./components/NewCanvas";
import SignUpIn from "./components/SignUpIn";
import Loading from "./components/Loading";
import Pagination from "./components/Pagination";
import "./App.css";

class App extends Component {
  state = {
    doodles: [],
    searchTerm: "",
    currentUser: null,
    loading: "",
    showSignUpIn: false,
    showNewCanvas: false,
    page: 1,
    totalPages: 1,
    newDoodleProfile: null,
    profileClicked: false
  };

  /**
   * Auto login on initial load
   */
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:3000/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({
            currentUser: data,
          });
        });
    }

    this.doodleFetch();
  }

  doodleFetch = () => {
    this.setState({ loading: true });
    fetch("http://localhost:3000/doodles")
      .then((r) => r.json())
      .then((data) => {
        this.setState({
          doodles: data.doodles,
          totalPages: data.total_pages,
          page: 1,
        });
        this.setState({ loading: false });
      });
  };

  handleLogin = (user) => {
    this.setState({
      currentUser: user,
    });
  };

  handleLogout = () => {
    this.setState({
      currentUser: {},
    });
    localStorage.removeItem("token");
  };

  /**
   * FUCTION PROPS : FETCH
   */

  addNewDoodle = (doodle) => {
    const location = this.props.location.pathname;
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
        if (location === "/profile") {
          this.setState({
            newDoodleProfile: newDoodle,
          });
        } else {
          this.addToState(newDoodle);
        }
      });
  };

  // //HANDLE UPDATE
  // handleUpdate = (doodle, id) => {
  //   const token = localStorage.getItem("token");
  //   const config = {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(doodle),
  //   };
  //   fetch(`http://localhost:3000/doodles/${id}`, config)
  //     .then((r) => r.json())
  //     .then((updatedObj) => {
  //       this.updateState(updatedObj);
  //     });
  // };

  userUpdate = (user, id) => {
    const token = localStorage.getItem("token");

    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(user),
    };
    fetch(`http://localhost:3000/users/${id}`, config)
      .then((r) => r.json())
      .then((updatedUser) => {
        this.setState(
          {
            currentUser: updatedUser,
          },
          () => console.log("UPDATED USER", updatedUser)
        );
      });
  };

  userDelete = (id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then(this.handleLogout(), this.removeUserDoodles(id));
  };

  //UPDATE LIKES
  updateLike = (doodle_id) => {
    const likeObj = {
      user_id: this.state.currentUser.id,
      doodle_id: doodle_id,
    };
    const token = localStorage.getItem("token");
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(likeObj),
    };

    fetch(`http://localhost:3000/doodles/${doodle_id}/likes`, config)
      .then((r) => r.json())
      .then((doodle) => this.updateState(doodle));
  };

  /**
   * STATE FUCTIONS : MANIPULATING DOODLES ARRAY
   */
  //ADD
  addToState = (newDoodle) => {
    this.setState({
      doodles: [newDoodle, ...this.state.doodles],
    });
  };

  //DELETE
  //remove all doodle by user_id
  removeUserDoodles = (id) => {
    const filtered = this.state.doodles.filter((d) => d.user_id !== id);
    this.setState({
      doodles: filtered,
    });
  };

  //SEARCH FUNCTIONS : UPDATE searchTerm STATE
  getSearchTerm = (e) => {
    this.setState({
      searchTerm: e.target.value.toLowerCase(),
    });
  };

  // //set state for selected doodle for editing
  // renderExisting = (dood) => {
  //   this.setState({
  //     currentlyEditing: dood,
  //   });
  // };

  /**
   * handle modal state : open and close
   */
  //signup & login
  handleClose = () => {
    this.setState({ showSignUpIn: false });
  };
  handleShow = () => {
    this.setState({ showSignUpIn: true });
  };
  //new canvas
  handleNewCanvasClose = () => {
    this.setState({ showNewCanvas: false });
  };
  handleNewCanvasShow = () => {
    this.setState({ showNewCanvas: true });
  };
  //doodle canvas : canvas for editing doodle
  // handleEditCanvasClose = () => {
  //   this.setState({ showEditCanvas: false });
  // };
  // handleEditCanvasShow = () => {
  //   this.setState({ showEditCanvas: true });
  // };

  /**
   * FILTER FUCTIONS : RETURN FILTERED DOODLES  ARRAY
   */
  //by searchTerm
  filterDoodles = () => {
    const doodles = this.state.doodles;
    const searchTerm = this.state.searchTerm;

    if (searchTerm === "") {
      return doodles;
    } else {
      const filtered = doodles.filter((doodle) =>
        doodle.name.toLowerCase().includes(searchTerm)
      );
      return filtered;
    }
  };

  //by USER ID
  filterByUser = () => {
    const doodles = this.state.doodles;
    const currentUser = this.state.currentUser;
    const searchTerm = this.state.searchTerm;

    const filtered = doodles.filter((d) => d.user_id === currentUser.id);

    if (searchTerm === "") {
      return filtered;
    } else {
      const filtered = doodles
        .filter((d) => d.user_id === currentUser.id)
        .filter((doodle) => doodle.name.toLowerCase().includes(searchTerm));
      return filtered;
    }
  };

  handleChangePage = (num) => {
    if (this.state.page + num >= 1) {
      this.setState({ page: this.state.page + num }, () =>
        this.updatePagination()
      );
      this.setState({ loading: true });
    }
  };

  updatePagination = () => {
    fetch(`http://localhost:3000/doodles/?page=${this.state.page}`)
      .then((r) => r.json())
      .then((data) => {
        this.setState({ doodles: data.doodles, totalPages: data.total_pages });
        this.setState({ loading: false });
      });
  };

  navigateProfileHome = (e) => {
      this.setState({profileClicked: true})
  }

  updateProfileClicked = () => {
    this.setState({profileClicked: false})
}



  render() {
    return (
      <>
        <Nav
          getSearchTerm={this.getSearchTerm}
          currentUser={this.state.currentUser}
          handleLogout={this.handleLogout}
          handleShow={this.handleShow}
          handleNewCanvasShow={this.handleNewCanvasShow}
          doodleFetch={this.doodleFetch}
          navigateProfileHome={this.navigateProfileHome}
        />
        <NewCanvas
          user={this.state.currentUser}
          addNewDoodle={this.addNewDoodle}
          show={this.state.showNewCanvas}
          onHide={this.handleNewCanvasClose}
        />

        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <>
                  <SignUpIn
                    handleLogin={this.handleLogin}
                    onHide={this.handleClose}
                    show={this.state.showSignUpIn}
                  />
                  {this.state.loading ? (
                    <Loading />
                  ) : (
                    <>
                      <DoodleContainer
                        doodles={this.filterDoodles()}
                        user={this.state.currentUser}
                        updateLike={this.updateLike}
                        page={this.state.page}
                      />
                      {this.state.totalPages <= 1  ? (
                        ""
                      ) : (
                        <Pagination
                          handleChangePage={this.handleChangePage}
                          page={this.state.page}
                          totalPages={this.state.totalPages}
                        />
                      )}
                    </>
                  )}
                </>
              )}
            />
            <Route
              path="/profile"
              render={(routeProps) => (
                <>
                  {!this.state.currentUser ? (
                    <Loading />
                  ) : (
                    <>
                      <Profile
                        user={this.state.currentUser}
                        updateLike={this.updateLike}
                        handleNew={this.handleAddNewDoodle}
                        userUpdate={this.userUpdate}
                        userDelete={this.userDelete}
                        renderExisting={this.renderExisting}
                        handleEditCanvasShow={this.handleEditCanvasShow}
                        newDoodle={this.state.newDoodleProfile}
                        updateProfileClicked={this.updateProfileClicked}
                        profileClicked={this.state.profileClicked}
                        // navigateProfileHome={this.navigateProfileHome()}
                        {...routeProps}
                      />
                    </>
                  )}
                </>
              )}
            />
          </Switch>
        </main>
      </>
    );
  }
}
export default App;
