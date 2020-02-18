import { connect } from 'react-redux';
import NewsForm from './news_form';
import { fetchNews } from '../../actions/news_actions';

const mstp = state => {
  return {
    news: (state.entities.news.slice(0,6))
  }
}

const mdtp = dispatch => {
  return {
    fetchNews: ()=> dispatch(fetchNews())
  }
}

export default connect(mstp, mdtp)(NewsForm);