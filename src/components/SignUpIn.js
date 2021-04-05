import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';

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
       fetch(`https://doodl-api.herokuapp.com/login`, {
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
                this.props.onHide()
            } else {
                this.setState({errors: data.failure})
            }
        })
    }

    handleSignUp = () => {
      // console.log('Im sign up fetch')
        fetch(`https://doodl-api.herokuapp.com/users`, {
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
              this.props.onHide()
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
      const {onHide, show} = this.props
      return (
        <Modal
          show={show}
          onHide={onHide}
          scrollable={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          id="signModal"
        >
        <Modal.Header closeButton className="">
          <h5 >{this.state.toggle === 'sign up' ? 'Welcome to Doodl' : 'Welcome Back'}</h5>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
      </Modal>
      )
    }
}
  export default SignUpIn;