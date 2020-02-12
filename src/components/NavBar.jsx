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

class NavBar extends Component {
  state = {
    trailList: [],
    userTrails: [],
    routeId: null
  };

  getRouteId = routeId => {
    this.setState({ routeId: routeId }, () => {});
  };

  render() {
    const MapLoader = withScriptjs(() => (
      <Map routeId={this.state.routeId} userId={this.props.id} loading={true} />
    ));
    const { username, id } = this.props;
    const { userTrailsLoading } = this.state;
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
                    username={username}
                    id={id}
                    userTrails={this.state.userTrails}
                  />
                )}
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
