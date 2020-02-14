import React from 'react';
import { Link, Redirect} from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.demoEmail = "admin_kai___activated@ggez.com"
    this.demoPassword = "adminkaiyip"
    // this.demoLogin = this.demoLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  // demoLogin(){
  //   const adminE = this.demoEmail;
  //   const adminP = this.demoPassword;
  
  //   for (let i = 0; i < adminE.length; i++) {
  //     setTimeout(() => {
  //       this.setState({email:this.state.email + adminE[i]})
  //     }, (adminE.length * 60));
  //   }

  //   for (let k = 0; k < adminE.length; k++) {
  //     setTimeout(() => {
  //       this.setState({email:this.state.password + adminP[k]})
  //     }, (adminP.length * 60));
  //   }
    
  //   setTimeout(() => {
  //       this.props.action(this.state);
  //   }, (adminE.length * 60) + (adminP.length * 60) + 60);
  // }
    
  componentWillUnmount(){
      this.props.clearErrors();
  };
  
  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state)
    if (this.props.processForm(user)) {
      this.props.history.push("/profile")
    }
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
        <img className="login-img" src="https://cdn.robinhood.com/assets/generated_assets/94977d34f99015525dcd0fc9987fcbe6.png" />
        <div className="login-box">
          <h1 className="login-title">Welcome to Goblinhood</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-container">
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
            <br/>
             
              <button className="login-button" type="submit">{this.props.formType}</button>
            <ul>
              {this.props.errors.map((error, i) => (
                <li key={`error+${i}`}>
                  {error}
                </li>
              ))}
            </ul>
              <button className="demo-login" onClick={this.demoLogin} >Demo Login</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm;