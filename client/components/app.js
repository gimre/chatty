
import React from 'react'
import { Provider } from 'react-redux'

import ParticipantList from './participant-list'
import store from '../store'

import {
  ChatHistory,
  ChatInput,
  Header,
  Input,
  Message,
  Source,
  Tab,
  TabContent,
  TabHeader,
  Tabs,
  Time
} from './styled'

export default () => (
  <Provider store={store}>
    <Header>Status Meeting Standup</Header>
    <Tabs>
      <Tab active>
        <TabHeader>
          <Header>Participants (4)</Header>
        </TabHeader>
        <TabContent>
          <ParticipantList />
        </TabContent>
      </Tab>
      <Tab>
        <TabHeader>
          <Header>Chat</Header>
        </TabHeader>
        <TabContent>
          <ChatHistory>
            <Message>
              <span>
                <Source>Michel Sagen</Source>
                <Time>15:21</Time>
              </span>
              <div>
                Waiting for a few more before we begin, I'm keeping my microphone muted for now ;)
              </div>
            </Message>
            <Message>
              <span>
                <Source>Meetingbot</Source>
                <Time>15:22</Time>
              </span>
              <div>
                Peng Mok joined.
              </div>
            </Message>
            <Message>
              <span>
                <Source>Meetingbot</Source>
                <Time>15:23</Time>
              </span>
              <div>
                Lars Bergendahl joined.
              </div>
            </Message>
            <Message>
              <span>
                <Source>Lars Bergendahl</Source>
                <Time>15:24</Time>
              </span>
              <div>
                When did we get chat? Is the backend ready to handle the massive amount of traffic we will get?
              </div>
            </Message>
            <Message>
              <span>
                <Source>Tom Erik Lia</Source>
                <Time>15:24</Time>
              </span>
              <div>
                Looks like I have another meeting, please email notes to me
              </div>
            </Message>
            <Message>
              <span>
                <Source>Meetingbot</Source>
                <Time>15:24</Time>
              </span>
              <div>
                Tom Erik Lia left.
              </div>
            </Message>
            <Message>
              <span>
                <Source>Krzysztof Grzeslo</Source>
                <Time>15:25</Time>
              </span>
              <div>
                Will ask Thomas to restart sleipnir chat on osl-mid3. Thomas has a plan to migrate to chat websockets: www.websocketsforbeginners.com
              </div>
            </Message>
            <Message>
              <span>
                <Source>Michel Sagen</Source>
                <Time>15:25</Time>
              </span>
              <div>
                Not sure about websockets. Chat already has a name - strongly suggest we do not change the name weeks before it is launched. Should we launch on desktop first?
              </div>
            </Message>
          </ChatHistory>
          <ChatInput>
            <Input placeholder="Message"/>
          </ChatInput>
        </TabContent>
      </Tab>
    </Tabs>
  </Provider>
)
