import * as types from '../actions/action-types';


export function requestColors(pageNumber) {
  return {
      type: types.REQUEST_COLORS,
      pageNumber
  }
}
export function requestSubmitColor(values) {
  return {
      type: types.REQUEST_COLORS_SUBMIT,
      values
  }
}

export function requestColorFailed() {
  return {
      type: types.REQUEST_COLORS_FAILED
  }
}
export function getColorsSuccess(colors) {
  return {
    type: types.GET_COLORS_SUCCESS,
    colors
  };
}

export function addColorsSuccess(values) {
  return {
      type: types.ADD_COLORS_SUCCESS,
      values
  }
}

export function requestDeleteColors(colorId) {
  return {
      type: types.REQUEST_COLORS_DELETE,
      colorId
  }
}

export function deleteColorsSuccess(colorId) {
  return {
      type: types.DELETE_COLORS_SUCCESS,
      colorId
  }
}

export function requestUpdateColors(values, page) {
  return {
      type: types.REQUEST_COLORS_UPDATE,
      values, page
  }
}

export function updateColorsSuccess(colorId, values) {
  return {
      type: types.UPDATE_COLORS_SUCCESS,
      values,
      colorId
  }
}

export function requestColorStatus (colorId,values, page) {
  return {
      type: types.REQUEST_COLORS_STATUS,
      values,
      colorId, page 
  }
}

export function ColorsStatusSuccess (colorId, values, page) {
  return {
      type: types.COLORS_STATUS_SUCCESS,
      values,
      colorId,
      page
  }
}
