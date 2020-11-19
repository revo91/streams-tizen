export const getToken = () => {
  return JSON.parse(localStorage.getItem("streams"))
}

export const setToken = (token) => {
  localStorage.setItem("streams", JSON.stringify({ accessToken: token }))
}