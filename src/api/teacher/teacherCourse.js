import {getUrl} from "@/api/tools/tool";
import {Form} from "element-ui";

export function createCourse(token, name, description, callback, errorCallback) {
  window.axios.post(getUrl("teacher/course/create"), {}, {
    headers: {
      token
    },
    params: {
      name, description
    }
  }).then(callback)
    .catch(errorCallback)
}

export function ownCreatedCourses(token, callback, errorCallback) {
  window.axios.get(getUrl("teacher/course/list"), {
    headers: {
      token
    }
  }).then(callback)
    .catch(errorCallback)
}

export function getCourseReleases(token, courseId, callback, errorCallback) {
  window.axios.get(getUrl("teacher/course/release"), {
    headers: {
      token
    },
    params: {
      courseId
    }
  }).then(callback)
    .catch(errorCallback)
}

export function getAllReleases(token, callback, errorCallback) {
  window.axios.get(getUrl("teacher/allRelease"), {
    headers: {
      token
    }
  }).then(callback)
    .catch(errorCallback)
}

export function createCourseRelease(token, id, beginDate, endDate, classOrder, hasQuota, quota, callback, errorCallback) {
  const data = {id, beginDate, endDate, classOrder, hasQuota, quota};
  window.axios.post(getUrl("teacher/course/release"), {}, {
    headers: {
      token
    },
    params: data
  }).then(callback)
    .catch(errorCallback)
}

export function uploadScores(token, releaseId, file, publicized, callback, errorCallback) {
  let data = new FormData();
  data.set("scores", file);
  window.axios.post(getUrl("teacher/course/release/score"), data, {
    headers: {
      token
    },
    params: {
      publicized,
      releaseId
    }
  }).then(callback)
    .catch(errorCallback)
}

export function uploadAssignmentScores(token, assignmentId, file, publicized, callback, errorCallback) {
  let data = new FormData();
  data.set("scores", file);
  window.axios.post(getUrl("teacher/course/release/assignment/score"), data, {
    headers: {
      token
    },
    params: {
      publicized,
      assignmentId
    }
  }).then(callback)
    .catch(errorCallback)
}
