import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";
import DoodleContainer from "./components/DoodleContainer";
import Nav from "./components/Nav";
import Profile from "./components/Profile";
import DoodleCanvas from "./components/DoodleCanvas";
import NewCanvas from "./components/NewCanvas";
import SignUpIn from "./components/SignUpIn";
import Loading from "./components/Loading";
import "./App.css";

class App extends Component {
  state = {
    doodles: [],
    searchTerm: "",
    currentUser: {},
    currentlyEditing: {},
    loading: "",
    showSignUpIn: false,
    showNewCanvas: false,
    showEditCanvas: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`https://doodl-api.herokuapp.com/auto_login`, {
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

    fetch("https://doodl-api.herokuapp.com/doodles")
      .then((r) => r.json())
      .then((doodles) => {
        this.setState({ doodles: doodles });
        this.setState({ loading: false });
      });
  }

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
    fetch("https://doodl-api.herokuapp.com/doodles", config)
      .then((r) => r.json())
      .then((newDoodle) => {
        this.addToState(newDoodle);
        this.handleNewCanvasClose();
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
    fetch(`https://doodl-api.herokuapp.com/doodles/${id}`, config)
      .then((r) => r.json())
      .then((updatedObj) => {
        this.updateState(updatedObj);
        this.handleEditCanvasClose();
      });
  };

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
    fetch(`https://doodl-api.herokuapp.com/users/${id}`, config)
      .then((r) => r.json())
      .then((updatedUser) => {
        this.setState(
          {
            currentUser: updatedUser,
          },
          () => console.log("UPDATED USER++++++++++", updatedUser)
        );
      });
  };

  //HANDLE DELETE
  handleDelete = (id) => {
    const token = localStorage.getItem("token");
    fetch(`https://doodl-api.herokuapp.com/doodles/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then(this.removeFromState(id));
  };

  userDelete = (id) => {
    const token = localStorage.getItem("token");
    fetch(`https://doodl-api.herokuapp.com/users/${id}`, {
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
    console.log("likeObj :", likeObj);
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

    fetch(`https://doodl-api.herokuapp.com/doodles/${doodle_id}/likes`, config)
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

  //UPDATE
  updateState = (updatedDoodle) => {
    const updatedDoods = this.state.doodles.map((doodle) => {
      if (doodle.id === updatedDoodle.id) {
        return updatedDoodle;
      } else {
        return doodle;
      }
    });
    this.setState({
      doodles: updatedDoods,
    });
  };

  //DELETE
  removeFromState = (id) => {
    const filtered = this.state.doodles.filter((d) => d.id !== id);
    this.setState({
      doodles: filtered,
    });
  };

  removeUserDoodles = (id) => {
    const filtered = this.state.doodles.filter((d) => d.user_id !== id);
    this.setState({
      doodles: filtered,
    });
  };

  //SEARCH FUNCTIONS : UPDATE searchTerm STATE
  getSearchTerm = (e) => {
    // console.log(e.target.value)
    this.setState({
      searchTerm: e.target.value.toLowerCase(),
    });
  };

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

  renderExisting = (dood) => {
    this.setState({
      currentlyEditing: dood,
    });
  };

  handleClose = () => {
    this.setState({ showSignUpIn: false });
  };
  handleShow = () => {
    this.setState({ showSignUpIn: true });
  };

  handleNewCanvasClose = () => {
    this.setState({ showNewCanvas: false });
  };

  handleNewCanvasShow = () => {
    this.setState({ showNewCanvas: true });
  };

  handleEditCanvasClose = () => {
    this.setState({ showEditCanvas: false });
  };
  
  handleEditCanvasShow = () => {
    this.setState({ showEditCanvas: true });
  };

  render() {
    return (
      <>
        <Nav
          getSearchTerm={this.getSearchTerm}
          currentUser={this.state.currentUser}
          handleLogout={this.handleLogout}
          handleShow={this.handleShow}
          handleNewCanvasShow={this.handleNewCanvasShow}
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
                    <DoodleContainer
                      doodles={this.filterDoodles()}
                      user={this.state.currentUser}
                      updateLike={this.updateLike}
                    />
                  )}
                </>
              )}
            />
            <Route
              path="/profile"
              render={(routeProps) => (
                <>
                { this.state.loading ? <Loading/> :
                  <Profile
                    handleDelete={this.handleDelete}
                    handleUpdate={this.handleUpdate}
                    user={this.state.currentUser}
                    updateLike={this.updateLike}
                    doodles={this.filterByUser()}
                    handleNew={this.handleAddNewDoodle}
                    userUpdate={this.userUpdate}
                    userDelete={this.userDelete}
                    renderExisting={this.renderExisting}
                    handleEditCanvasShow={this.handleEditCanvasShow}
                    {...routeProps}
                  />
                }
                  <DoodleCanvas
                    user={this.state.currentUser}
                    handleUpdate={this.handleUpdate}
                    doodle={this.state.currentlyEditing}
                    show={this.state.showEditCanvas}
                    onHide={this.handleEditCanvasClose}
                  />
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
