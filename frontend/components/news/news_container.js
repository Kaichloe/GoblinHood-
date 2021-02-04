import { connect } from 'react-redux';
import NewsForm from './news_form';
import { fetchNews, fetchStockNews } from '../../actions/news_actions';
import { withRouter } from 'react-router-dom';


const mstp = (state, ownProps) => {
  return {
    news: state.entities.news,
    symbol: ownProps.match.params.symbol
  }
}

const mdtp = dispatch => {
  return {
    fetchNews: (symbol)=> dispatch(fetchNews(symbol)),
    fetchStockNews: (symbol) => dispatch(fetchStockNews(symbol))
  }
}

export default withRouter(connect(mstp, mdtp)(NewsForm));