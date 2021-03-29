import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "./Search"
import { ReactComponent as Logo } from './doodl-logo.svg';
import { Button } from "react-bootstrap/Button";

class Nav extends Component {


    render() {

    const { handleLogout, currentUser, getSearchTerm, handleShow } = this.props

      return (
         <nav className="navbar fixed-top navbar-expand-md justify-content-center">
         <Link to='/' className="navbar-brand d-flex w-50 mr-auto"><Logo className='logo'/></Link>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
            <span className="navbar-toggler-icon">MENU</span>
          </button>
         <div className="navbar-collapse collapse w-100" id="collapsingNavbar">

           {!currentUser.id ? 
            <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
                <li className="nav-item">
                  {/* <Link to='/'  data-toggle="modal" data-target="#signModal" className='nav-link' >Log In | Sign Up</Link>  */}
                  <button onClick={handleShow}>Log In | Sign Up</button>
                </li>
            </ul>
           :  
             <> 
              <ul className="navbar-nav w-100 justify-content-center">
                <Search getSearchTerm={getSearchTerm}/>
              </ul>
             <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
                <li className="nav-item">
                  <Link to='/profile' className='nav-link'>Profile</Link>
                </li>
                <li className="nav-item">
                    <button data-toggle="modal" data-target="#newCanvasModal" className='nav-link new-button'>Draw Doodle</button>
                </li>
                <li className="nav-item">
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