
import styled from 'styled-components'

export const ChatHistory = styled.div`
  padding: var(--chatHistorySpacing) 25px var(--chatInputHeight);
`

export const ChatInput = styled.div`
  background-color: var(--bgActiveColor);
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  height: var(--chatInputHeight);
  left: 0;
  padding: 14px 16px;
  position: fixed;
  right: 0;
`

export const Header = styled.div`
  align-items: center;
  background-color: var(--bgColor);
  box-sizing: border-box;
  display: flex;
  height: var(--headerSize);
  justify-content: center;
`

export const Input = styled.input`
  border: 1px solid var(--chatInputBorderColor);
  border-radius: 3px;
  flex: 1;
  font-family: inherit;
  height: 44px;
  padding: 0 16px;

  ${props => props.editing && `
    background-color: lightyellow;
  `}
`

export const Message = styled.div`
  line-height: 1.6em;
  position: relative;

  & + & {
    margin-top: var(--chatHistorySpacing);
  }

  ${props => props.edited && `
    font-style: italic;
  `}
`

export const MessageControls = styled.div`
  color: var(--spacerColor);
  display: flex;
  font-family: 'Cerebri Sans Light';
  font-size: 10px;

  & > * {
    cursor: pointer;
  }

  & > *:hover {
    color: var(--fgColor);
  }

  & > *:not(:last-child) {
    margin-right: 5px;
  }
`

export const MessageHeader = styled.div`
  align-items: center;
  display: flex;

  & > *:not(:last-child) {
    margin-right: 7px;
  }
`

export const Participant = styled.div`
  align-items: center;
  border-bottom: var(--borderSize) solid var(--spacerColor);
  display: flex;
  height: 54px;
  padding: 0 20px;

  &:first-child {
    margin-top: 5px;
  }
`

export const RoomMessage = styled.div`
  color: var(--roomMessageColor);
`

export const Source = styled.span`
  font-weight: bold;
`

export const Tabs = styled.div`
  display: flex;
  position: relative;
`

export const Tab = styled.div`
  flex: 1;

  ${ props => props.active && `
    & > ${TabHeader} > ${Header} {
      background-color: var(--bgActiveColor);
      border-color: var(--borderColor);
      border-radius: 5px 5px 0 0;
      position: relative;
    }

    & > ${TabContent} {
      box-shadow: 0px -1px 0px 0px var(--borderColor);
      display: block;
      width: 100%;
    }
  `}
`

export const TabContent = styled.div`
  background-color: var(--bgActiveColor);
  box-sizing: border-box;
  display: none;
  height: calc(100vh - 2 * var(--headerSize) - var(--borderSize));
  left: 0;
  overflow: auto;
  position: absolute;
  right: 0;
`

export const TabHeader = styled.div`
  cursor: pointer;

  & > ${Header} {
    border: var(--borderSize) solid transparent;
    border-bottom: 0;
    z-index: 1;
  }
`

export const Time = styled.span`
  color: var(--chatTimeColor);
  font-family: 'Cerebri Sans Light';
`
