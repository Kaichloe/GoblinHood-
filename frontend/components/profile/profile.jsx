import React from 'react';
import { Link } from 'react-router-dom';
import NewsFormContainer from '../news/news_container';

class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div className="profile">
        <p>You're logged in!</p>
        <Link to="/" onClick={this.props.logout}>Logout</Link>
        <NewsFormContainer/>
      </div>
    )
  }
}

export default Profile;