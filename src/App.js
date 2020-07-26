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
    page: "home",
    doodles: [],
    searchTerm: ""
  }
  componentDidMount() {
    fetch('http://localhost:3000/doodles')
        .then(r=>r.json())
        .then(doodles => this.setState(
                                {doodles: doodles.reverse()},
                                ()=>console.log('Fetched all saved Doodles ',this.state.doodles)
                              )
        )
  }
  //NAV FUNCTIONS
  navChange = (page) => {
    this.setState({
      page: page
    })
  }

  //SEARCH FUNCTIONS
  getSearchTerm =(e)=>{
    // console.log(e.target.value)
    this.setState({
      searchTerm: e.target.value
    })
  }

  filterDoodles=()=>{
    const doodles = this.state.doodles
    const searchTerm = this.state.searchTerm
    
    if(searchTerm === ''){
      return doodles
    }else{
      const filtered = doodles.filter(doodle => doodle.name.includes(searchTerm))
      return filtered
    }
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
            <Search getSearchTerm={this.getSearchTerm}/> 
            <DoodleContainer doodles={this.filterDoodles()}/>
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
