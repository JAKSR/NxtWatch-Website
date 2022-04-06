import React from 'react'

const CartContext = React.createContext({
  isDark: false,
  toggleTheme: () => {},
  addSavedItem: () => {},
  savedList: [],
})

export default CartContext
