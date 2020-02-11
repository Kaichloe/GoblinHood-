import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state)
    this.props.processForm(user);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }
  render() {
    return (
      <div>
        <h1 className="login_title">Welcome to Goblinhood</h1>
        <form>
          <label>Email Address
            <input
              type="text"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.update("email")}
              className="login-email"
            />
          </label>
          <br />
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
    )
  }
}

export default LoginForm;