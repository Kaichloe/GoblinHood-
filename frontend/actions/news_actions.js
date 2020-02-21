import * as APIUtil from '../util/news.api_util';
export const RECEIVE_NEWS = 'RECEIVE_NEWS';

export const receiveNews = (news) => {
  return {
    type: RECEIVE_NEWS,
    news
  };
};

export const fetchNews = (symbol) => (dispatch) => {
  return APIUtil.fetchNews(symbol).then((news)=> dispatch(receiveNews(news)))
}