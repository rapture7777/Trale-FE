import React from "react";
import "./css/App.css";
// import SplashScreen from "./components/SplashScreen.jsx";
import { IonApp } from "@ionic/react";
// import NavBar from "./components/NavBar";
import CheckIn from "./components/CheckIn";

function App() {
  return (
    <IonApp>
      <CheckIn />
    </IonApp>
  );
}

export default App;
