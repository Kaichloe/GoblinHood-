import React from 'react';
import { Link } from 'react-router-dom';
import NewsFormContainer from '../news/news_container';
import PortfolioChartContainer from './portfolio_chart_container';
import StockLinksContainer from './stock_links_container';
import Search from '../search/search_form';

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      stockPrices: {},
      latestPrice: {}
    }
  }


  // componentDidMount(){
  //   let owned_stocks = Object.keys(this.props.ownedStocks)
  //   // console.log(owned_stocks);
  //   // this.props.fetchBigPriceData(owned_stocks).then(data => this.setState({stockPrices : data}))
  //   for (let i = 0; i < owned_stocks.length; i++) {
  //     const symbol = owned_stocks[i];
  //     let newLatestPrice = this.state.latestPrice;
  //     this.props.fetchLatestPrice(symbol).then(res=> {
  //       newLatestPrice[symbol]= res;
  //       this.setState({
  //         latestPrice: newLatestPrice
  //       })
  //     })
  //   }
  // }

  // darkModeOn(){
  //   const body = document.body;
  //   body.classList.toggle("dark-mode");
  // }

  render(){

    return (
      <div className="profile-container">
        <div className="profile-nav-container">
          <div className="nav-left">
            <li className="app-name">
              GoblinHood
            </li>
          </div>
            {/* <input
              placeholder="Search"
              className="search-bar"type="text"
            /> */}
            <Search/>
            <div className="nav-buttons">
              <a target="_blank" href="https://github.com/Kaichloe">Github</a>
              <a target="_blank" href="https://www.linkedin.com/in/kaiyip-ho-216230191/">LinkedIn</a>
              <Link className="home-button" to="/profile">Home</Link>
              <Link className="logout-button"to="/" onClick={this.props.logout}>Logout</Link>
            </div>
        </div>
      <div className="profile">
        <div className="profile-1">
        </div>
        <div className="main-container profile-2">
          <div className="graph-container">
            <PortfolioChartContainer/>
          </div>
          <div className="news-container">
            <NewsFormContainer/>
          </div>
        </div>
        <div className="profile-3">
          <StockLinksContainer/>
        </div>
        <div className="profile-4">
        </div>
        {/* <button onClick={()=>this.props.fetchAllCompanies()}>TEST</button> */}
        {/* <button onClick={()=> console.log(this.state)}>HELLO</button> */}
      </div>
    </div>
    )
  }
}

export default Profile;