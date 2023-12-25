import { actionTypes } from '@/utils/constants'

export const onOpen = (payload: boolean) => {
  return {
    type: actionTypes.OPEN,
    payload,
  }
}

export const onClose = (payload: boolean) => {
  return {
    type: actionTypes.CLOSE,
    payload,
  }
}

export const onToggle = (payload: boolean) => {
  return {
    type: actionTypes.TOGGLE,
    payload,
  }
}
