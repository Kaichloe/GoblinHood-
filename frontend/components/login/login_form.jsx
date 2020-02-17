import React from 'react';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.demoEmail = "admin_status_activated__welcome__back__admin_kai@wedabest.com";
    this.demoPassword = "adminkaiyipisbackbaby";
    this.demoLogin = this.demoLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  demoLogin() {
    const email = this.demoEmail;
    const password = this.demoPassword;
    const Speed = 80;
    for (let i = 0; i < email.length; i++) {
      setTimeout(() => {
        this.setState({ email: this.state.email + email[i] });
      }, i * Speed);
    }
    for (let k = 0; k < password.length; k++) {
      setTimeout(() => {
        this.setState({ password: this.state.password + password[k] });
      }, (email.length * Speed) + k * Speed);
    }
    setTimeout(() => {
      this.props.processForm(this.state).then(() => this.props.history.push("/profile"));
    }, (email.length * Speed) + (password.length * Speed) + Speed);
  }

  componentWillUnmount(){
      this.props.clearErrors();
  };
  
  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state)
    this.props.processForm(user).then(()=> this.props.history.push("/profile"))
  }

  update(field) {
    if (field === "email"){
      return e => this.setState({
        [field]: e.currentTarget.value.toLowerCase()
      })
    } else {
      return e => this.setState({
        [field]: e.currentTarget.value
      });
    }
  }

  render() {
    return (
      <div className="login-container">
        <div className="img-container">
          <img className="login-img" src={window.login_img} />
        </div>
        <div className="big-box">
          <div className="first-box"></div>
          <div className="second-box">

          <div className="input-container">
          <h1 className="login-title">Welcome to Goblinhood</h1>

          <form onSubmit={this.handleSubmit}>
              <label className="label">Email Address</label>
                <input
                  required 
                  type="email"
                  value={this.state.email}
                  onChange={this.update("email")}
                  className="login-input"
                />

            <br/>
              <label className="label">Password</label>
                <input
                  required
                  type="password"
                  value={this.state.password}
                  onChange={this.update("password")}
                  className="login-input"
                />
                <ul className="login-errors">
                  {this.props.errors.map((error, i) => (
                    <div>
                      <li key={`error+${i}`}>
                        {error}
                      </li>
                    </div>
                  ))}
                </ul>

            <br/>
              <button className="login-button" type="submit">{this.props.formType}</button>
            <br/>
              </form>
              <button className="demo-login" onClick={this.demoLogin}>Demo Login
          </button>
            </div>
            <div className="half-box"></div>
        </div>
        <div className="third-box"></div>
        </div>
      </div>
    )
  }
}

export default LoginForm;