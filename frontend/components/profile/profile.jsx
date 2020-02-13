import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div>
        <p>You're logged in!</p>
        <button onClick={()=> this.props.logout}>Logout</button>
      </div>
    )
  }
}

export default Profile;