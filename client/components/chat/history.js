
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { getHistory, getParticipants } from '../../store/selectors'
import { formatChatTime } from '../../utils'

import { ChatHistory, Message, Source, Time } from '../styled'

export default () => {
  const history = useSelector(getHistory)
  const participants = useSelector(getParticipants)

  return (
    <ChatHistory>
      {history.map(({
        from,
        message,
        when
      }) => (
        <Message>
          <span>
            <Source>{participants[from] || from}</Source>
            <Time>{formatChatTime(when)}</Time>
          </span>
          <div>{message}</div>
        </Message>
      ))}
    </ChatHistory>
  )
}
