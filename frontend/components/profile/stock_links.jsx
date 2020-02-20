import React from 'react';
import { Link } from 'react-router-dom';

class StockLinks extends React.Component{
  constructor(props){
    super(props)

  }

  render(){
    return(
      <div className="stock-links-container">
        <label className="stock-watchlist">Portfolio</label>
        <Link className="stock-links" to='/profile/stocks/SNAP'>Snap Inc.</Link>
        <Link className="stock-links" to='/profile/stocks/TWTR'>Twitter</Link>
        <Link className="stock-links" to='/profile/stocks/C'>Citi</Link>
        <Link className="stock-links" to='/profile/stocks/XOM'>XOM</Link>
      </div>
    )
  }
}

export default StockLinks;


