import React from "react";
import "./css/App.css";
import SplashScreen from "./components/SplashScreen.jsx";
import { IonApp } from "@ionic/react";
import NavBar from './components/NavBar';

function App() {
  return (
    <IonApp>
      <SplashScreen />
      {/* <NavBar /> */}
    </IonApp>
  );
}

export default App;
