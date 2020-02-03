import React from 'react';
import './css/App.css';
import { IonApp, IonContent, IonRouterOutlet } from '@ionic/react';
import NavBar from './components/NavBar';
import { Route, Redirect } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';

function App() {
  return (
    <IonApp>
      <NavBar />
    </IonApp>
  );
}

export default App;
