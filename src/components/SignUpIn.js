import React, { Component } from "react";
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useHistory } from "react-router-dom";

class SignUpIn extends Component {
    state = {
      user_name: '',
      password: '',
      bio: '',
      toggle: 'log in',
      errors: []
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleToggle = () => {
      this.setState(prevState => {
        if(prevState.toggle === 'sign up') {
         return {toggle: 'log in'}
        }
        return {toggle: 'sign up'}
      })
    }
    
    resetState = () => {
      //reset state
      this.setState({
        user_name: '',
        password: '',
        toggle: 'sign up',
        errors: []
      })
    }

    handleSignIn = () => {
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
            if(data.token) {
                localStorage.setItem("token", data.token)
                this.props.handleLogin(data.user)
                this.resetState()
                $('#signModal').modal("hide")
            } else {
                this.setState({errors: data.failure})
            }
        })
    }

    handleSignUp = () => {
      // console.log('Im sign up fetch')
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
            if (data.token) {
              localStorage.setItem("token", data.token)
              this.props.handleLogin(data.user)
              $('#signModal').modal("hide")
            }
            else {
              this.setState({errors: data.error})
            }
        })
    }

    handleSubmit = (e) => {
      e.preventDefault()
      if(this.state.toggle === 'sign up'){
        this.handleSignUp()
      }else {
        this.handleSignIn()
      }
    }

    renderErrors = () => {
      return (
        this.state.errors.map(err => <p style={{textAlign: 'center', fontSize:'.8rem'}}>{err}</p>)
      )
    }

    render() {
      return (
        <div class="modal fade" id="signModal" tabindex="-1" role="dialog" aria-labelledby="signModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title " id="signModalLabel">{this.state.toggle === 'sign up' ? 'Welcome to Doodl' : 'Welcome Back'}</h5>
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
                            <div style={{marginBottom: '.5rem'}}>
                              {this.renderErrors()}
                            </div>
                            <button id='submitBtn' name='signUp' className="button mx-auto d-block"  type="submit">{this.state.toggle === 'sign up' ? 'Sign up' : 'Log In'}</button>
                        </form>
                        <hr className="hr-text" data-content="or"/>
                          
                            <button onClick={this.handleToggle} className="sign-toogle-button mx-auto d-block" type="click">{this.state.toggle !== 'sign up' ? 'Sign up' : 'Log In'}</button>
                      </div>
                  </div>
                </div>
        </div>
      )
    }
}
  export default SignUpIn;