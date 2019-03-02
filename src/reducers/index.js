import { combineReducers } from 'redux'
import * as actionTypes from '../actions/types';

const initialState = {
    currentUser: null,
    loading: true
};

const user_reducer = (state = initialState,action) => {
  switch ( action.type  ){
    case actionTypes.SET_USER:
      return{
        currentUser: action.payload.currentUser,
        isLoading: false
      };

    default:
      return state
  }
};

const initialChannelState = {
  currentChannel: null,
  isPrivateChannel: false,
  userPosts: null
};

const channel_reducer = (state = initialChannelState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel
      };
    case actionTypes.SET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload.userPosts
      };
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer
});

export default rootReducer
