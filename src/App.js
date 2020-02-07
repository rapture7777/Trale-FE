import React from "react";
import "./css/App.css";
import SplashScreen from "./components/splashScreen.jsx";
import { IonApp } from "@ionic/react";
import NavBar from "./components/NavBar";
import Amplify from "aws-amplify";
import awsmobile from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";

Amplify.configure(awsmobile);

function App() {
  return (
    <IonApp>
      {/* <SplashScreen /> */}
      <NavBar />
    </IonApp>
  );
}

export default withAuthenticator(App, true);
