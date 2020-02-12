import React from 'react';

class SignupForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      buying_power: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault();
    const user = Object.assign({}, this.state)
    this.props.processForm(user);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }
  render(){
    return (
    <div className='signup-block'>
      <h1 className="signup_title">Make Your Money Move</h1>
      <h2 className="signup_subtitle">Robinhood lets you invest in companies you love, commission-free.</h2>
        <form className='name'>
          <label className='name'>First Name
            <input 
              type="text"
              value={this.state.firstName}
              placeholder="First Name"
              onChange={this.update("firstName")}
              className="login-input"
            />
          </label>
        <br/>
          <label className=''>Last Name
            <input
              type="text"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.update("lastName")}
              className="login-input"
            />
          </label>
        <br/>
          <label>Email Address
            <input
              type="text"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.update("email")}
              className="login-email"
            />
          </label>
        <br/>
          <label>Password
            <input
              type="password"
              placeholder="Password(min. 10 characters)"
              value={this.state.password}
              onChange={this.update("password")}
              className="login-password"
            />
            <button className="signup-button" type="submit">{this.props.formType}</button>
          </label>
        </form>
    </div>
  )}
}

export default SignupForm;