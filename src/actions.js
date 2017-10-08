import ChatAppDispatcher from './dispatcher/ChatAppDispatcher';
import * as ChatWebAPIUtils from './utils/ChatWebAPIUtils';
import * as ChatMessageUtils from './utils/ChatMessageUtils';
import ChatConstants from './constants/ChatConstants';
import $ from 'jquery';

let ActionTypes = ChatConstants.ActionTypes;

export function createMessage(text, currentThreadID) {
  let message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
  ChatAppDispatcher.dispatch({
    type: ActionTypes.CREATE_MESSAGE,
    message
  });
  ChatWebAPIUtils.createMessage(message);
};

export function receiveCreatedMessage(createdMessage, tempMessageID) {
  ChatAppDispatcher.dispatch({
    type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
    rawMessage: createdMessage,
    tempMessageID
  });

};

export function clickThread(threadID) {
  ChatAppDispatcher.dispatch({
    type: ActionTypes.CLICK_THREAD,
    threadID
  });
};

export function receiveAll(rawMessages) {
  ChatAppDispatcher.dispatch({
    type: ActionTypes.RECEIVE_RAW_MESSAGES,
    rawMessages
  });
};

export function createSTATUSMessage(createdMessage, currentThreadID) {
   var timestamp = Date.now();

  let receivedMessage =  {
    id: 'm_' + timestamp,
    threadID: currentThreadID,
    authorName: 'Status', // hard coded for the example
    text: '',
    response: {},
    actions:[],
    websearchresults:[],
    date: new Date(timestamp),
    isRead: true,
  };
  // Ajax Success calls the Dispatcher to CREATE_STATUS_MESSAGE
  $.ajax({
    url: 'http://cors-anywhere.herokuapp.com/http://139.59.78.99:8000/chat?message='+createdMessage.text,
    crossDomain: true,
    timeout: 3000,
    async: false,
    success: function (response) {
      console.log(response);
        response = JSON.stringify(response);
        receivedMessage.text = response.message;
        receivedMessage.response = response;
          let message =  ChatMessageUtils.getStatusMessageData(
            receivedMessage, currentThreadID);

          ChatAppDispatcher.dispatch({
            type: ActionTypes.CREATE_STATUS_MESSAGE,
            message
          });
      },
    error: function(errorThrown) {
      console.log(errorThrown);
      receivedMessage.text = 'Please check your internet connection';
    }
  });
};
