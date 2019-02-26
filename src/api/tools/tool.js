
export function getUrl(url) {
  let baseUrl = "http://localhost:8001/";
  return baseUrl + url;
}

export function deepClone(source) {
  return JSON.parse(JSON.stringify(source));
}

export function convertStringToDate(dateString) {
  let arr1 = dateString.split(" ");
  let sDate = arr1[0].split("-");
  let date = new Date(sDate[0], sDate[1] - 1, sDate[2]);
  return date;
}
