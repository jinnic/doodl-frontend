import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {


    render() {
    const { navChange, handleLogout, currentUser} = this.props
      // debugger
      return (


        <div>
            <Link to='/' onClick={() => navChange("home")}>DOODL</Link>
            
            {!currentUser.id ? 
              <Link to='/sign'onClick={() => navChange("sign")}>Log In | Sign Up</Link> :  
              <>
                <Link to='/profile' onClick={() => navChange("profile")}>Profile</Link>
                <Link to='/new' onClick={() => navChange("new")}>Draw Doodle</Link>
                <Link to='/' onClick={handleLogout}>Log Out</Link>
              </>
            }
            
           
            {/* <ul>
                <li onClick={() => navChange("profile")}>Profile</li>
                <li onClick={() => navChange("home")}>DOODL</li>
                <li onClick={() => navChange("sign")}>sign in / sign up</li>
                <li onClick={handleLogout}> logout </li>
                <li onClick={() => navChange("new")}>create new doodle</li>
            </ul> */}
        </div>
      )
    }
}
  export default Nav;
  