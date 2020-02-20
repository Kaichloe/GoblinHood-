import React from 'react';
import { Link } from 'react-router-dom';
import NewsFormContainer from '../news/news_container';
import PortfolioChart from './portfolio_chart';
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
          {/* <h2 className='buying-power'>$9,999,999</h2>
          <Link to="/profile ">Home</Link>
          <Link to="/" onClick={this.props.logout}>Logout</Link> */}
        </div>
        <div className="main-container profile 2">
          <div className="graph-container">
            <PortfolioChart/>
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