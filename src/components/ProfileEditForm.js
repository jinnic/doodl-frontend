import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

class ProfileEditForm extends Component {
  state = {
    user_name: this.props.user.user_name,
    password: this.props.user.password,
    // bio: this.props.user.bio,
  };
  //set title state when it's edit
  componentDidUpdate(prevProps) {
    // console.log(this.props.user.user_name)
    // if(this.props.user){
    //     this.setState({
    //         user_name: this.props.user.user_name,
    //         password: this.props.user.password,
    //         bio: this.props.user.bio
    //     })
    // }
    if (this.props.user !== prevProps.user) {
      console.log(this.props.user);
      this.setState({
        user_name: this.props.user.user_name
      });
    }
  }

  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => console.log(this.state)
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const userObj = {
      user_name: this.state.user_name,
      password: this.state.password,
      // bio: this.state.bio,
    };
    this.props.userUpdate(userObj, this.props.user.id);
    this.props.onHide();
  };

  render() {
    const { onHide, show } = this.props;
    return (
      <Modal
        show={show}
        onHide={onHide}
        scrollable={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="">
          <h5 className="modal-title" id="profileModalLabel">
            Edit {this.props.user.user_name}'s profile
          </h5>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input
                className="form-control"
                name="user_name"
                value={this.state.user_name}
                onChange={this.handleChange}
                type="text"
              />
              <label>Password:</label>
              <input
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
              {/* <label>Bio:</label>
              <input
                className="form-control"
                name="bio"
                value={this.state.bio}
                onChange={this.handleChange}
                type="text"
              /> */}
              <Modal.Footer>
                <button className="button" type="submit">
                  Update
                </button>
              </Modal.Footer>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}
export default ProfileEditForm;
