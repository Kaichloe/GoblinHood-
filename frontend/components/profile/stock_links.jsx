import React from 'react';
import { Link } from 'react-router-dom';

class StockLinks extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      latestPrice:{}
    }
    this.sharesOwn = this.sharesOwn.bind(this);
    this.watchlistLinks= this.watchlistLinks.bind(this);
    this.portfolioLinks = this.portfolioLinks.bind(this);
  }

  componentDidMount() {
    let watchlist = Object.values(this.props.watchlist)
    // console.log(watchlist)
    for (let i = 0; i < watchlist.length; i++) {
      const symbol = watchlist[i].ticker;
      let newLatestPrice = this.state.latestPrice;
      this.props.fetchLatestPrice(symbol).then(res => {
        newLatestPrice[symbol] = Object.values(res).slice(1);
        this.setState({
          latestPrice: newLatestPrice
        })
      })
    }
  }

  sharesOwn(ticker){
    let owned_stocks = this.props.ownedStocks;
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
    let data = (this.state.latestPrice);

    for (let i = 0; i < watchlist.length; i++) {
      if (this.sharesOwn(watchlist[i].ticker) === undefined){
        watch.push(
          <Link
            key={watchlist[i].ticker}
            className="stock-links"
            to={`/profile/stocks/${watchlist[i].ticker}`}
          >
            <div className="first-column">
              <p className="watch-ticker">{watchlist[i].ticker}</p>
              <p className="shares-own">{this.sharesOwn(watchlist[i].ticker)}</p>
            </div>
            <div className="second-column">
              <p className="latest-stock-price">${data[watchlist[i].ticker]}</p>
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
    let data = (this.state.latestPrice);

    for (let i = 0; i < watchlist.length; i++) {
      if (this.sharesOwn(watchlist[i].ticker) !== undefined) {
        
        portfolio.push(
          <Link
            key={watchlist[i].ticker}
            className="stock-links"
            to={`/profile/stocks/${watchlist[i].ticker}`}
          >
            <div className="first-column">
              <p className="watch-ticker">{watchlist[i].ticker}</p>
              <p className="shares-own">
                {this.sharesOwn(watchlist[i].ticker)}
              </p>
            </div>
            <div className="second-column">
              <p className="latest-stock-price">${data[watchlist[i].ticker]}</p>
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
        {/* <button onClick={()=> console.log(this.state)}>state</button> */}
        {/* <button onClick={()=>this.setState({companies: this.props.fetchCompany('AAPL')})}>hello</button> */}
      </div>
    );
  }
}

export default StockLinks;


