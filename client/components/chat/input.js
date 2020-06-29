
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import types from '../../../shared/types.mjs'
import { ChatInput, Input } from '../styled'

const defaultMessage = ''

export default () => {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [ message, setMessage ] = useState(defaultMessage)

  // useEffect(() => {
  //   inputRef.current?.focus()
  // })

  const onChange = () => {
    setMessage(inputRef.current?.value)
  }

  const onKeyPress = e => {
    const message = inputRef.current?.value
    if (e.key === 'Enter' && message) {
      dispatch({
        type: types.MESSAGE,
        payload: {
          message
        }
      })
      setMessage(defaultMessage)
    }
  }

  return (
    <ChatInput>
      <Input
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="Message"
        ref={inputRef}
        value={message}
      />
    </ChatInput>
  )
}
