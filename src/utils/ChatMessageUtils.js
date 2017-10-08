export function convertRawMessage(rawMessage, currentThreadID) {
  return {
    ...rawMessage,
    date: new Date(rawMessage.timestamp),
    isRead: rawMessage.threadID === currentThreadID
  };
};

export function getCreatedMessageData(text, currentThreadID) {
  var timestamp = Date.now();
  return {
    id: 'm_' + timestamp,
    threadID: currentThreadID,
    authorName: 'You',
    date: new Date(timestamp),
    text: text,
    isRead: true
  };
};

export function getStatusMessageData(message, currentThreadID) {
  var timestamp = Date.now();

  let receivedMessage =  {
    id: 'm_' + timestamp,
    threadID: currentThreadID,
    authorName: 'Status', // hard coded for the example
    text: message.text,
    actions: message.actions,
    websearchresults: message.websearchresults,
    date: new Date(timestamp),
    isRead: true,
    image:message.image,
    suggestions:message.suggestions,
    tags:message.tags
  };

  return receivedMessage;
}
