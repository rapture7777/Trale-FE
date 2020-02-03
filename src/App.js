import React from "react";
import "./css/App.css";
import SplashScreen from "./components/splashScreen.jsx";
import { IonApp } from "@ionic/react";

function App() {
  return (
    <IonApp className="app">
      <SplashScreen className="splashScreen" />
    </IonApp>
  );
}

export default App;
