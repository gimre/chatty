
## Running

```
npm install
npm start
```

## Features
- single chat room, any number of participants
- end-to-end encryption
- PWA support, installable from mobile browsers
- emoji support
- link support

## Known issues
- trusting clients to validate the source of a message leaves the server vulnerable to spoofing but this would be nullified by jwt authentication, using the same code path
- using RSA only to encrypt messages limits the message size - larger messages will fail to get encrypted/sent
- mobile has some problems with styling when the native keyboard opens
- client-side performance suffers a bit because imported keys are not cached (noticeable on mobile)
- fonts don't seem quite alright
- ngrok tunnel is slow

## Further improvements
- use a randomly-generated AES key for each message to enable arbitrary length messages
- add action creators to thin out code in certain components
- separate _the reducer_ into multiple ones
- in general, split out monolithic components into smaller ones
- cache local keys instead of keeping them in jwk format and importing them each time they are used
- maybe add more ui hints and confirmations (on editing / deletion / etc)
