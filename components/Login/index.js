import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'

import './index.css'

class Login extends Component {
  state = {
    showPass: false,
    name: '',
    pass: '',
    showErr: false,
    errorMsg: '',
  }

  onClickShowPass = () => {
    this.setState(prev => ({
      showPass: !prev.showPass,
    }))
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangePass = event => {
    this.setState({pass: event.target.value})
  }

  renderSuccessView = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })

    history.replace('/')
  }

  renderLoginFailedView = errorMsg => {
    this.setState({showErr: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {name, pass} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userData = {username: name, password: pass}
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.renderSuccessView(data.jwt_token)
    } else {
      this.renderLoginFailedView(data.error_msg)
    }
  }

  render() {
    const {showPass, name, pass, showErr, errorMsg} = this.state
    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <CartContext.Consumer>
        {value => {
          const {isDark} = value
          const toggleBg = isDark ? 'home-dark-bg' : ''
          const toggleFormBg = isDark ? 'nav-dark-bg' : ''
          const toggleText = isDark ? 'moon-color' : ''

          return (
            <div className={`login-app-div ${toggleBg}`}>
              <form
                className={`form-div ${toggleFormBg}`}
                onSubmit={this.onSubmitForm}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                  className="form-logo"
                />
                <div className="inputs-div">
                  <label htmlFor="name" className={`label ${toggleText}`}>
                    USERNAME
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={this.onChangeName}
                    placeholder="Username"
                    className="input"
                  />
                </div>
                <div className="inputs-div">
                  <label htmlFor="password" className={`label ${toggleText}`}>
                    PASSWORD
                  </label>
                  <input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    value={pass}
                    onChange={this.onChangePass}
                    placeholder="Password"
                    className="input"
                  />
                </div>
                <div className="showPass-div">
                  <input
                    type="checkbox"
                    id="showPassword"
                    onChange={this.onClickShowPass}
                  />
                  <label
                    className={`label ${toggleText}`}
                    htmlFor="showPassword"
                  >
                    Show password
                  </label>
                </div>
                <button type="submit" className="login-btn">
                  Login
                </button>
                {showErr && <p className="error-msg">{errorMsg}</p>}
              </form>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Login
