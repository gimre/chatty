
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import types from '../../../shared/types.mjs'
import { ChatInput, Input } from '../styled'

const defaultMessage = ''

export default () => {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [ message, setMessage ] = useState(defaultMessage)

  useEffect(() => {
    inputRef.current?.focus()
  })

  const onChange = () => {
    setMessage(inputRef.current?.value)
  }

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      dispatch({
        type: types.MESSAGE,
        payload: {
          message: inputRef.current?.value
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
