import React from 'react'
import SignUpFormContainer from './components/signup/signup_form_container'
import LoginFormContainer from './components/login/login_form_container'
import { Route, Switch } from 'react-router-dom';
import Splash from './splash/splash';
import Nav from './splash/nav';
// import Signup from './components/signup/signup_form';
// import SignupForm from './components/signup/signup_form';
// import LoginForm from './components/login/login_form';

const App = () => (
  <div>
    <header>
      <Route exact path="/" component={Nav}/> 
      <Route exact path="/"component={Splash}/> 
    </header>
    <Route exact path="/signup" component={SignUpFormContainer} />
    <Route exact path="/login" component={LoginFormContainer} />
  </div>
  
    // <div>
    //   <LoginForm/>
    // </div>
  
)

export default App;