
import React, { useState } from 'react'

import { TabIds } from '../constants'

import ChatTab from './chat/tab'
import ParticipantsTab from './participants/tab'
import { Tabs } from './styled'

export default () => {
  const [ activeTab, setActiveTab ] = useState(TabIds.Chat)

  return (
    <Tabs>
      <ParticipantsTab
        active={activeTab === TabIds.Participants}
        onHeaderClick={() => setActiveTab(TabIds.Participants)}
      />

      <ChatTab
        active={activeTab === TabIds.Chat}
        onHeaderClick={() => setActiveTab(TabIds.Chat)}
      />
    </Tabs>
  )
}
