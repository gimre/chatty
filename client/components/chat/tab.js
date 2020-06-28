
import React from 'react'

import { Header, Tab, TabContent, TabHeader } from '../styled'

import ChatHistory from './history'
import ChatInput from './input'

export default ({
  active,
  onHeaderClick
}) => (
  <Tab active={active}>
    <TabHeader
      onMouseDown={onHeaderClick}
      onTouchStart={onHeaderClick}
    >
      <Header>Chat</Header>
    </TabHeader>
    <TabContent>
      <ChatHistory />
      <ChatInput />
    </TabContent>
  </Tab>
)
