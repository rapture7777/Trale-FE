import React from "react";
import "./css/App.css";
// import SplashScreen from './components/splashScreen.jsx';
import CheckIn from "./components/CheckIn";
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
        <CheckIn />
      </IonApp>
    );
  }
}

export default App;
