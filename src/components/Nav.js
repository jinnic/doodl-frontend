import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {


    render() {
    const { handleLogout, currentUser} = this.props
      // debugger
      return (


        <div>
            <Link to='/'>DOODL</Link>
            
            {!currentUser.id ? 
              <Link to='/sign'>Log In | Sign Up</Link> :  
              <>
                <Link to='/profile' >Profile</Link>
                <Link to='/' data-toggle="modal" data-target="#canvasModal">Draw Doodle</Link>
                {/* <Link to='/new'>Draw Doodle</Link> */}
                <Link to='/'>Log Out</Link>
              </>
            }
        </div>
      )
    }
}
  export default Nav;
  