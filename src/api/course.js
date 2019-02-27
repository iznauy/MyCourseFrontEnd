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

export function loadClassStudents(token, releaseId, callback, errorCallback) {
  window.axios.get(getUrl("course/member"), {
    headers: {
      token
    },
    params: {
      releaseId
    }
  }).then(callback)
    .catch(errorCallback)
}

export function loadClassmates(token, releaseId, callback, errorCallback) {
  window.axios.get(getUrl("release/member"), {
    headers: {
      token
    },
    params: {
      releaseId
    }
  }).then(callback)
    .catch(errorCallback)
}

export function loadWares(token, courseId, callback, errorCallback) {
  window.axios.get(getUrl("course/ware"), {
    headers: {
      token
    },
    params: {
      courseId
    }
  }).then(callback)
    .catch(errorCallback)
}

export function releaseWare(token, courseId, name, file, callback, errorCallback) {
  let data = new FormData();
  data.append('ware', file);
  window.axios.post(getUrl("course/ware"), data, {
    headers: {
      token,
      'Content-Type': 'multipart/form-data'
    },
    params: {
      courseId, name
    }
  }).then(callback)
    .catch(errorCallback)
}

export function loadOwnAssignmentState(token, assignmentId, callback, errorCallback) {
  window.axios.get(getUrl("course/assignment/own"), {
    headers: {
      token
    },
    params: {
      assignmentId
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

export function commitAssignment(token, assignmentId, assignment, callback, errorCallback) {
  let data = new FormData();
  data.append('assignment', assignment);
  window.axios.post(getUrl("course/assignment/commit"), data, {
    headers: {
      token
    },
    params: {
      assignmentId
    }
  }).then(callback)
    .catch(errorCallback)
}

export function loadAssignmentsDetail(token, assignmentId, callback, errorCallback) {
  window.axios.get(getUrl("course/assignment"), {
    headers: {
      token
    },
    params: {
      assignmentId
    }
  }).then(callback).catch(errorCallback)
}

export function loadClassAssignmentState(token, assignmentId, callback, errorCallback) {
  window.axios.get(getUrl("course/assignment/state"), {
    headers: {
      token
    },
    params: {
      assignmentId
    }
  }).then(callback).catch(errorCallback)
}

export function downloadAssignment(token, assignmentId, callback, errorCallback) {
  window.axios.get(getUrl("course/assignment/download"), {
    headers: {
      token
    },
    params: {
      assignmentId
    }
  }).then(callback)
    .catch(errorCallback)
}
