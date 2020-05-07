import React from 'react';
import { Link } from 'react-router-dom';

class StockLinks extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
    this.sharesOwn = this.sharesOwn.bind(this);
    this.watchlistLinks= this.watchlistLinks.bind(this);
    this.portfolioLinks = this.portfolioLinks.bind(this);
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
    let watch = [];
    for (let i = 0; i < watchlist.length; i++) {
      if (this.sharesOwn(watchlist[i].ticker) === undefined){
        watch.push(
          <Link
            key={watchlist[i].ticker}
            className="stock-links"
            to={`/profile/stocks/${watchlist[i].ticker}`}
          >
            <div className="first-column">
              <p>{watchlist[i].ticker}</p>
              <p>{this.sharesOwn(watchlist[i].ticker)}</p>
            </div>
          </Link>
        )
      }
    }
    return watch
  }


  portfolioLinks(){
    let watchlist = this.props.watchlist;
    let portfolio = [];
    for (let i = 0; i < watchlist.length; i++) {
      if (this.sharesOwn(watchlist[i].ticker) !== undefined) {
        portfolio.push(
          <Link
            key={watchlist[i].ticker}
            className="stock-links"
            to={`/profile/stocks/${watchlist[i].ticker}`}
          >
            <div className="first-column">
              <p>{watchlist[i].ticker}</p>
              <p>{this.sharesOwn(watchlist[i].ticker)}</p>
            </div>
          </Link>
        );
      }
    }
    return portfolio;
  }

  render(){
    return (
      <div className="stock-links-container">
        <label className="stock-portfolio">Portfolio</label>
        {this.portfolioLinks()}
        <label className="stock-portfolio">Watchlist</label>
        {this.watchlistLinks()}
        <button onClick={()=> console.log(this.state)}>state</button>
        <button onClick={()=>this.setState({companies: this.props.fetchCompany('AAPL')})}>hello</button>
      </div>
    );
  }
}

export default StockLinks;


