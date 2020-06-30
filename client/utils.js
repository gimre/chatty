
import { uuid } from 'uuidv4'

import { EmojiLookup, Regex, RsaKeyParams, Vocabulary } from './constants'

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
  return `${
    padLeadingZero(date.getHours())
  }:${
    padLeadingZero(date.getMinutes())
  }`
}

export const formatMessage = message => Object.entries(EmojiLookup)
  .reduce((m, [text, emoji]) => m.split(text).join(emoji), message)
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
    prompt('What is your name?\n(just press OK for a random one)')
    || getRandomName())

export const getRandomName = () => `${
  Vocabulary.Adjectives[getRandomInteger(Vocabulary.Adjectives.length)]
}${
  Vocabulary.Nouns[getRandomInteger(Vocabulary.Nouns.length)]
}`

export const getRandomInteger = ceiling => Math.random() * ceiling | 0

export const getUid = () => getStoredValue('uid', uuid)

export const padLeadingZero = str => ('00' + str).slice(-2)

export const toArrayBuffer = str => {
  const buffer = new ArrayBuffer(str.length * 2)
  const view = new Uint16Array(buffer)

  for (let i=0; i < str.length; i++) {
    view[i] = str.charCodeAt(i)
  }

  return buffer
}
