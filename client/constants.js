
export const EmojiLookup = Object.assign(Object.create(null), {
  ':D': '😃',
  ':P': '😛',
  '<3': '❤️',
  ':(': '😢',
  ':s': '😟',
  ':o': '😲'
})

export const Regex = {
  Url: /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/g
}

export const RsaKeyParams = {
  hash: 'SHA-256',
  name: 'RSA-OAEP'
}

export const TabIds = {
  Participants: Symbol(),
  Chat: Symbol()
}
