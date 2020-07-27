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
    searchTerm: "",
    currentUser: {
      id: 1, 
      user_name: "hi",
      bio: "im bashir"
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/doodles')
        .then(r=>r.json())
        .then(doodles => this.setState(
                                {doodles: doodles.reverse()},
                              )
        )
  }

  handleUpdate = (doodle, id) => {
    const config = {
      method: 'PATCH',
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(doodle)
    }
    fetch(`http://localhost:3000/doodles/${id}`, config)
    .then(r => r.json())
    .then(updatedObj => this.updateState(updatedObj))
  }

  handleDelete = (id) => {
    fetch(`http://localhost:3000/doodles/${id}`, {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(this.removeFromState(id))
  }

  addNewDoodle = (doodle) => {
      const config = {
        method: 'POST',
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(doodle)
      }
      fetch('http://localhost:3000/doodles', config)
      .then(r => r.json())
      .then(newDoodle => this.addToState(newDoodle))
  }

  updateState = (updatedDoodle) => {
    const updatedDoods = this.state.doodles.map(doodle => {
      if (doodle.id === updatedDoodle.id) {
        return updatedDoodle
      } else {
        return doodle
      }
  }) 
    this.setState({
      doodles: updatedDoods
    })
  }

  addToState = (newDoodle) => {
    this.setState({
      doodles: [newDoodle, ...this.state.doodles]
    })
  }

  removeFromState = (id) => {
    const filtered = this.state.doodles.filter(d => d.id !== id)
    this.setState({
      doodles: filtered
    })
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

  //FILTER

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

  filterByUser = () => {
    const doodles = this.state.doodles 
    const currentUser = this.state.currentUser
    const filtered = doodles.filter(d => d.user_id === currentUser.id)
    return filtered
  }


  renderPage = () => {
    //switch statements?
    const page = this.state.page 
    if (page === "profile") {
       return <Profile page={this.state.page} 
       handleDelete={this.handleDelete} 
       handleUpdate={this.handleUpdate}
       user={this.state.currentUser} 
       doodles={this.filterByUser()}
       handleNew={this.handleAddNewDoodle}/>
    }
    else if (page === "sign") {
      return <SignUpIn />
    }
    else if (page === "new") {
      return <DoodleCanvas addNewDoodle={this.addNewDoodle} />
    }
    else if (page === "home") {
      return (   
          <>    
            <Search getSearchTerm={this.getSearchTerm}/> 
            <DoodleContainer page={this.state.page} doodles={this.filterDoodles()}/>
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
