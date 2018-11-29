import axios from 'axios';
import store from '../store';
import { getColorsSuccess } from '../actions/color-actions';



const URL = `http://127.0.0.1:8000`


/**
 * Get all colors
 */

export function getColors() {
  return axios.get(`${URL}/api/colors`)
    .then(response => {
      store.dispatch(getColorsSuccess(response.data));
      return response;
    });
}

