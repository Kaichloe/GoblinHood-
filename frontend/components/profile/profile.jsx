import React from 'react';
import { Link } from 'react-router-dom';
import NewsFormContainer from '../news/news_container';
import PortfolioChartContainer from './portfolio_chart_container';
import StockLinks from './stock_links';

class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div className="profile-container">
        <div className="profile-nav-container">
          <div></div>
            <input
              placeholder="Search"
              className="search-bar"type="text"
            />
            <div className="nav-buttons">
              <Link className="home-button" to="/profile">Home</Link>
            <Link className="logout-button"to="/" onClick={this.props.logout}>Logout</Link>
            </div>
        </div>
      <div className="profile">
        <div className="profile-1">
        </div>
        <div className="main-container profile 2">
          <div className="graph-container">
            <PortfolioChartContainer />
          </div>
          <div className="news-container">
            <NewsFormContainer/>
          </div>
        </div>
        <div className="profile-3">
          <StockLinks/>
        </div>
        <div className="profile-4">
        </div>
      </div>
    </div>
    )
  }
}

export default Profile;