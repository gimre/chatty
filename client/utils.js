
import { uuid } from 'uuidv4'

import { EmojiLookup, Regex, RsaKeyParams } from './constants'

const getStoredValue = (key, makeFn) => {
  const stored = localStorage.getItem(key)
  if (stored) {
    return JSON.parse(stored)
  }

  const value = makeFn()
  localStorage.setItem(key, JSON.stringify(value))
  return value
}

const getStoredValueAsync = async (key, makeFnAsync) => {
  const value = await makeFnAsync()
  return getStoredValue(key, () => value)
}

export const formatChatTime = dateLike => {
  const date = new Date(dateLike)
  return `${date.getHours()}:${date.getMinutes()}`
}

// cute hack in the interest of time, won't work for n-sized groups
export const formatMessage = message => message
  .replace(Regex.EmojiLTR, lookupEmoji)
  .replace(Regex.EmojiRTL, lookupEmoji)
  .replace(Regex.Url, '<a href="$&" target="_blank">$&</a>')

export const fromArrayBuffer = buffer =>
  String.fromCharCode.apply(null, new Uint16Array(buffer))

export const getKeyPair = () => getStoredValueAsync('keyPair', async () => {
  const keyPair = await crypto.subtle.generateKey({
      ...RsaKeyParams,
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1])
    },
    true,
    ['encrypt', 'decrypt']
  )

  const [
    privateKey,
    publicKey
  ] = await Promise.all([
    crypto.subtle.exportKey('jwk', keyPair.privateKey),
    crypto.subtle.exportKey('jwk', keyPair.publicKey)
  ])

  return {
    privateKey,
    publicKey
  }
})

export const getName = () =>
  getStoredValue('name', () =>
    prompt('What is your name?\n(just press Enter for a random one)'))

export const getUid = () => getStoredValue('uid', uuid)

export const lookupEmoji = match => match in EmojiLookup
  ? EmojiLookup[match]
  : match

export const toArrayBuffer = str => {
  const buffer = new ArrayBuffer(str.length * 2)
  const view = new Uint16Array(buffer)

  for (let i=0; i < str.length; i++) {
    view[i] = str.charCodeAt(i)
  }

  return buffer
}
