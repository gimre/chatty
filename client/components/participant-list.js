
import React from 'react'
import { useSelector } from 'react-redux'

import { Participant } from './styled'

export default () => {
  const participants = useSelector(store => store.participants)
  return Object.values(participants)
    .map(name => <Participant>{name}</Participant>)
}
