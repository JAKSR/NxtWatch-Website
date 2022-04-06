import {Link} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

import CartContext from '../../context/CartContext'
import './index.css'

const LeftBar = () => (
  <CartContext.Consumer>
    {value => {
      const {isDark} = value
      const toggleBg = isDark ? 'nav-dark-bg' : ''
      const toggleText = isDark ? 'moon-color' : ''

      return (
        <>
          <div className={`left-div ${toggleBg}`}>
            <div className="left-upper-div">
              <ul className="left-ul">
                <li className="left-li">
                  <Link to="/" className="api-btn">
                    <div className="options-div">
                      <AiFillHome
                        className={`home-left-upper-icons ${toggleText}`}
                      />
                      <p className={`home-left-upper-text ${toggleText}`}>
                        Home
                      </p>
                    </div>
                  </Link>
                </li>
                <li className="left-li">
                  <Link to="/trending" className="api-btn">
                    <div className="options-div">
                      <HiFire
                        className={`home-left-upper-icons ${toggleText}`}
                      />
                      <p className={`home-left-upper-text ${toggleText}`}>
                        Trending
                      </p>
                    </div>
                  </Link>
                </li>
                <li className="left-li">
                  <Link to="/gaming" className="api-btn">
                    <div className="options-div">
                      <SiYoutubegaming
                        className={`home-left-upper-icons ${toggleText}`}
                      />
                      <p className={`home-left-upper-text ${toggleText}`}>
                        Gaming
                      </p>
                    </div>
                  </Link>
                </li>
                <li className="left-li">
                  <Link to="/saved-videos" className="api-btn">
                    <div className="options-div">
                      <MdPlaylistAdd
                        className={`home-left-upper-icons ${toggleText}`}
                      />
                      <p className={`home-left-upper-text ${toggleText}`}>
                        Saved Videos
                      </p>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="left-lower-div">
              <p className={toggleText}>CONTACT US</p>
              <div className="left-lower-icons-div">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                  className="fb"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                  className="fb"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                  className="fb"
                />
              </div>
              <p className={toggleText}>
                Enjoy! Now to see your channels and recommendations!
              </p>
            </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default LeftBar
