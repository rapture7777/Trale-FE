import React, { Component } from 'react';
import {
  IonRouterOutlet,
  IonTabBar,
  IonTabs,
  IonTabButton,
  IonLabel,
  IonContent
} from '@ionic/react';
import { Route, Switch } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import Trails from './Trails';
import Map from './Map';
import UserProfile from './UserProfile';
import '../css/NavBar.css';
import '../css/Map.css';
import { withScriptjs } from 'react-google-maps';
import apiKey from '../apiKey';
import axios from 'axios';

class NavBar extends Component {
  state = {
    trailList: [],
    selectedTrail: NaN,
    routeId: null,
    user: {}
  };

  getRouteId = routeId => {
    this.setState({ routeId: routeId }, () => {});
  };
  componentDidMount = () => {
    this.fetchUserById();
    this.fetchAllTrails();
  };

  fetchAllTrails = () => {
    return axios
      .get('https://tralebackend.herokuapp.com/api/routes')
      .then(({ data: { routes } }) => {
        this.setState({ selectedTrail: routes[0].route_name });
      });
  };

  fetchUserById = () => {
    return axios
      .get('https://tralebackend.herokuapp.com/api/users/1')
      .then(({ data: { user } }) => {
        this.setState({ user });
      });
  };

  render() {
    const MapLoader = withScriptjs(() => (
      <Map routeId={this.state.routeId} loading={true} />
    ));

    return (
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Switch>
              <Route
                path="/"
                render={() => <Trails getRouteId={this.getRouteId} />}
                exact={true}
              />
              <Route
                path="/components/Map/:routeId"
                render={() => (
                  <MapLoader
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
                    loadingElement={<IonContent className="Map-page" />}
                  />
                )}
                exact={true}
              />
              <Route
                path="/components/UserProfile"
                render={() => (
                  <UserProfile
                    user={this.state.user}
                    selectedTrail={this.state.selectedTrail}
                  />
                )}
                exact={true}
              />
            </Switch>
          </IonRouterOutlet>
          <IonTabBar slot="bottom" translucent="true" className="Tabs">
            <IonTabButton tab="trails" href="/">
              <IonLabel>
                <b>Trails</b>
              </IonLabel>
            </IonTabButton>
            <IonTabButton tab="map" href="/components/Map/*">
              <IonLabel>
                <b>Map</b>
              </IonLabel>
            </IonTabButton>

            <IonTabButton tab="profile" href="/components/UserProfile">
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    );
  }
}

export default NavBar;
