import React from "react";
import "./css/App.css";
import SplashScreen from "./components/SplashScreen.jsx";
import { IonApp } from "@ionic/react";

function App() {
  return (
    <IonApp className="app">
      <SplashScreen className="splashScreen" />
    </IonApp>
  );
}

export default App;
