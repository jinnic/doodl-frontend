import React, { Component } from "react";

class Nav extends Component {


    render() {
    const { navChange, handleLogout } = this.props

      return (
        <div>
            <ul>
                <li onClick={() => navChange("profile")}>Profile</li>
                <li onClick={() => navChange("home")}>DOODL</li>
                <li onClick={() => navChange("sign")}>sign in / sign up</li>
                <li onClick={handleLogout}> logout </li>
                <li onClick={() => navChange("new")}>create new doodle</li>
            </ul>
        </div>
      )
    }
}
  export default Nav;
  