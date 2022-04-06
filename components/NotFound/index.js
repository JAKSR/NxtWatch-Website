import CartContext from '../../context/CartContext'
import Navbar from '../Navbar'
import LeftBar from '../LeftBar'

const NotFound = () => (
  <CartContext.Consumer>
    {value => {
      const {isDark} = value
      const toggleBg = isDark ? 'home-dark-bg' : ''
      const toggleImg = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <>
          <Navbar />
          <LeftBar />
          <div className={`products-error-view-container ${toggleBg}`}>
            <img
              src={toggleImg}
              alt="not found"
              className="products-failure-img"
            />
            <h1 className="product-failure-heading-text">Page Not Found</h1>
            <p className="products-failure-description">
              we are sorry, the page you requested could not be found.
            </p>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default NotFound
