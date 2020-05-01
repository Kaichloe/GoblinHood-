import React from 'react';
import { Link } from 'react-router-dom';

class StockLinks extends React.Component{
  constructor(props){
    super(props)

    this.sharesOwn = this.sharesOwn.bind(this);
    this.watchlistLinks= this.watchlistLinks.bind(this);
  }

  sharesOwn(ticker){
    let owned_stocks = this.props.owned_stocks;
    let shares = owned_stocks[ticker];

    if (shares > 1 ){
      return `${shares} shares` 
    } else if (shares === 1){
      return `${shares} share`
    } 
  
  }

  watchlistLinks(){
    let watchlist = this.props.watchlist
    let results = [];
    for (let i = 0; i < watchlist.length; i++) {
      results.push(
      <Link  key={watchlist[i].ticker} className="stock-links" to={`/profile/stocks/${watchlist[i].ticker}`}>
        <div className="first-column">
          <p>{watchlist[i].ticker}</p>
          <p>{this.sharesOwn(watchlist[i].ticker)}</p>
        </div>
      </Link>
      )
    }
    return results
  }
  render(){
    return (
      <div className="stock-links-container">
        <label className="stock-portfolio">WatchList</label>
        <button onClick={() => console.log(this.props.watchlist)}></button>
        {this.watchlistLinks()}
      </div>
    );
  }
}

export default StockLinks;


