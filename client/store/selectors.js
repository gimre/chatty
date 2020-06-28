
export const getHistory = state => state.history

export const getParticipants = state => state.participants

export const getParticipantCount = state => getParticipantNames(state).length

export const getParticipantIds = state => Object.keys(getParticipants(state))

export const getParticipantNames = state => Object.values(getParticipants(state))

export const getSelfId = state => state.uuid

export const getSelfName = state => state.name
