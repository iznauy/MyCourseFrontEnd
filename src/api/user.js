import {getUrl} from "./tools/tool";

export function login(email, password, userType, callback, errorCallback) {
  window.axios.get(getUrl("login"), {
    params: {
      email,
      password,
      userType
    }
  }).then(callback)
    .catch(errorCallback);
}

export function register(email, password, userType, callback, errorCallback) {
  window.axios.get(getUrl("register"), {
    params: {
      email,
      password,
      userType
    }
  }).then(callback)
    .catch(errorCallback)
}

export function requestValidationCode(email, userType, callback, errorCallback) {
  window.axios.get(getUrl("validation"), {
    params: {
      email, userType
    }
  }).then(callback)
    .catch(errorCallback)
}

export function validation(email, userType, code, callback, errorCallback) {
  window.axios.post(getUrl("validation"), {

  }, {
    params: {
      email, userType, code
    }
  }).then(callback)
    .catch(errorCallback)
  
}


