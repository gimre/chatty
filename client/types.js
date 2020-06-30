
export default Object.fromEntries(
  Object.entries({
    EDITING: Symbol('Editing')
  })
  .map(entry => [
    entry.slice(),
    entry.reverse()
  ])
  .flat()
)
