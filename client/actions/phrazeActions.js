import * as actionTypes from './actionTypes'

export const addPhraze = (payload) => ({
  type: actionTypes.ADD_PHRAZE,
  payload,
})

export const checkBoxPhraze = (key, opt) => ({
  type: actionTypes.CHECK_BOX_PHRAZE,
  key,
  opt,
})