import * as types from '../actions/action-types';


export function requestColors(pageNumber,sorted_column, order) {
  return {
      type: types.REQUEST_COLORS,
      pageNumber,sorted_column, order
  }
}
export function requestSubmitColor(values, pageNumber,sorted_column, order) {
  return {
      type: types.REQUEST_COLORS_SUBMIT,
      values, pageNumber,sorted_column, order
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

export function requestUpdateColors(values, pageNumber,sorted_column, order) {
  return {
      type: types.REQUEST_COLORS_UPDATE,
      values, pageNumber,sorted_column, order
  }
}

export function updateColorsSuccess(colorId, values) {
  return {
      type: types.UPDATE_COLORS_SUCCESS,
      values,
      colorId
  }
}

export function requestColorStatus (colorId,values, pageNumber,sorted_column, order) {
  return {
      type: types.REQUEST_COLORS_STATUS,
      values,
      colorId, pageNumber,sorted_column, order 
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
