import {Link} from 'react-router-dom'

import './index.css'
import CartContext from '../../context/CartContext'

const GamingData = props => (
  <CartContext.Consumer>
    {value => {
      const {isDark} = value
      const toggleText = isDark ? 'moon-color' : ''
      const {gamingDetails} = props
      const {id, title, thumbnailUrl, viewCount} = gamingDetails

      return (
        <>
          <li className="gaming-data-li">
            <Link to={`/videos/${id}`} className="home-data-link">
              <div className="gaming-data-card">
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className="gaming-data-img"
                />
                <p className={`gaming-data-title ${toggleText}`}>{title}</p>
                <p className={`gaming-data-views ${toggleText}`}>
                  {viewCount} Watching WorldWide
                </p>
              </div>
            </Link>
          </li>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default GamingData
