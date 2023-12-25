import { actionTypes } from '@/utils/constants'

export interface GlobalState {
  isSearchOpen: boolean
}

export const initialState: GlobalState = {
  isSearchOpen: false,
}

export interface SearchAction {
  type: string
}

export const reducer = (
  state: GlobalState,
  action: SearchAction,
): GlobalState => {
  switch (action.type) {
    case actionTypes.OPEN:
      return { ...state, isSearchOpen: true }
    case actionTypes.CLOSE:
      return { ...state, isSearchOpen: false }
    case actionTypes.TOGGLE:
      return { ...state, isSearchOpen: !state.isSearchOpen }
    default:
      return state
  }
}
