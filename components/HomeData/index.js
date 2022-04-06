import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import './index.css'

const HomeData = props => (
  <CartContext.Consumer>
    {value => {
      const {isDark} = value
      const toggleText = isDark ? 'moon-color' : ''

      const {homeDetails} = props
      const {
        id,
        publishedAt,
        viewCount,
        channelName,
        profileImg,
        title,
        thumbnailUrl,
      } = homeDetails

      return (
        <>
          <li className="home-data-li">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="home-data-img"
            />
            <Link to={`/videos/${id}`} className="home-data-link">
              <div className="home-data-profile-div">
                <img
                  src={profileImg}
                  alt="channel logo"
                  className="home-data-profile"
                />
                <div className="home-data-title-div">
                  <p className={`home-data-title ${toggleText}`}>{title}</p>
                  <p className={`home-data-channel ${toggleText}`}>
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
        </>
      )
    }}
  </CartContext.Consumer>
)

export default HomeData
