import {getUrl} from "@/api/tools/tool";

export function availableCourses(token, callback, errorCallback) {
  window.axios.get(getUrl("student/allCourse"), {
    headers: {
      token
    }
  }).then(callback)
    .catch(errorCallback)
}

export function loadCourseScore(token, releaseId, callback, errorCallback) {
  window.axios.get(getUrl("student/release/score"), {
    headers: {
      token
    },
    params: {
      releaseId
    }
  }).then(callback)
    .catch(errorCallback)
}

export function selectCourse(token, id, callback, errorCallback) {
  window.axios.post(getUrl("student/course/select"), {}, {
    headers: {
      token
    },
    params: {
      id
    }
  }).then(callback)
    .catch(errorCallback)
}

export function quitCourse(token, id, callback, errorCallback) {
  window.axios.delete(getUrl("student/course/select"), {
    headers: {
      token
    },
    params: {
      id
    }
  }).then(callback)
    .catch(errorCallback)
}

export function loadOwnCourse(token, callback, errorCallback) {
  window.axios.get(getUrl("student/myCourse"), {
    headers: {
      token
    }
  }).then(callback)
    .catch(errorCallback)
}
