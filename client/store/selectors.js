
export const getActiveParticipants = state => Object.fromEntries(
  Object.entries(getParticipants(state))
    .filter(([, meta]) => meta.active)
)

export const getEditing = state => state.editing

export const getEditedMessage = state => {
  const editing = getEditing(state)
  return editing
    ? getHistory(state).find(item => item.id === editing)
    : editing
}

export const getHistory = state => state.history

export const getLastOwnMessage = state => {
  const ownId = getOwnId(state)
  return getHistory(state)
    .filter(m => m.from === ownId)
    .sort((a, b) => new Date(a.when) - new Date(b.when))
    .pop()
}

export const getParticipants = state => state.participants

export const getParticipantCount = state => Object.keys(getActiveParticipants(state)).length

export const getOwnId = state => state.uuid

export const getOwnName = state => state.name
