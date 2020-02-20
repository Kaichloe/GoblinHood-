import React from 'react';
import { Link } from 'react-router-dom';

class StockLinks extends React.Component{
  constructor(props){
    super(props)

  }

  render(){
    return(
      <div className="stock-links">
        <label className="stock-watchlist">WatchList</label>
        <Link to='/profile/stocks/SNAP'>Snap Inc.</Link>
        <Link to='/profile/stocks/TWTR'>Twitter</Link>
        <Link to='/profile/stocks/C'>Citi</Link>
        <Link to='/profile/stocks/XOM'>XOM</Link>
      </div>
    )
  }
}

export default StockLinks;


