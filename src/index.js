import ChatApp from './components/ChatApp.react';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as ChatWebAPIUtils from './utils/ChatWebAPIUtils';
import * as Actions from './actions';

ChatWebAPIUtils.getAllMessages();
ChatWebAPIUtils.getHistory();
ReactDOM.render(
  <ChatApp /> ,
  document.getElementById('root')
);
