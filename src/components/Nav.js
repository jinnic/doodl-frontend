import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "./Search"
import { ReactComponent as Logo } from './doodl-logo.svg';
import DoodleCanvas from "./DoodleCanvas"

class Nav extends Component {


    render() {

    const { handleLogout, currentUser, getSearchTerm} = this.props

      return (
         //================Nav working without style
         <nav class="navbar fixed-top navbar-expand-md justify-content-center">
         <Link to='/' className="navbar-brand d-flex w-50 mr-auto"><Logo className='logo'/></Link>
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
            <span class="navbar-toggler-icon">MENU</span>
          </button>
         <div class="navbar-collapse collapse w-100" id="collapsingNavbar">

           {!currentUser.id ? 
            <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
                <li class="nav-item">
                  <Link to='/'  data-toggle="modal" data-target="#signModal" className='nav-link' >Log In | Sign Up</Link> 
                </li>
            </ul>
           :  
             <> 
              <ul class="navbar-nav w-100 justify-content-center">
                <Search getSearchTerm={getSearchTerm}/>
              </ul>
             <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
                <li class="nav-item">
                  <Link to='/profile' className='nav-link'>Profile</Link>
                </li>
                <li class="nav-item">
                    <button data-toggle="modal" data-target="#newCanvasModal" className='nav-link new-button'>Draw Doodle</button>
                </li>
                <li class="nav-item">
                  <Link to='/' onClick={handleLogout} className='nav-link'>Log Out</Link>
                </li>
            </ul>
             </>
           }
         </div>
       </nav>
      )
    }
}
  export default Nav;