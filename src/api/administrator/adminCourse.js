import {getUrl} from "@/api/tools/tool";

export function uncheckedCourses(token, callback, errorCallback) {
  window.axios.get(getUrl("admin/course"), {
    headers: {
      token
    }
  }).then(callback)
    .catch(errorCallback)
}

export function uncheckedCourseReleases(token, callback, errorCallback) {
  window.axios.get(getUrl("admin/courseRelease"), {
    headers: {
      token
    }
  }).then(callback)
    .catch(errorCallback)
}

export function checkCourse(token, id, approve, callback, errorCallback) {
  window.axios.post(getUrl("admin/course"), {}, {
    headers: {
      token
    },
    params: {
      id, approve
    }
  }).then(callback)
    .catch(errorCallback)
}

export function checkCourseRelease(token, id, approve, callback, errorCallback) {
  window.axios.post(getUrl("admin/courseRelease"), {}, {
    headers: {
      token
    },
    params: {
      id, approve
    }
  }).then(callback)
    .catch(errorCallback)
}
