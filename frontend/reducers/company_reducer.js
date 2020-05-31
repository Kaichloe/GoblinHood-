import { RECEIVE_HISTORICAL_PRICES} from '../actions/company_actions';
import moment from 'moment';

const companiesReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_HISTORICAL_PRICES:
      let data = [];
      for (let i = 0; i < action.priceData.length; i++) {
        if (action.priceData[i].minute !== undefined){
          let newDate = action.priceData[i].minute + " " + action.priceData[i].date;
          let formattedData = moment(newDate).format('h:mm MMM DD YYYY')
          action.priceData[i].customDate = formattedData;
          data.push(action.priceData[i]);
        } else {
          let formattedOther = moment(action.priceData[i].date).format('MMM DD YYYY')
          action.priceData[i].customDate = formattedOther;
          data.push(action.priceData[i]);
        }
      }
      return data ;
    default:
      return oldState;
  }
}

export default companiesReducer;