
import React from 'react'
import { Provider } from 'react-redux'

import createStore from '../store'

import { Header } from './styled'
import Tabs from './tabs'

export default ({
  socket
}) => (
  <Provider store={createStore(socket)}>
    <Header>Status Meeting Standup</Header>
    <Tabs />
  </Provider>
)
