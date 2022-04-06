import {MdPlaylistAdd} from 'react-icons/md'

import Navbar from '../Navbar'
import LeftBar from '../LeftBar'
import CartContext from '../../context/CartContext'
import SavedItem from '../SavedItem'

const SavedVideos = () => (
  <CartContext.Consumer>
    {value => {
      const {savedList, isDark} = value

      const toggleBg = isDark ? 'home-dark-bg' : 'right-nav-light-bg'
      const toggleText = isDark ? 'moon-color' : ''
      const noVideos = savedList.length === 0

      return (
        <>
          <Navbar />
          <div className="trending-app-div">
            <LeftBar />
            {noVideos ? (
              <>
                <div
                  className={`no-saved-videos-div ${toggleBg}`}
                  data-testid="savedVideos"
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                    className="no-videos-img"
                  />
                  <h1>No saved videos found</h1>
                  <p>Save your videos by clicking a button</p>
                </div>
              </>
            ) : (
              <div className="trending-card-div">
                <div
                  className={`trending-nav-div ${toggleBg}`}
                  data-testid="savedVideos"
                >
                  <div className="trend-logo-div">
                    <MdPlaylistAdd className="fire" />
                  </div>
                  <h1 className={`trending-hd ${toggleText}`}>Saved Videos</h1>
                </div>
                <div
                  className={`rendering-div ${toggleBg}`}
                  data-testid="savedVideos"
                >
                  <ul className="saved-videos-ul">
                    {savedList.map(each => (
                      <SavedItem key={each.id} savedItemDetails={each} />
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default SavedVideos
