
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

export const getParticipants = state => state.participants

export const getParticipantCount = state => Object.keys(getActiveParticipants(state)).length

export const getSelfId = state => state.uuid

export const getSelfName = state => state.name
