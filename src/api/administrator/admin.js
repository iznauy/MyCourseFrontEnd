import {getUrl} from "@/api/tools/tool";

export function login(username, password, callback, errorCallback) {
  window.axios.get(getUrl("admin/login"), {
    params: {
      username, password
    }
  }).then(callback)
    .catch(errorCallback)
}
