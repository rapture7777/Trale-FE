import React from 'react';
import './css/App.css';
import splashScreen from './components/splashScreen.jsx';
import { IonApp } from '@ionic/react';
import NavBar from './components/NavBar';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

class App extends React.Component {
  componentDidMount() {
    Geolocation.watchPosition({}, (position, err) => {
      if (!err) {
        localStorage.setItem('lat', position.coords.latitude);
        localStorage.setItem('lng', position.coords.longitude);
      }
    });
  }

  render() {
    return (
      <IonApp>
        {/* <splashScreen /> */}
        <NavBar />
      </IonApp>
    );
  }
}

export default App;
