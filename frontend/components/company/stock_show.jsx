import React from 'react';
import ChartContainer from './chart_container';
import NewsFormContainer from '../news/news_container';
import CompanyInfo from './company_container';
import { Link } from 'react-router-dom';
import Search from '../search/search_form';

class StockShow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className="profile-container">
        <div className="profile-nav-container">
          <div className="nav-left">
            <Link className="app-name" to="/profile">GoblinHood</Link>
          </div>
          <Search/>
          <div className="nav-buttons">
            <a target="_blank" href="https://github.com/Kaichloe">Github</a>
            <a target="_blank" href="https://www.linkedin.com/in/kaiyip-ho-216230191/">LinkedIn</a>
            <Link className="home-button" to="/profile">Home</Link>
            <Link className="logout-button" to="/" onClick={this.props.logout}>Logout</Link>
          </div>
        </div>
        <div className="profile">
          <div className="profile-1">
          </div>
          <div className="main-container profile 2">
            <div className="graph-container">
              <ChartContainer />
            </div>
            <div className="stock-info">
              <CompanyInfo/>
              <div className="news-container">
                <NewsFormContainer />
              </div>
            </div>
          </div>
          <div className="profile-3">
          </div>
          <div className="profile-4">
          </div>
        </div>
      </div>
    )
  }
}

export default StockShow;