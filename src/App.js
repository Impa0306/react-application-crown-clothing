import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
    <Header />
    <Switch> 
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage} />
    </Switch>
    </div>
  );
}

export default App;


//Switch component is an alternative for exact property in the Route component, but requires path to be in order
//<Switch></Switch  <--- <Route exact path='' component=''/>