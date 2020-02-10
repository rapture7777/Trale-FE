import React, { Component } from "react";
import "./css/App.css";
import SplashScreen from "./components/splashScreen.jsx";
import { IonApp, IonPage } from "@ionic/react";
import NavBar from "./components/NavBar";
import Amplify from "aws-amplify";
import awsmobile from "./aws-exports";

//import { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
//import { CognitoUser } from "@aws-amplify/auth";
//import { CognitoUser } from "aws-amplify-react/dist/Auth";

Amplify.configure(awsmobile);

class App extends Component {
  state = {
    username: null
  };

  render() {
    return (
      <IonApp>
        {/* <SplashScreen /> */}
        <NavBar />
      </IonApp>
    );
  }
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ["phone_number"],
    signUpFields: [
      //{ label: "username", key: "username", required: true, type: "string" },
      {
        label: "Date of Birth",
        key: "birthdate",
        required: true,
        type: "date"
      }
    ]
  }
});
