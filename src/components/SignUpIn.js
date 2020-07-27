import React, { Component } from "react";

class SignUpIn extends Component {
    state={
      user_name: '',
      password: ''
    }

    handleChange=(e)=>{
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleSignIn =(e)=>{
      e.preventDefault()
      console.log('Im logged in')
       fetch(`http://localhost:3000/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .then(data => {
            localStorage.setItem("token", data.jwt)
            this.props.handleLogin(data.user)
        })

        //reset state
        this.setState({
          user_name: '',
          password: ''
        })
    }

    handleSubmit = (evt) => {
      evt.preventDefault()
      
        console.log('Im sign up')
        fetch(`http://localhost:3000/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .then(data => {
            localStorage.setItem("token", data.jwt)
            this.props.handleLogin(data.user)
        })
      

      //reset state
      this.setState({
        user_name: '',
        password: ''
      })
    }

    render() {
      return (
        <div >
          <h1>Sign Up</h1>
          <form className="ui form" onSubmit={this.handleSubmit}>
              <div className="field">
                  <label>Username</label>
                  <input name='user_name' value={this.state.user_name} onChange={this.handleChange} type="text" placeholder="username"/>
              </div>
              <div className="field">
                  <label>Password</label>
                  <input name='password' value={this.state.password} onChange={this.handleChange} type="password" placeholder="password"/>
              </div>
              <button name='signUp' className="ui button" type="submit">Sign Up</button>
          </form>
          <br/>
          <h1>Log In</h1>
          <form className="ui form" onSubmit={this.handleSignIn}>
              <div className="field">
                  <label>Username</label>
                  <input name='user_name' value={this.state.user_name} onChange={this.handleChange} type="text" placeholder="username"/>
              </div>
              <div className="field">
                  <label>Password</label>
                  <input name='password' value={this.state.password} onChange={this.handleChange} type="password" placeholder="password"/>
              </div>
              
              <button name='logIn' className="ui button" type="submit">Log In</button>
          </form>
        </div>
      )
    }
}
  export default SignUpIn;