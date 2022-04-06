import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import './index.css'

const SavedItem = props => (
  <CartContext.Consumer>
    {value => {
      const {isDark} = value
      const toggleText = isDark ? 'moon-color' : ''

      const {savedItemDetails} = props
      const {
        id,
        thumbnailUrl,
        title,
        channelName,
        viewCount,
        publishedAt,
      } = savedItemDetails

      return (
        <li className="savedItem-li">
          <Link to={`/videos/${id}`} className="saved-item-link">
            <div className="savedItem-card">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="savedItem-img"
              />
              <div className="savedItem-text-div">
                <p className={`savedItem-title ${toggleText}`}>{title}</p>
                <p className={`savedItem-channel ${toggleText}`}>
                  {channelName}
                </p>
                <div className="home-data-publish-div">
                  <p className={`home-data-views ${toggleText}`}>
                    {viewCount} views
                  </p>
                  <p className={`home-data-views ${toggleText}`}>
                    {publishedAt}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default SavedItem
