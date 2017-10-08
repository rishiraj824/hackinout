
import * as Actions from '../actions';
import * as ChatExampleDataServer from '../ChatExampleDataServer';

/*
  The createMessage function receives the client's message and calls for
  a STATUS Message creation using Actions.createSTATUSMessage()
*/
export function createMessage(message) {
  ChatExampleDataServer.postMessage(message, createdMessage => {
    Actions.receiveCreatedMessage(createdMessage, message.id);
    Actions.createSTATUSMessage(createdMessage, message.threadID);
  });
};

export function getAllMessages() {
  ChatExampleDataServer.getMessages(messages => {
    Actions.receiveAll(messages);
  });
};

export function getHistory(){
	Actions.getHistory();
}
