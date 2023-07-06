const checkAccessLocalStorage = () => {
  try {
    return localStorage
  } catch (e) {
    return false
  }
}

export const zeppLocalStorage = () => {
  const storage = checkAccessLocalStorage()

  const getSession = () => (storage ? JSON.parse(localStorage.getItem('session')) : null)
  const updateSession = (field, newData) => {
    if (storage) {
      localStorage.setItem(field, JSON.stringify(newData))
    }
    return null
  }

  return { getSession, updateSession }
}
