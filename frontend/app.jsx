import React from 'react'
import SignUpFormContainer from './components/signup/signup_form_container'
import LoginFormContainer from './components/login/login_form_container'
import { Route, Switch } from 'react-router-dom';
import Homepage from './components/homepage';
import { AuthRoute, ProtectedRoute } from './util/route_util';
import ProfileContainer from './components/profile/profile_container';
import StockShow from './components/company/stock_show';

const App = () => {
  return (
    <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <AuthRoute exact path="/login" component={LoginFormContainer}/>
          <AuthRoute exact path="/signup" component={SignUpFormContainer}/> 
          <ProtectedRoute exact path="/profile" component={ProfileContainer}/>
          <ProtectedRoute path="/profile/stocks/:symbol" component={StockShow} />
        </Switch>
    </div>
  )
};

export default App;
