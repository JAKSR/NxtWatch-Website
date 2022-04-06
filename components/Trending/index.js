import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import {HiFire} from 'react-icons/hi'

import LeftBar from '../LeftBar'
import Navbar from '../Navbar'
import TrendingData from '../TrendingData'
import CartContext from '../../context/CartContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    trendingData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.trendingDataApiCall()
  }

  getTrendingData = each => ({
    id: each.id,
    channelName: each.channel.name,
    profileImg: each.channel.profile_image_url,
    title: each.title,
    publishedAt: each.published_at,
    thumbnailUrl: each.thumbnail_url,
    viewCount: each.view_count,
  })

  trendingDataApiCall = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedTrendingData = data.videos.map(eachVideo =>
        this.getTrendingData(eachVideo),
      )
      this.setState({
        trendingData: updatedTrendingData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderTrendingVideos = () => (
    <CartContext.Consumer>
      {value => {
        const {isDark} = value
        const toggleBg = isDark ? 'home-dark-bg' : ''
        const {trendingData} = this.state
        return (
          <>
            <ul
              className={`trending-data-ul ${toggleBg}`}
              data-testid="trending"
            >
              {trendingData.map(each => (
                <TrendingData key={each.id} trendingDetails={each} />
              ))}
            </ul>
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

  renderFailureView = () => (
    <CartContext.Consumer>
      {value => {
        const {isDark} = value
        const toggleImg = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        const onClickRetry = () => {
          this.trendingDataApiCall()
        }

        return (
          <div className="products-error-view-container">
            <img src={toggleImg} alt="failure view" className="no-videos-img" />
            <h1 className="product-failure-heading-text">
              Oops! Something Went Wrong
            </h1>
            <p className="products-failure-description">
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button type="button" onClick={onClickRetry}>
              Retry
            </button>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  renderContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingVideos()
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
          const toggleText = isDark ? 'moon-color' : ''

          return (
            <>
              <Navbar />
              <div className="trending-app-div">
                <LeftBar />
                <div className="trending-card-div">
                  <div className={`trending-nav-div ${toggleBg}`}>
                    <div className="trend-logo-div">
                      <HiFire className="fire" />
                    </div>

                    <h1 className={`trending-hd ${toggleText}`}>
                      <Link to="/trending" className="saved-item-link">
                        Trending
                      </Link>
                    </h1>
                  </div>
                  <div
                    className={`rendering-div ${toggleBg}`}
                    data-testid="trending"
                  >
                    {this.renderContent()}
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default Trending
