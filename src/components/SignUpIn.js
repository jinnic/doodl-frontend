import React, { Component } from "react";
import { useHistory } from "react-router-dom";

class SignUpIn extends Component {
    state = {
      user_name: '',
      password: '',
      bio: '',
      toggle: false
    }

    handleChange=(e)=>{
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleToggle =()=>{
      this.setState(prevState =>({toggle: !prevState.toggle}), ()=>console.log(this.state.toggle))
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
            localStorage.setItem("token", data.token)
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
            localStorage.setItem("token", data.token)
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
        <div class="modal fade" id="signModal" tabindex="-1" role="dialog" aria-labelledby="signModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title " id="signModalLabel">{!this.state.toggle ? 'Welcome to Doodl' : 'Welcome Back'}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input className='form-control' name='user_name' value={this.state.user_name} onChange={this.handleChange} type="text" placeholder="username"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input className='form-control' name='password' value={this.state.password} onChange={this.handleChange} type="password" placeholder="password"/>
                            </div>
                            <button name='signUp' className="btn btn-primary mx-auto d-block" type="submit">{!this.state.toggle ? 'Sign up' : 'Log In'}</button>
                        </form>
                        <hr className="hr-text" data-content="or"/>
                            {/* <div className="form-group">
                                <label>Username</label>
                                <input className='form-control' name='user_name' value={this.state.user_name} onChange={this.handleChange} type="text" placeholder="username"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input className='form-control' name='password' value={this.state.password} onChange={this.handleChange} type="password" placeholder="password"/>
                            </div> */}
                            {/* <p className="text-center stretched-link"><button className="btn" onClick={this.handleToggle}>{this.state.toggle ? 'Sign up' : 'Log In'}</button></p> */}

                            <button onClick={this.handleToggle} className="btn mx-auto d-block" type="click">{this.state.toggle ? 'Sign up' : 'Log In'}</button>
                      </div>
                      {/* <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                      </div> */}
                  </div>
                </div>
        </div>
      )
    }
}
  export default SignUpIn;