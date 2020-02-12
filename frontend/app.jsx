import React from 'react'
import SignUpFormContainer from './components/signup/signup_form_container'
import LoginFormContainer from './components/login/login_form_container'
import { Route } from 'react-router-dom';
import Homepage from './components/homepage';

const App = () => (
  <div>
      <Route exact path="/" component={Homepage}/> 
      <Route exact path="/signup" component={SignUpFormContainer}/> 
      <Route exact path="/login" component={LoginFormContainer}/>
  </div>
);

export default App;