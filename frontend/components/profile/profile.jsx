import React from 'react';
import { Link } from 'react-router-dom';
import NewsFormContainer from '../news/news_container';
import PortfolioChart from './portfolio_chart';

class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div className="profile">
        <div className="profile-1">
          <p>You're logged in!</p>
          <Link to="/" onClick={this.props.logout}>Logout</Link>
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
        </div>
        <div className="profile-4">
        </div>
      </div>
    )
  }
}

export default Profile;