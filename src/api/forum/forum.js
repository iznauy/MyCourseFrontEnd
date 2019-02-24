import {getUrl} from "@/api/tools/tool";

export function loadAvailableForums(token, callback, errorCallback) {
  window.axios.post(getUrl("/forum/available"), {}, {
    headers: {
      token
    }
  }).then(callback)
    .catch(errorCallback)
}

export function loadPosters(token, courseId, page, pageSize, callback, errorCallback) {
  window.axios.get(getUrl("/forum/post"), {
    headers: {
      token
    },
    params: {
      courseId,
      page,
      pageSize
    }
  }).then(callback)
    .catch(errorCallback)
}

export function loadPosterInfo(token, postId, callback, errorCallback) {
  window.axios.get(getUrl("/forum/postdetail"), {
    headers: {
      token
    },
    params: {
      postId
    }
  }).then(callback)
    .catch(errorCallback)
}

export function loadReplies(token, postId, page, pageSize, callback, errorCallback) {
  window.axios.get(getUrl("/forum/reply"), {
    headers: {
      token
    },
    params: {
      postId, page, pageSize
    }
  }).then(callback)
    .catch(errorCallback)
}

export function sendPoster(token, courseId, title, content, callback, errorCallback) {
  window.axios.post(getUrl("/forum/post"), {}, {
    headers: {
      token
    },
    params: {
      courseId, title, content
    }
  }).then(callback)
    .catch(errorCallback)
}

export function sendReply(token, postId, content, callback, errorCallback) {
  window.axios.post(getUrl("/forum/reply"), {}, {
    headers: {
      token
    },
    params: {
      postId, content
    }
  }).then(callback)
    .catch(errorCallback)
}
