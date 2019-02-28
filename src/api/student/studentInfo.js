import {getUrl} from "../tools/tool";

export function deleteAccount(token, callback, errorCallback) {
  window.axios.get(getUrl('student/logoff'), {
    headers: {
      token
    }
  }).then(callback)
    .catch(errorCallback)
}

export function getStudentInfo(token, callback, errorCallback) {
  window.axios.get(getUrl('student/info'), {
    headers: {
      token
    }
  }).then(callback)
    .catch(errorCallback)
}

export function changeStudentInfo(token, username, number, callback, errorCallback) {
  window.axios.post(getUrl('student/info'), {},
    {
      headers: {
        token
      },
      params: {
        username, number
      }
    }).then(callback)
    .catch(errorCallback)
}

export function uploadAvatar(token, file, callback, errorCallback) {
  let data = new FormData();
  data.set("avatar", file);
  window.axios.post(getUrl("student/avatar"), data,
    {
      headers: {
        token
      }
    }).then(callback)
    .catch(errorCallback)
}
