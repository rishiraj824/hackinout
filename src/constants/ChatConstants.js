import keyMirror from 'keymirror';

export default {

  ActionTypes: keyMirror({
    CLICK_THREAD: null,
    CREATE_MESSAGE: null,
    RECEIVE_RAW_CREATED_MESSAGE: null,
    CREATE_STATUS_MESSAGE: null,
    RECEIVE_STATUS_MESSAGE: null,
    RECEIVE_RAW_MESSAGES: null,
    STORE_HISTORY_MESSAGE: null
  })

};
