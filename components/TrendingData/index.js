import {Link} from 'react-router-dom'
import './index.css'
import CartContext from '../../context/CartContext'

const TrendingData = props => (
  <CartContext.Consumer>
    {value => {
      const {isDark} = value
      const toggleText = isDark ? 'moon-color' : ''
      const {trendingDetails} = props
      const {
        id,
        publishedAt,
        viewCount,
        channelName,
        title,
        thumbnailUrl,
      } = trendingDetails

      return (
        <>
          <li className="trending-data-li">
            <Link to={`/videos/${id}`} className="home-data-link">
              <div className="trending-data-card-div">
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className="trending-data-img"
                />
                <div className="trending-data-text-div">
                  <p className={`trending-data-title ${toggleText}`}>{title}</p>
                  <p className={`trending-data-channel ${toggleText}`}>
                    {channelName}
                  </p>
                  <div className="trending-data-publish-div">
                    <p className={`trending-data-views ${toggleText}`}>
                      {viewCount} views
                    </p>
                    <p className={`trending-data-views ${toggleText}`}>
                      {publishedAt}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default TrendingData
