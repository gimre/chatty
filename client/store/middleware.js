
import { getSelfId } from './selectors'

export const DontSend = Symbol()

export const remoteSend = send => store => next => action => {
  console.log(action)
  if (action[DontSend]) {
    return next(action)
  }

  const { payload, type } = action
  const actionWithId = {
    type,
    payload: {
      ...payload,
      from: getSelfId(store.getState())
    }
  }

  send(actionWithId)
}
