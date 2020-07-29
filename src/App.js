import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import DoodleContainer from './components/DoodleContainer';
import Nav from './components/Nav';
import Profile from './components/Profile';
import Search from './components/Search';
import DoodleCanvas from './components/DoodleCanvas';
import SignUpIn from './components/SignUpIn';
import './App.css';

class App extends Component {
  
  state = {
    page: "home",
    doodles: [],
    searchTerm: "",
    currentUser: {}
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
    
    //change page to profile after adding new doodle
    this.navChange('profile')
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
    .then(updatedObj => this.updateState(updatedObj))
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
      },()=>console.log('UPDATED USER++++++++++', updatedUser))
      // $('#profileModal').modal("hide")
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
    this.setState({
      doodles: updatedDoods
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


  //NAV FUNCTIONS : UPDATE PAGE STATE
  navChange = (page) => {
    this.setState({
      page: page
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

  
  render() {
    // console.log(this.state.currentUser)
    return (
      <>
        <Nav getSearchTerm={this.getSearchTerm} currentUser={this.state.currentUser} handleLogout={this.handleLogout} navChange={this.navChange} />
        {/* {this.renderPage()} */}
        <main>
          <Switch>
            <Route exact path="/" render={() => (
              <>
                  <SignUpIn handleLogin={this.handleLogin}/>
                  <DoodleCanvas user={this.state.currentUser} addNewDoodle={this.addNewDoodle} />
                  <DoodleContainer page={this.state.page} doodles={this.filterDoodles()}/>
              </>
              )} />
            <Route path="/profile" render={() =>(
                <Profile page={this.state.page} 
                  handleDelete={this.handleDelete} 
                  handleUpdate={this.handleUpdate}
                  user={this.state.currentUser} 
                  doodles={this.filterByUser()}
                  handleNew={this.handleAddNewDoodle}
                  userUpdate={this.userUpdate}
                  userDelete={this.userDelete}
                />
              )} />
            {/* <Route path="/profile" render={()=>(
              
            )} /> */}
            {/* <Route path="/new" render={()=>(
              <DoodleCanvas user={this.state.currentUser} addNewDoodle={this.addNewDoodle} />
            )} /> */}
          </Switch>

        </main>
      </>
    )
  }
}
export default App;
