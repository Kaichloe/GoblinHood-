import { RECEIVE_NEWS } from '../actions/news_actions';

const NewsReducer = (oldState=[], action) =>{
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_NEWS:
      return action.news;
    default:
      return oldState;
  };
};

export default NewsReducer;