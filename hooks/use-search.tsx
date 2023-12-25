import React, { createContext, useContext, useReducer } from 'react'

interface SearchState {
  isOpen: boolean
}
const initialState: SearchState = {
  isOpen: false,
}

export interface SearchAction {
  type: string
}

const actionTypes = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
  TOGGLE: 'TOGGLE',
}

// Define the reducer function
const searchReducer = (state: SearchState, action: SearchAction) => {
  switch (action.type) {
    case actionTypes.OPEN:
      return { ...state, isOpen: true }
    case actionTypes.CLOSE:
      return { ...state, isOpen: false }
    case actionTypes.TOGGLE:
      return { ...state, isOpen: !state.isOpen }
    default:
      return state
  }
}

// Create the context
const SearchContext = createContext(initialState)

// Create the provider component
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState)

  const onOpen = () => dispatch({ type: actionTypes.OPEN })
  const onClose = () => dispatch({ type: actionTypes.CLOSE })
  const toggle = () => dispatch({ type: actionTypes.TOGGLE })

  const value = {
    isOpen: state.isOpen,
    onOpen,
    onClose,
    toggle,
  }

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}

// Create a custom hook to access the context
export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}
