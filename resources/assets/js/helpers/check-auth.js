
// export const isLoggedIn = () => {
//     if(localStorage['token']) {
//         return true;
//     }
//     return false;
// }
// export const fakeAuth = {
//     isAuthenticated: false,
//     authenticate(cb) {
//       this.isAuthenticated = true
//       setTimeout(cb, 3600)
//     },
//     signout(cb) {
//       this.isAuthenticated = false
//       setTimeout(cb, 3600)
//     }
    
// }
import store from '../store';

export const getLoggedUser = () => {
  setTimeout(() => {
    store.dispatch({
      type: 'GET_LOGGED_USER'
    })
  }, 3600)
}

export const login = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store.dispatch({
        type: 'SET_LOGGED_USER',
        logged: true
      })
      resolve()
    }, 3600)
  })
}

export const logout = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store.dispatch({
        type: 'SET_LOGGED_USER',
        logged: false
      })
      resolve()
    }, 3600)
  })
}