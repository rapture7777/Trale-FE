import React from 'react';
import './css/App.css';
import SplashScreen from './components/splashScreen.jsx';
import { IonApp } from '@ionic/react';
import NavBar from './components/NavBar';
import './css/NavBar.css';

function App() {
  return (
    <IonApp className="app">
      {/* <SplashScreen className="splashScreen" /> */}
      <NavBar />
    </IonApp>
  );
}

export default App;
