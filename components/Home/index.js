import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiOutlineSearch} from 'react-icons/ai'
import {RiCloseFill} from 'react-icons/ri'

import LeftBar from '../LeftBar'
import Navbar from '../Navbar'
import HomeData from '../HomeData'

import './index.css'
import CartContext from '../../context/CartContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    homeData: [],
    apiStatus: apiStatusConstants.initial,
    search: '',
    closeBanner: false,
  }

  componentDidMount() {
    this.homeDataApiCall()
  }

  getHomeData = each => ({
    id: each.id,
    channelName: each.channel.name,
    profileImg: each.channel.profile_image_url,
    title: each.title,
    publishedAt: each.published_at,
    thumbnailUrl: each.thumbnail_url,
    viewCount: each.view_count,
  })

  homeDataApiCall = async () => {
    const {search} = this.state

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${search}`
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
      const updatedHomeData = data.videos.map(eachVideo =>
        this.getHomeData(eachVideo),
      )
      this.setState({
        homeData: updatedHomeData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickSearch = () => {
    const {search} = this.state

    this.setState({search}, this.homeDataApiCall)
  }

  renderHomeVideos = () => (
    <CartContext.Consumer>
      {value => {
        const {isDark} = value
        const toggleBg = isDark ? 'home-dark-bg' : ''

        const {homeData} = this.state
        const lengthZero = homeData.length === 0
        const failureImg =
          'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png'

        const onClickRetry = () => {
          this.homeDataApiCall()
        }

        return (
          <>
            {lengthZero ? (
              <>
                <img
                  src={failureImg}
                  alt="no videos"
                  className="no-videos-img"
                />
                <h1>No Search Results Found</h1>
                <p>Try different key words or remove search filter</p>
                <button type="button" onClick={onClickRetry}>
                  Retry
                </button>
              </>
            ) : (
              <ul className={`home-data-ul ${toggleBg}`} data-testid="home">
                {homeData.map(each => (
                  <HomeData key={each.id} homeDetails={each} />
                ))}
              </ul>
            )}
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
          this.homeDataApiCall()
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
        return this.renderHomeVideos()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  onClickClose = () => {
    this.setState({closeBanner: true})
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {isDark} = value
          const toggleBg = isDark ? 'home-dark-bg' : ''
          const {search, closeBanner} = this.state
          const close = closeBanner ? 'close-banner' : ''

          return (
            <>
              <Navbar />
              <div className={`home-app-div ${toggleBg}`}>
                <LeftBar />
                <div className={`right-div ${toggleBg}`}>
                  <div className={`banner-div ${close}`} data-testid="banner">
                    <div className="banner-content-div">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        alt="nxt watch logo"
                        className="right-logo"
                      />
                      <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                      <button type="button">GET IT NOW</button>
                    </div>
                    <div>
                      <button
                        type="button"
                        data-testid="close"
                        className="banner-close-btn"
                      >
                        <RiCloseFill
                          className="close-icon"
                          onClick={this.onClickClose}
                        />
                      </button>
                    </div>
                  </div>
                  <div className={`right-response-div ${toggleBg}`}>
                    <div className="search-div">
                      <input
                        type="search"
                        placeholder="Search"
                        className="search-input"
                        value={search}
                        onChange={this.onChangeSearch}
                      />
                      <button
                        data-testid="searchButton"
                        type="button"
                        onClick={this.onClickSearch}
                        className="search-btn"
                      >
                        <AiOutlineSearch className="search-icon" />
                      </button>
                    </div>
                    <div
                      className={`rendering-div ${toggleBg}`}
                      data-testid="home"
                    >
                      {this.renderContent()}
                    </div>
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

export default Home
