import {withRouter, Link} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'

import CartContext from '../../context/CartContext'
import Model from '../Model'

import './index.css'

const Navbar = () => (
  <CartContext.Consumer>
    {value => {
      const {isDark, toggleTheme} = value

      const toggleLogo = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const toggleNavBg = isDark ? 'nav-dark-bg' : ''
      const toggleMoon = isDark ? 'moon-color' : ''

      const onClickThemeBtn = () => {
        toggleTheme()
      }

      /* const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      } */

      return (
        <>
          <div className={`nav-div ${toggleNavBg}`}>
            <Link to="/">
              <img src={toggleLogo} alt="website logo" className="nav-logo" />
            </Link>
            <div className="nav-items-div">
              <button
                type="button"
                data-testid="theme"
                onClick={onClickThemeBtn}
                className="moon-btn"
              >
                <FaMoon className={`moon ${toggleMoon}`} />
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profile"
              />
              {/* <button
                type="button"
                className={`logout-btn ${toggleMoon}`}
                onClick={onClickLogout}
              >
                Logout
              </button> */}
              <Model />
            </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default withRouter(Navbar)
