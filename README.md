
## Running

```
npm install
npm start
```

## Known issues
- using RSA only to encrypt messages limits the message size - larger messages will fail to get encrypted/sent
- mobile has some problems with styling when the native keyboard opens
- client-side performance suffers a bit because imported keys are not cached (noticeable on mobile)
- fonts don't seem quite alright

## Further improvements
- use a randomly-generated AES key for each message to enable arbitrary length messages
- add action creators to thin out code in certain components
- separate _the reducer_ into multiple ones
- in general, split out monolithic components into smaller ones
- cache local keys instead of keeping them in jwk format and importing them each time they are used
- maybe add more ui hints and confirmations (on editing / deletion / etc)
