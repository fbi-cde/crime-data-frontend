const createUrlQueryString = obj => {
  const keys = Object.keys(obj).sort((a, b) => b < a)
  return keys.map(k => `${k}=${obj[k]}`).join('&')
}

export default (url, p = {}) => {
  const paramNum = Object.keys(p).length
  return paramNum > 0 ? `${url}?${createUrlQueryString(p)}` : url
}
