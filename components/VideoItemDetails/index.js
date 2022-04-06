import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'

import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'

import Navbar from '../Navbar'
import LeftBar from '../LeftBar'
import CartContext from '../../context/CartContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    selectedVideoData: [],
    apiStatus: apiStatusConstants.initial,
    isLiked: false,
    isDisliked: false,
    isSaved: false,
  }

  componentDidMount() {
    this.getSelectedVideoData()
  }

  formattedNewData = video => ({
    id: video.id,
    title: video.title,
    channelName: video.channel.name,
    profileImgUrl: video.channel.profile_image_url,
    subCount: video.channel.subscriber_count,
    description: video.description,
    publishedAt: video.published_at,
    thumbnailUrl: video.thumbnail_url,
    videoUrl: video.video_url,
    viewCount: video.view_count,
  })

  getSelectedVideoData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)

      const newSelectedVideoData = this.formattedNewData(data.video_details)

      this.setState({
        selectedVideoData: newSelectedVideoData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  toggleLikeBtn = () => {
    this.setState({
      isLiked: true,
      isDisliked: false,
    })
  }

  toggleDislikeBtn = () => {
    this.setState({
      isLiked: false,
      isDisliked: true,
    })
  }

  toggleSaved = () => {
    this.setState(prev => ({
      isSaved: !prev.isSaved,
    }))
  }

  renderSuccessView = () => (
    <CartContext.Consumer>
      {value => {
        const {selectedVideoData, isLiked, isDisliked, isSaved} = this.state

        const onClickLike = () => {
          this.toggleLikeBtn()
        }

        const onClickDislike = () => {
          this.toggleDislikeBtn()
        }

        const {
          title,
          channelName,
          profileImgUrl,
          subCount,
          description,
          publishedAt,
          videoUrl,
          viewCount,
        } = selectedVideoData

        const {addSavedItem, isDark} = value
        const toggleBg = isDark ? 'home-dark-bg' : ''
        const toggleText = isDark ? 'moon-color' : ''

        const onClickSave = () => {
          addSavedItem(selectedVideoData)
          this.toggleSaved()
        }

        const toggleLikeClass = isLiked ? 'liked' : ''
        const toggleDislikeClass = isDisliked ? 'liked' : ''
        const toggleSavedClass = isSaved ? 'liked' : ''

        return (
          <>
            <div className={`video-div ${toggleBg}`}>
              <ReactPlayer
                url={videoUrl}
                controls
                width="100%"
                height="460px"
              />
              <p className={`trending-data-title ${toggleText}`}>{title}</p>
              <div className="views-like-dislike-div">
                <div className="views-div">
                  <p className={`trending-data-views ${toggleText}`}>
                    {viewCount} views
                  </p>
                  <p className={`trending-data-views ${toggleText}`}>
                    {publishedAt}
                  </p>
                </div>
                <div className="views-div">
                  <div className="like-div">
                    <button
                      type="button"
                      onClick={onClickLike}
                      className={`like-text ${toggleLikeClass} ${toggleText}`}
                    >
                      <AiOutlineLike
                        className={`like-icon ${toggleLikeClass} ${toggleText}`}
                      />
                      Like
                    </button>
                  </div>
                  <div className="like-div">
                    <button
                      type="button"
                      onClick={onClickDislike}
                      className={`like-text ${toggleDislikeClass} ${toggleText}`}
                    >
                      <AiOutlineDislike
                        className={`like-icon ${toggleDislikeClass} ${toggleText}`}
                      />
                      Dislike
                    </button>
                  </div>
                  <div className="like-div">
                    <MdPlaylistAdd
                      className={`like-icon ${toggleSavedClass} ${toggleText}`}
                    />
                    <button
                      type="button"
                      onClick={onClickSave}
                      className={`like-text ${toggleSavedClass} ${toggleText}`}
                    >
                      {isSaved ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="profile-div">
                <img
                  src={profileImgUrl}
                  alt="channel logo"
                  className="selected-profile-img"
                />
                <div className="selected-text-div">
                  <p className={`channel-text ${toggleText}`}>{channelName}</p>
                  <p className={`subs ${toggleText}`}>{subCount} subscribers</p>
                  <p className={`subs ${toggleText}`}>{description}</p>
                </div>
              </div>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => {
    const onClickRetry = () => {
      this.getSelectedVideoData()
    }

    return (
      <div className="products-error-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
          alt="failure view"
          className="products-failure-img"
        />
        <h1 className="product-failure-heading-text">
          Oops! Something Went Wrong
        </h1>
        <p className="products-failure-description">
          We are having some trouble to complete your request. Please try again.
        </p>
        <button type="button" onClick={onClickRetry}>
          Retry
        </button>
      </div>
    )
  }

  renderContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {isDark} = value
          const toggleBg = isDark ? 'home-dark-bg' : 'right-nav-light-bg'
          return (
            <>
              <Navbar />
              <div className="videoItemDetails-app-div">
                <LeftBar />
                <div
                  className={`videoItemDetails-right-div ${toggleBg}`}
                  data-testid="videoItemDetails"
                >
                  {this.renderContent()}
                </div>
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default VideoItemDetails
