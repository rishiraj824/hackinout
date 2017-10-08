let NETWORK_LATENCY = 300;

let messages = [
  {
    id: 'm_2',
    threadID: 't_1',
    threadName: 'Status',
    authorName: 'Status',
    text:'Hi there what can I do for you today!',
    timestamp: Date.now() - 89999,
    image:'/images/status200.svg'
  }];

let threadNameMap = (function () {
  let map = {};
  messages.forEach(({threadID, threadName}) => {
    map[threadID] = threadName;
  });
  return map;
})();

export function getMessages(callback) {
  setTimeout(() => {
    callback(messages);
  }, NETWORK_LATENCY);
};


export function postMessage(message, callback) {
  let timestamp = Date.now();
  let id = 'm_' + timestamp;
  let threadID = message.threadID;

  let createdMessage = {
    id,
    threadID,
    threadName: threadNameMap[threadID],
    authorName: message.authorName,
    text: message.text,
    timestamp
  };


  messages.push(createdMessage);

  setTimeout(() => {
    callback(createdMessage);
  }, NETWORK_LATENCY);
};


export function postSTATUSMessage(message, callback) {

  messages.push(message);


  setTimeout(() => {
    callback(message);
  }, NETWORK_LATENCY);

}
