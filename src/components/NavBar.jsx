import React, { Component } from "react";
import {
  IonRouterOutlet,
  IonTabBar,
  IonTabs,
  IonTabButton,
  IonLabel
} from "@ionic/react";
import { Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import Trails from "./Trails";
import Map from "./Map";
import UserProfile from "./UserProfile";
import "../css/NavBar.css";
import axios from "axios";

class NavBar extends Component {
  state = {
    trailList: [],
    selectedTrail: NaN,
    user: {}
  };

  componentDidMount = () => {
    return axios
      .get("https://tralebackend.herokuapp.com/api/users/1")
      .then(({ data: { user } }) => {
        this.setState({ user });
      });
  };

  render() {
    return (
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/components/Trails" component={Trails} exact={true} />
            <Route path="/components/Map" component={Map} exact={true} />
            <Route
              path="/components/UserProfile"
              render={() => <UserProfile user={this.state.user} />}
              exact={true}
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="trails" href="/components/Trails">
              <IonLabel>Trails</IonLabel>
            </IonTabButton>
            <IonTabButton tab="map" href="/components/Map">
              <IonLabel>Map</IonLabel>
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
