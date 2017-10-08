import ChatAppDispatcher from './dispatcher/ChatAppDispatcher';
import * as ChatWebAPIUtils from './utils/ChatWebAPIUtils';
import * as ChatMessageUtils from './utils/ChatMessageUtils';
import ChatConstants from './constants/ChatConstants';
import $ from 'jquery';

let ActionTypes = ChatConstants.ActionTypes;

export function createMessage(text, currentThreadID) {
  let message = ChatMessageUtils.getCreatedMessageData(text, 't_1');
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
    image:'',
    suggestions:[],
    tags:[]
  };
  createdMessage.text=createdMessage.text.toLowerCase();
  // Ajax Success calls the Dispatcher to CREATE_STATUS_MESSAGE
  $.ajax({
    url: 'http://cors-anywhere.herokuapp.com/http://139.59.21.68:8001/chat?message='+createdMessage.text,
    crossDomain: true,
    timeout: 3000,
    async: false,
    dataType:'json',
    success: function (response) {
      console.log(response);
        receivedMessage.text = response.message;
        receivedMessage.image ='';
        if(response.message==="I'm so sorry but I couldn't get you."){
          receivedMessage.image = 'images/sad.png';
        }
        if(response.suggestions){
          receivedMessage.suggestions = response.suggestions;
        }
        else{
          receivedMessage.suggestions = [];
        }
        if(response.tags){
          receivedMessage.tags = response.tags;
        }
        else{
          receivedMessage.tags = [];
        }
        console.log(message);
          let message =  ChatMessageUtils.getStatusMessageData(
            receivedMessage, currentThreadID);
          ChatAppDispatcher.dispatch({
            type: ActionTypes.CREATE_STATUS_MESSAGE,
            message
          });
      },
    error: function(errorThrown) {
      console.log(errorThrown);
      receivedMessage.image ='/images/globe.png'
      receivedMessage.text = "I'm so sorry but I couldn't get you.";
      receivedMessage.image = 'images/sad.png';
      let message =  ChatMessageUtils.getStatusMessageData(
        receivedMessage, currentThreadID);
      ChatAppDispatcher.dispatch({
        type: ActionTypes.CREATE_STATUS_MESSAGE,
        message
      });
    }
  });
};

export function getHistory(){
  let receivedMessage =
    {
      id: 'm_2',
      threadID: 't_1',
      threadName: 'Status',
      authorName: 'Status',
      text:'Hi there what can I do for you today!',
      timestamp: Date.now() - 89999,
      image:'/images/status200.svg',
      suggestions:['Show active servers','Create a server']
    };
    let message =  ChatMessageUtils.getStatusMessageData(
      receivedMessage, 't_1');
    ChatAppDispatcher.dispatch({
      type: ActionTypes.CREATE_STATUS_MESSAGE,
      message
    });
}
