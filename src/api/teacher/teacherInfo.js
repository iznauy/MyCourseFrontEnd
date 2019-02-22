import {getUrl} from "@/api/tools/tool";

export function getTeacherInfo(token, callback, errorCallback) {
  window.axios.get(getUrl("teacher/info"), {
    headers: {
      token
    }
  }).then(callback)
    .catch(errorCallback)
}

export function modifyTeacherInfo(token, username, callback, errorCallback) {
  window.axios.post(getUrl("teacher/info"), {}, {
    headers: {
      token
    },
    params: {
      username
    }
  }).then(callback)
    .catch(errorCallback)
}
