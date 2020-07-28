import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "./Search"

class Nav extends Component {


    render() {
    const { navChange, handleLogout, currentUser, getSearchTerm} = this.props
      // debugger
      return (
        <nav>
          <ul>
            <li>
              <Link to='/' onClick={() => navChange("home")}>DOODL</Link>
            </li>
            {!currentUser.id ? 

              <li>
              {/* onClick={() => navChange("sign")} */}
                <Link to='/'  data-toggle="modal" data-target="#signModal" >Log In | Sign Up</Link> 
              </li>
              :  
              <>
                <li id="nav-link-container"><Link to='/profile' onClick={() => navChange("profile")}>Profile</Link>
                <Link to='/new' onClick={() => navChange("new")}>Draw Doodle</Link> 
                <Link to='/' onClick={handleLogout}>Log Out</Link> </li>
              </>
            }
          </ul>
          <div id="search-container">
            <Search getSearchTerm={getSearchTerm}/>
          </div>
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
  