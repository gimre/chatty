
import React from 'react'
import { useSelector } from 'react-redux'

import { getParticipantIds, getParticipants } from '../../store/selectors'
import { Participant } from '../styled'

export default () => {
  const participants = useSelector(getParticipants)
  const participantIds = useSelector(getParticipantIds)

  return participantIds.map(id => (
    <Participant key={id}>{participants[id]}</Participant>
  ))
}
