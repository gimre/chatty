
import React from 'react'
import { useSelector } from 'react-redux'

import { getActiveParticipants } from '../../store/selectors'
import { Participant } from '../styled'

export default () => {
  const participants = useSelector(getActiveParticipants)
  return Object.entries(participants).map(([id, meta]) => (
    <Participant key={id}>{meta.name}</Participant>
  ))
}
