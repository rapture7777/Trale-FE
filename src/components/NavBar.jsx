import React, { Component } from 'react';
import {
  IonRouterOutlet,
  IonTabBar,
  IonTabs,
  IonTabButton,
  IonLabel
} from '@ionic/react';
import { Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import Trails from './Trails';
import Map from './Map';
import Profile from './Profile';
import '../css/NavBar.css';
import { withScriptjs } from 'react-google-maps';
import apiKey from '../apiKey';

class NavBar extends Component {
  state = {
    trailList: [],
    selectedTrail: NaN
  };
  render() {
    const MapLoader = withScriptjs(Map);

    return (
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/components/Trails" component={Trails} exact={true} />
            <Route
              path="/components/Map"
              render={() => (
                <div>
                  <MapLoader
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
                    loadingElement={<div style={{ height: `100%` }} />}
                  />
                </div>
              )}
              exact={true}
            />
            <Route
              path="/components/Profile"
              component={Profile}
              exact={true}
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom" translucent="true" className="Tabs">
            <IonTabButton tab="trails" href="/components/Trails">
              <IonLabel>
                <b>Trails</b>
              </IonLabel>
            </IonTabButton>
            <IonTabButton tab="map" href="/components/Map">
              <IonLabel>
                <b>Map</b>
              </IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/components/Profile">
              <IonLabel>
                <b>Profile</b>
              </IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    );
  }
}

export default NavBar;
