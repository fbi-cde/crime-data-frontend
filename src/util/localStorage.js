const getItem = key => {
  if (!window || !window.localStorage) return Promise.resolve(null)

  const item = window.localStorage.getItem(key)
  return Promise.resolve(item !== null ? JSON.parse(item) : null)
}

const setItem = (key, value) => {
  if (!window || !window.localStorage) return Promise.resolve(null)

  window.localStorage.setItem(key, JSON.stringify(value))
  return Promise.resolve(true)
}

export default { getItem, setItem }
