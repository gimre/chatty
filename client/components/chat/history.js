
import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import localTypes from '../../types'
import types from '../../../shared/types.mjs'
import { getEditedMessage, getHistory, getParticipants, getOwnId } from '../../store/selectors'
import { RoomIdentity } from '../../constants'
import { formatChatTime, formatMessage } from '../../utils'

import {
  ChatHistory,
  Message,
  MessageControls,
  MessageHeader,
  RoomMessage,
  Source,
  Time
} from '../styled'

export default () => {
  const dispatch = useDispatch()
  const historyEndRef = useRef()
  const editedMessage = useSelector(getEditedMessage)
  const history = useSelector(getHistory)
  const participants = useSelector(getParticipants)
  const selfId = useSelector(getOwnId)

  useEffect(() => {
    historyEndRef.current?.scrollIntoView()
  })

  const onDelete = id => () => dispatch({
    type: types.DELETE,
    payload: {
      id
    }
  })

  const onEdit = id => () => {
    dispatch({
      type: localTypes.EDITING,
      payload: editedMessage ? null : id
    })
  }

  return (
    <ChatHistory>
      {history.map(({
        edited,
        from,
        id,
        message,
        when
      }) => (
        <Message
          edited={edited}
          key={id}
        >
          <MessageHeader>
            <Source>{participants[from]?.name || from}</Source>
            <Time>{formatChatTime(when)}</Time>
            {from === selfId && (
              <MessageControls>
                <div onClick={onEdit(id)}>Edit</div>
                <div onClick={onDelete(id)}>Delete</div>
              </MessageControls>
            )}
          </MessageHeader>
          {from === RoomIdentity ? (
            <RoomMessage>{message}</RoomMessage>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: formatMessage(message) }} />
          )}
        </Message>
      ))}
      <div ref={historyEndRef} />
    </ChatHistory>
  )
}
