import React from 'react';

class SignupForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      buying_power: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state)
    this.props.processForm(user).then(() => this.props.history.push("/profile"))
  }

  update(field) {
    if (field === "email") {
      return e => this.setState({
        [field]: e.currentTarget.value.toLowerCase()
      })
    } else {
      return e => this.setState({
        [field]: e.currentTarget.value
      });
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  };

  render(){
    return (
    <div className='signup-container'>
      <div className="signup-border">
        <h1 className="signup-title">Make Your Money Move</h1>
        <h2 className="signup-subtitle">Goblinhood lets you invest in companies you love, muggle-free.</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="name-container">
              <label className='fname'>
              <input 
                required
                type="text"
                value={this.state.first_name}
                placeholder="First Name"
                onChange={this.update("first_name")}
                className="signup-input"
              />
          </label>
            <label className="lname">
              <input
                required
                type="text"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.update("last_name")}
                className="signup-input"
              />
            </label>
          </div>
        <br/>
          <label className="signup-email">
            <input
              required
              className="email-input"
              type="email"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.update("email")}
              className="login-email"
            />
          </label>
        <br/>
          <label>
            <input
              required
              type="password"
              placeholder="Password (min. 10 characters)"
              value={this.state.password}
              onChange={this.update("password")}
              className="login-password"
            />
          </label> 
        <br/>
          <label>
            <input
              required 
              type="number"
              placeholder="Initial Investment"
              value={this.state.buying_power}
              onChange={this.update("buying_power")}
              className="login-buying-power"
            />
          </label> 
          <br/> 
          <ul className="signup-errors">
              {this.props.errors.map((error, i) => (
                <li key={`error+${i}`}>
                  {error}
                </li>
              ))}
            </ul>
          <button className="signup-button" type="submit">{this.props.formType}</button>
          <br/>
            <div className="signup-footer">
              <label className="text">Already Started?</label>
              <button className="redirect-signup" onClick={()=> this.props.history.push("/login")}>Log in to complete your application</button>
            </div>
        </form>
      </div>
    </div>
  )}
}

export default SignupForm;