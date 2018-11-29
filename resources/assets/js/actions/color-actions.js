import * as types from '../actions/action-types';

export function getColorsSuccess(colors) {
  return {
    type: types.GET_COLORS_SUCCESS,
    colors
  };
}

// export function deleteUserSuccess(userId) {
//   return {
//     type: types.DELETE_USER_SUCCESS,
//     userId
//   };
// }

// export function userProfileSuccess(userProfile) {
//   return {
//     type: types.USER_PROFILE_SUCCESS,
//     userProfile
//   };
// }
