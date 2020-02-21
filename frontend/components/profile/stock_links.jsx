import React from 'react';
import { Link } from 'react-router-dom';

class StockLinks extends React.Component{
  constructor(props){
    super(props)

  }

  render(){
    return(
      <div className="stock-links-container">
        <label className="stock-portfolio">Portfolio</label>
        <Link className="stock-links" to='/profile/stocks/SNAP'>SNAP</Link>
        <Link className="stock-links" to='/profile/stocks/TWTR'>TWTR</Link>
        <Link className="stock-links" to='/profile/stocks/C'>C</Link>
        <Link className="stock-links" to='/profile/stocks/IBM'>IBM</Link>
        <label className="stock-portfolio">WatchList</label>
        <Link className="stock-links" to='/profile/stocks/AAPL'>AAPL</Link>
        <Link className="stock-links" to='/profile/stocks/BAC'>BAC</Link>
        <Link className="stock-links" to='/profile/stocks/GE'>GE</Link>
        
      </div>
    )
  }
}

export default StockLinks;


