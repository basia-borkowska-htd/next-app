export const SESSION = 'user'

export const customStorage = () => {
  const getSession = () => {
    const user = JSON.parse(localStorage.getItem(SESSION))
    return JSON.parse(user)
  }
  const removeSession = () => localStorage.removeItem(SESSION)
  const saveSession = (data: string) => localStorage.setItem(SESSION, JSON.stringify(data))
  const updateSession = (field: string, newData: object) => {
    const session = getSession()
    return saveSession({ ...session, [field]: newData })
  }

  return {
    getSession,
    removeSession,
    saveSession,
    updateSession,
  }
}
