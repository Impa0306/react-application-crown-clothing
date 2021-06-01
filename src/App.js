import React from 'react';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUp from './pages/sign-in-sign-up/sign-in-sign-up.component';

import { Switch, Route } from "react-router-dom";
import { auth } from './firebase/firebase.utils';

class App extends React.Component {
constructor() {
  super();

  this.state = {
    currentUser: null
  }
}

unsubscribeFromAuth = null;

componentDidMount() {
  //Application listening to authentication state changes on the firebase backend
  auth.onAuthStateChanged(user => { //open subscription
    this.setState({ currentUser: user });

    //console.log(user);
  })
}

componentWillUnmount() { 
  this.unsubscribeFromAuth() //unsubscribe to avoid memory leakage
}

  render () {
    return (
      <div>
      <Header currentUser={this.state.currentUser}/>
      <Switch> 
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signIn' component={SignInSignUp} />
      </Switch>
      </div>
    );
  }
}


export default App;


//Switch component is an alternative for exact property in the Route component, but requires path to be in order
//<Switch></Switch  <--- <Route exact path='' component=''/>