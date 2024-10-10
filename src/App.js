import React from "react";
import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInSignUp from "./pages/sign-in-sign-up/sign-in-sign-up.component";

import { Switch, Route } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    //Subscriber -> Subscription listening to Auth -> Auth sends the authenticated object until it signed out***

    //Application listening to authentication state changes on the firebase backend
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //open subscription ---> User authentication session persistence
      //this.setState({ currentUser: user }); //user authenticated session persisted
      // createUserProfileDocument(user);
      // console.log(user);

      //Step 1 : when user signs in -
      if (userAuth) {
        //Step 2 : get the user ref from the createUserProfileDocument() with suerAuth object passed in
        const userRef = await createUserProfileDocument(userAuth); //to check if the database has updated at that reference with any new data

        //Step 4 : subscribe / listen to the obtained user ref and get the state of user data
        userRef.onSnapshot((snapshot) => {
          // console.log(snapshot);
          this.setState(
            {
              currentUser: {
                id: snapshot.id,
                ...snapshot.data(),
              },
            },
            () => console.log(this.state)
          );
        }); //the moment the user ref is instantiated, it will still send a snapshot object that representing the data taht is currently stored in the database
      } else {
        this.setState({ currentUser: userAuth });
      } //when current user is NULL
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); //unsubscribe to avoid memory leakage
  }

  //If you encounter 403:restricted_client Google Authorization error => Click on Learn More link in the popup
  // -> Google API console -> Crendentials -> OAuth Consent Screen tab -> Update Applicstion Name to project name
  // -> Click save -> Try logging into your verified Google account

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signIn" component={SignInSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;

//Switch component is an alternative for exact property in the Route component, but requires path to be in order
//<Switch></Switch  <--- <Route exact path='' component=''/>
