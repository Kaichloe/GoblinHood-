import React from 'react';
import ChartContainer from './chart_container';
import NewsFormContainer from '../news/news_container';
import CompanyInfo from './company_container';
import { Link } from 'react-router-dom';

class StockShow extends React.Component {
  constructor(props) {
    super(props)
  }

  // currentPrice(){
  //   let data = this.props;
  //   for (let i = data.length-1; i > 0; i--){
  //     if (data[i].close !== null){
  //       return data[i].close
  //     }
  //   }
  // }

  // openPrice(){
  //   console.log(this.props)
  //   return this.props
  // }

  render() {

    // const defaultPrice = this.currentPrice();
    // const openPrice = this.openPrice();

    return (
      <div className="profile-container">
        <div className="profile-nav-container">
          <div></div>
          <input
            placeholder="Search"
            className="search-bar" type="text"
          />
          <div className="nav-buttons">
            <Link className="home-button" to="/profile">Home</Link>
            <Link className="logout-button" to="/" onClick={this.props.logout}>Logout</Link>
            <button onClick={() => console.log(this.props)}>tester</button>
          </div>
        </div>
        <div className="profile">
          <div className="profile-1">
          </div>
          <div className="main-container profile 2">
            <div className="graph-container">
              <ChartContainer />
            </div>
            <CompanyInfo/>
            <div className="news-container">
              <NewsFormContainer />
            </div>
          </div>
          <div className="profile-3">
            {/* <StockLinks /> */}
          </div>
          <div className="profile-4">
          </div>
        </div>
      </div>
    )
  }
}

export default StockShow;