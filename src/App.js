import React, { Component } from 'react';
import DoodleContainer from './components/DoodleContainer';
import Nav from './components/Nav';
import Profile from './components/Profile';
import Search from './components/Search';
import DoodleCanvas from './components/DoodleCanvas';
import SignUpIn from './components/SignUpIn';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import './App.css';

class App extends Component {

  state = {
    page: "home"
  }

  //NAV FUNCTIONS
  navChange = (page) => {
    this.setState({
      page: page
    })
  }

  renderPage = () => {
    //switch statements?
    const page = this.state.page 
    if (page === "profile") {
       return <Profile />
    }
    else if (page === "sign") {
      return <SignUpIn />
    }
    else if (page === "new") {
      return <DoodleCanvas />
    }
    else if (page === "home") {
      return (   
          <>    
            <Search /> 
            <DoodleContainer />
          </>
        )
    }
  }
  
  render() {
    return (
      <div>
        <Nav navChange={this.navChange} />
        {this.renderPage()}
      </div>
    )
  }
}
export default App;
