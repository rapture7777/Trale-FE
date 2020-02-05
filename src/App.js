import React from 'react';
import './css/App.css';
import splashScreen from './components/splashScreen.jsx';
import { IonApp } from '@ionic/react';
import NavBar from './components/NavBar';

function App() {
  return (
    <IonApp>
      {/* <SplashScreen /> */}
      <NavBar />
    </IonApp>
  );
}

export default App;
