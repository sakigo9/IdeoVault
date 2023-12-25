import { useContext, createContext } from 'react'

export const GlobalContext = createContext(undefined)

export const useGlobalState = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useGlobalState can be only used inside GlobalContext')
  }
  return context
}
