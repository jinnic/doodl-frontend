import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import DoodleContainer from './components/DoodleContainer';
import Nav from './components/Nav';
import Profile from './components/Profile';
import Search from './components/Search';
import DoodleCanvas from './components/DoodleCanvas';
import NewCanvas from './components/NewCanvas';
import SignUpIn from './components/SignUpIn';
import './App.css';

class App extends Component {
  
  state = {
    doodles: [],
    searchTerm: "",
    currentUser: {},
    currentlyEditing: {}
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if(token){
      fetch(`http://localhost:3000/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          currentUser: data
        })
        // console.log(data)
      })
    }

    fetch('http://localhost:3000/doodles')
        .then(r=>r.json())
        .then(doodles => this.setState(
                                {doodles: doodles.reverse()},
                              )
        )
  }

  handleLogin=(user)=>{
    this.setState({
      currentUser: user
    })
    
  }

  handleLogout=()=>{
    this.setState({
      currentUser: {}
    })
    localStorage.removeItem("token")
  }
  /**
   * FUCTION PROPS : FETCH
   */
  
   //HANDLE ADD
  addNewDoodle = (doodle) => {
    
    const token = localStorage.getItem("token")
    const config = {
      method: 'POST',
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(doodle)
    }
    fetch('http://localhost:3000/doodles', config)
    .then(r => r.json())
    .then(newDoodle => this.addToState(newDoodle))
    
  }

  //HANDLE UPDATE
  handleUpdate = (doodle, id) => {
    const token = localStorage.getItem("token")
    const config = {
      method: 'PATCH',
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(doodle)
    }
    fetch(`http://localhost:3000/doodles/${id}`, config)
    .then(r => r.json())
    .then(updatedObj => {
       this.updateState(updatedObj)})
  }

  userUpdate = (user, id) => {
    const token = localStorage.getItem("token")

    const config = {
      method: 'PATCH',
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(user)
    }
    fetch(`http://localhost:3000/users/${id}`, config)
    .then(r => r.json())
    .then(updatedUser => {
      this.setState({
        currentUser: updatedUser
      })
    })
  }

  //HANDLE DELETE
  handleDelete = (id) => {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/doodles/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
    .then(r => r.json())
    .then(this.removeFromState(id))
  }

  userDelete = (id) => {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(r => r.json())
    .then(this.handleLogout(), this.removeUserDoodles(id))
  }

  /**
   * STATE FUCTIONS : MANIPULATING DOODLES ARRAY
   */
  //ADD
  addToState = (newDoodle) => {
    this.setState({
      doodles: [newDoodle, ...this.state.doodles]
    })
  }

  //UPDATE
  updateState = (updatedDoodle) => {
    const updatedDoods = this.state.doodles.map(doodle => {
      if (doodle.id === updatedDoodle.id) {
        return updatedDoodle
      } else {
        return doodle
      }
    }) 

    //ERROR - when we try to update 'currentlyEditing' it throws Unhandled Rejection (Error)
    this.setState({
      doodles: updatedDoods,
      currentlyEditing: {}
    })
  }

  //DELETE
  removeFromState = (id) => {
    const filtered = this.state.doodles.filter(d => d.id !== id)
    this.setState({
      doodles: filtered
    })
  }

  removeUserDoodles = (id) => {
    const filtered = this.state.doodles.filter(d => d.user_id !== id)
    this.setState({
      doodles: filtered
    })
  }

  //SEARCH FUNCTIONS : UPDATE searchTerm STATE
  getSearchTerm =(e)=>{
    // console.log(e.target.value)
    this.setState({
      searchTerm: e.target.value.toLowerCase()
    })
  }

  /**
   * FILTER FUCTIONS : RETURN FILTERED DOODLES  ARRAY
   */
  //by searchTerm
  filterDoodles=()=>{
    const doodles = this.state.doodles
    const searchTerm = this.state.searchTerm
    
    if(searchTerm === ''){
      return doodles
    }else{
      const filtered = doodles.filter(doodle => doodle.name.toLowerCase().includes(searchTerm))
      return filtered
    }
  }
  //by USER ID
  filterByUser = () => {
    const doodles = this.state.doodles 
    const currentUser = this.state.currentUser
    const filtered = doodles.filter(d => d.user_id === currentUser.id)
    return filtered
  }

  renderExisting = (dood) => {
    this.setState({
      currentlyEditing: dood
    })
  } 

  
  render() {
    return (
      <>
        <Nav getSearchTerm={this.getSearchTerm} addNewDoodle={this.addNewDoodle} currentUser={this.state.currentUser} handleLogout={this.handleLogout} />
        <NewCanvas user={this.state.currentUser} addNewDoodle={this.addNewDoodle} />
        <main>
          <Switch>
            <Route exact path="/" render={() => (
              <>
                  <DoodleContainer doodles={this.filterDoodles()}/>
              </>
              )} />
            <Route path="/profile" render={routeProps =>(
              <>
                <Profile 
                  handleDelete={this.handleDelete} 
                  handleUpdate={this.handleUpdate}
                  user={this.state.currentUser} 
                  doodles={this.filterByUser()}
                  handleNew={this.handleAddNewDoodle}
                  userUpdate={this.userUpdate}
                  userDelete={this.userDelete}
                  renderExisting={this.renderExisting}
                  {...routeProps}
                />
                <DoodleCanvas user={this.state.currentUser} handleUpdate={this.handleUpdate} doodle={this.state.currentlyEditing}/>
              </>
              )} />
            <Route path="/sign" render={()=>(
              <SignUpIn handleLogin={this.handleLogin}/>
            )} />
          </Switch>

        </main>
      </>
    )
  }
}
export default App;
