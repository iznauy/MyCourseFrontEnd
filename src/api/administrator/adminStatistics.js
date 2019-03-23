import {getUrl} from "@/api/tools/tool";

export function loadUsers(token, callback, errorCallback) {
  window.axios.get(getUrl("admin/users"), {
    headers: {
      token
    }
  }).then(callback)
    .catch(errorCallback)
}

export function loadCourseAndReleases(token, callback, errorCallback) {
  window.axios.get(getUrl("admin/courses"), {
    headers: {
      token
    }
  }).then(callback)
    .catch(errorCallback)
}
