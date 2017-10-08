
import MessageComposer from './MessageComposer.react';
import MessageListItem from './MessageListItem.react';
import MessageStore from '../stores/MessageStore';
import React,{Component} from 'react';
import ThreadStore from '../stores/ThreadStore';

function getStateFromStores() {
  return {
    messages: MessageStore.getAllForCurrentThread(),
    thread: ThreadStore.getCurrent()
  };
}

function getMessageListItem(message) {
  return (
    <MessageListItem
      key={message.id}
      message={message}
    />
  );
}

export default class MessageSection extends Component {

  constructor(props) {
    super(props);
    this.state = getStateFromStores();
  }

  componentDidMount() {
    this._scrollToBottom();
    MessageStore.addChangeListener(this._onChange.bind(this));
    ThreadStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    MessageStore.removeChangeListener(this._onChange.bind(this));
    ThreadStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    let messageListItems = this.state.messages.map(getMessageListItem);
    if (this.state.thread) {
      return (
        <div>
          <header className="message-thread-heading">
            <nav>
              <img src='/images/globe.png' alt='status200'/>
              <h1>Status 200</h1>
              <span style={{
                textAlign: 'right',
                marginLeft: '20px',
                lineHeight: '50px'
              }}> <a href='http://github.com/winuall/testing'>Active project: Winuall</a></span>
            </nav>
          </header>
          <div className="message-pane">
            <div className="message-section">
              <ul
                className="message-list"
                ref={(c) => { this.messageList = c; }}>
                {messageListItems}
              </ul>
              <div className="compose">
                <MessageComposer threadID={this.state.thread.id}/>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div className="message-section"></div>;
  }

  componentDidUpdate() {
    this._scrollToBottom();
  }

  _scrollToBottom() {
    let ul = this.messageList;
    if (ul) {
      ul.scrollTop = ul.scrollHeight;
    }
  }

  /**
   * Event handler for 'change' events coming from the MessageStore
   */
  _onChange() {
    this.setState(getStateFromStores());
  }

};
