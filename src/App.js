import React from "react";
import RoutePick from "./components/RoutePick";

import "./css/App.css";
// import SplashScreen from "./components/splashScreen.jsx";
import NavBar from "./components/NavBar";
import { IonApp } from "@ionic/react";
import { Plugins } from "@capacitor/core";
const { Geolocation } = Plugins;

class App extends React.Component {
  componentDidMount() {
    Geolocation.watchPosition({}, (position, err) => {
      if (!err) {
        localStorage.setItem("lat", position.coords.latitude);
        localStorage.setItem("lng", position.coords.longitude);
      }
    });
  }

  render() {
    return (
      <IonApp>
        <RoutePick />
      </IonApp>
    );
  }
}

export default App;
