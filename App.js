import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import ProtectedRoute from './components/ProtectedRoute'
import VideoItemDetails from './components/VideoItemDetails'
import CartContext from './context/CartContext'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {
    savedList: [],
    isDark: false,
  }

  toggleTheme = () => {
    this.setState(prev => ({
      isDark: !prev.isDark,
    }))
  }

  addSavedItem = videoData => {
    const {savedList} = this.state
    const updatedSavedList = [...savedList, videoData]

    this.setState({
      savedList: updatedSavedList,
    })
  }

  render() {
    const {savedList, isDark} = this.state

    return (
      <CartContext.Provider
        value={{
          savedList,
          isDark,
          toggleTheme: this.toggleTheme,
          addSavedItem: this.addSavedItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute component={NotFound} />
        </Switch>
      </CartContext.Provider>
    )
  }
}
export default App
