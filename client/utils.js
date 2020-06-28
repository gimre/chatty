
export const formatChatTime = dateLike => {
  const date = new Date(dateLike)
  return `${date.getHours()}:${date.getMinutes()}`
}

export const getName = () => {
  const storedName = localStorage.getItem('name')
  if (storedName) {
    return storedName
  }

  const name = prompt('What is your name?\n(just press Enter for a random one)')
  localStorage.setItem('name', name)

  return name
}
