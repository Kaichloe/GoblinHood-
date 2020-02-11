import React from 'react';

class SignupForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      buying_power: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render(){
    <div>
      <h1 className='signup_big_title'>Make Your Money Move</h1>
      <h2 className='signup_small_title'>Robinhood lets you invest in companies you love, commission-free.</h2>
      <form>
        <label>First Name
          <input 
            type="text"
            value=''
            onChange={this.update('firstName')}
            className="login-input"
          />
        </label>
        <label>Last Name
          <input
            type="text"
            value=''
            onChange={this.update('lastName')}
            className="login-input"
          />
        </label>
      </form>
    </div>
  }
}

export default SignupForm;