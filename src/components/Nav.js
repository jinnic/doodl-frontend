import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "./Search"
import DoodleCanvas from "./DoodleCanvas"

class Nav extends Component {


    render() {

    const { handleLogout, currentUser, getSearchTerm} = this.props

      return (

        //================Nav working without style
        // <nav>
        //   <Link to='/'>DOODL</Link>
            
        //     {!currentUser.id ? 
        //       <Link to='/'  data-toggle="modal" data-target="#signModal" >Log In | Sign Up</Link> :  
        //       <>
        //         <Search getSearchTerm={getSearchTerm}/>
        //         <Link to='/profile' >Profile</Link>
        //         <button data-toggle="modal" data-target="#newCanvasModal">Draw Doodle</button>
        //         <Link to='/' onClick={handleLogout}>Log Out</Link>
        //       </>
        //     }
        // </nav>
        //================Nav working without style ends


        //</nav>
        //   <ul>
        //     <li>
        //       <Link to='/' id="logo"><span id="D">D</span>
        //       <span id="O">O</span><span id="O2">O</span><span id="D2">D</span><span id="L">L</span></Link>
        //     </li>
        //       {!currentUser.id ? 
        //         <li> <Link to='/'  data-toggle="modal" data-target="#signModal" >Log In | Sign Up</Link> </li>:  
        //         <>
        //           <li> <Link to='/profile' >Profile</Link> 
        //           <button data-toggle="modal" id="new-button" data-target="#newCanvasModal">Draw Doodle</button> 
        //             <Link to='/' onClick={handleLogout}>Log Out</Link></li>
        //         </>
        //       }

        //     </ul>
        //     < Search />
        // </nav>

        <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-primary">
          <span className="navbar-brand abs" ><Search getSearchTerm={getSearchTerm} /></span>
          {/* <Link to='/' className="navbar-brand abs" id="logo"><span id="D">D</span>
              <span id="O">O</span><span id="O2">O</span><span id="D2">D</span><span id="L">L</span></Link> */}
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
        <span class="navbar-toggler-icon"></span>
        </button>
          <div class="navbar-collapse collapse" id="collapsingNavbar">
          <ul class="navbar-nav">
              <li class="nav-item">
              <Link to='/' className="nav-link" id="logo"><span id="D">D</span>
              <span id="O">O</span><span id="O2">O</span><span id="D2">D</span><span id="L">L</span></Link>
              </li>
          </ul>
          <ul class="navbar-nav ml-auto">
          {!currentUser.id ? 
                <li className="nav-item"> <Link className="nav-link" to='/'  data-toggle="modal" data-target="#signModal" >Log In | Sign Up</Link> </li>:  
                <>

                  <li className="nav-item"> <Link to='/profile' className="nav-link" >Profile</Link>  </li>
                  <li className="nav-item"><a className="nav-link" data-toggle="modal" data-target="#newCanvasModal">Draw Doodle</a> </li>
                  <li className="nav-item"> <Link to='/' className="nav-link" onClick={handleLogout}>Log Out</Link></li>
                </>
              }
          </ul>
          </div>
        </nav>
      )
    }
}
  export default Nav;