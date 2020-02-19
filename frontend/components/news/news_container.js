import { connect } from 'react-redux';
import NewsForm from './news_form';
import { fetchNews } from '../../actions/news_actions';

const mstp = (state, ownProps) => {
  return {
    news: state.entities.news
  }
}

const mdtp = dispatch => {
  return {
    fetchNews: ()=> dispatch(fetchNews())
  }
}

export default connect(mstp, mdtp)(NewsForm);