import React, { Component } from 'react';
import {
  IonRouterOutlet,
  IonTabBar,
  IonTabs,
  IonTabButton,
  IonLabel
} from '@ionic/react';
import { Route, Switch } from 'react-router-dom';
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
    selectedTrail: NaN,
    routeId: null
  };

  getRouteId = routeId => {
    this.setState({ routeId: routeId }, () => {});
  };

  render() {
    const MapLoader = withScriptjs(() => <Map routeId={this.state.routeId} />);

    return (
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Switch>
              <Route
                path="/components/Trails"
                render={() => <Trails getRouteId={this.getRouteId} />}
                exact={true}
              />
              <Route
                path="/components/Map/:routeId"
                render={() => (
                  <MapLoader
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    routeId={this.props.routeId}
                  />
                )}
              />
              <Route
                path="/components/Profile"
                component={Profile}
                exact={true}
              />
            </Switch>
          </IonRouterOutlet>
          <IonTabBar slot="bottom" translucent="true">
            <IonTabButton tab="trails" href="/components/Trails">
              <IonLabel>Trails</IonLabel>
            </IonTabButton>
            <IonTabButton tab="map" href="/components/Map">
              <IonLabel>Map</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/components/Profile">
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    );
  }
}

export default NavBar;
