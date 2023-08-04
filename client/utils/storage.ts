export const SESSION = 'user'

export const customStorage = () => {
  const getSession = () => JSON.parse(localStorage.getItem(SESSION))
  const removeSession = () => localStorage.removeItem(SESSION)
  const saveSession = (data) => localStorage.setItem(SESSION, JSON.stringify(data))
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
