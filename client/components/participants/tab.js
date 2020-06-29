import React from 'react'
import { useSelector } from 'react-redux'

import { getParticipantCount } from '../../store/selectors'

import ParticipantList from './list'

import {
  Header,
  Tab,
  TabContent,
  TabHeader
} from '../styled'

export default ({
  active,
  onHeaderClick
}) => {
  const participantCount = useSelector(getParticipantCount)
  return (
    <Tab active={active}>
      <TabHeader
        onMouseDown={onHeaderClick}
        onTouchStart={onHeaderClick}
      >
        <Header>Participants ({participantCount})</Header>
      </TabHeader>
      <TabContent>
        <ParticipantList />
      </TabContent>
    </Tab>
  )
}
