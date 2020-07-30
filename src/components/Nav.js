import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "./Search"
import DoodleCanvas from "./DoodleCanvas"

class Nav extends Component {


    render() {

    const { handleLogout, currentUser, getSearchTerm} = this.props

      return (
        <nav>
          <Link to='/'>DOODL</Link>
            
            {!currentUser.id ? 
              <Link to='/'  data-toggle="modal" data-target="#signModal" >Log In | Sign Up</Link> :  
              <>
                <Link to='/profile' >Profile</Link>
                <button data-toggle="modal" data-target="#newCanvasModal">Draw Doodle</button>
                <Link to='/' onClick={handleLogout}>Log Out</Link>
              </>
            }

          {/* <div id="search-container">
            <Search getSearchTerm={getSearchTerm}/>
          </div> */}
        </nav>
      )
    }
}
  export default Nav;


          // <div>
        //     <Link to='/' onClick={() => navChange("home")}>DOODL</Link>
            
        //     {!currentUser.id ? 
        //       <Link to='/sign'onClick={() => navChange("sign")}>Log In | Sign Up</Link> :  
        //       <>
        //         <Link to='/profile' onClick={() => navChange("profile")}>Profile</Link>
        //         <Link to='/new' onClick={() => navChange("new")}>Draw Doodle</Link>
        //         <Link to='/' onClick={handleLogout}>Log Out</Link>
        //       </>
        //     }
        // </div>
  