import {getUrl} from "@/api/tools/tool";

export function loadCourseBasicInfo(token, courseId, callback, errorCallback) {
  window.axios.get(getUrl("course/info"), {
    params: {
      id: courseId
    },
    headers: {
      token
    }
  }).then(callback)
    .catch(errorCallback)
}

export function loadAssignments(token, courseReleaseId, callback, errorCallback) {
  window.axios.get(getUrl("course/assignments"), {
    params: {
      courseReleaseId
    },
    headers: {
      token
    }
  }).then(callback)
    .catch(errorCallback)
}

export function releaseAssignment(token, courseReleaseId, name, description, deadLine, callback, errorCallback) {
  window.axios.post(getUrl("course/assignment/create"), {}, {
    headers: {
      token
    },
    params: {
      courseReleaseId, name, description, deadLine
    }
  }).then(callback)
    .catch(errorCallback)
}
