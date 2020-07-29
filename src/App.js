import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DoodleContainer from './components/DoodleContainer';
import Nav from './components/Nav';
import Profile from './components/Profile';
import Search from './components/Search';
import DoodleCanvas from './components/DoodleCanvas';
import SignUpIn from './components/SignUpIn';
import './App.css';

class App extends Component {
  
  state = {
    // page: "home",
    doodles: [],
    searchTerm: "",
    currentUser: {},
    doodleEdit: {}
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
    // this.setState({
    //   doodleEdit: {}
    // })
    
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
      
      // this.updateState(updatedObj)
      const updatedDoods = this.state.doodles.map(doodle => {
        if (doodle.id === updatedObj.id) {
          return updatedObj
        } else {
          return doodle
        }
      }) 
      this.setState(
        {
          doodles: updatedDoods
        })
      
    }
    )

    
  }

  emptyDoodleEdit =()=>{
    this.setState(
      {doodleEdit: {} }
    )
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

  //EDITTING DOODLE
  renderExisting = (dood) => {
    this.setState({
      doodleEdit: dood
    })
  }

  /**
   * STATE FUCTIONS : MANIPULATING DOODLES ARRAY
   */
  //ADD
  addToState = (newDoodle) => {
    this.setState({
      doodles: [newDoodle, ...this.state.doodles]
      // doodleEdit: {}
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
    this.setState(prevState => (
      {
        doodles: updatedDoods,
        doodleEdit: ''
      }
    ))
  }

  //DELETE
  removeFromState = (id) => {
    const filtered = this.state.doodles.filter(d => d.id !== id)
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

  
  render() {
    console.log('App token : ',localStorage.getItem('token'))
    console.log(this.state.currentUser)
    return (
      <div>
        <Nav currentUser={this.state.currentUser} handleLogout={this.handleLogout}/>
        <DoodleCanvas user={this.state.currentUser} addNewDoodle={this.addNewDoodle} handleUpdate={this.handleUpdate} emptyDoodleEdit={this.emptyDoodleEdit} doodle={this.state.doodleEdit}/>
        <main>
          <Switch>
            <Route exact path="/" render={() => (
                <>    
                  <Search getSearchTerm={this.getSearchTerm}/> 
                  <DoodleContainer doodles={this.filterDoodles()}/>
                </>
              )} />
            <Route path="/profile" render={routeProps =>(
                <Profile 
                          handleDelete={this.handleDelete} 
                          handleUpdate={this.handleUpdate}
                          user={this.state.currentUser} 
                          doodles={this.filterByUser()}
                          handleNew={this.handleAddNewDoodle}
                          renderExisting={this.renderExisting}
                          {...routeProps}
                />
                
              )} />
            <Route path="/sign" render={()=>(
              <SignUpIn handleLogin={this.handleLogin}/>
            )} />
          </Switch>

        </main>
      </div>
    )
  }
}
export default App;
