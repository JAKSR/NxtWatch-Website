import Popup from 'reactjs-popup'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import 'reactjs-popup/dist/index.css'

import './index.css'

const Model = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="trigger-button">
            Logout
          </button>
        }
      >
        {close => (
          <>
            <div>
              <p>Are you sure,you want to logout</p>
            </div>
            <button
              type="button"
              className="trigger-button"
              onClick={() => close()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              Confirm
            </button>
          </>
        )}
      </Popup>
    </div>
  )
}
export default withRouter(Model)
