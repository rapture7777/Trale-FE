import React, { Component } from "react";
import { IonPage, IonContent, IonButton } from "@ionic/react";
import { postReq } from "../utils/postReq";

class RoutePick extends Component {
  state = {};

  handleClick = () => {
    const url = "https://tralebackend.herokuapp.com/api/user_routes";
    postReq(url, this.props.user_id, this.props.route_id).then(res => {});
  };

  render() {
    return (
      <IonButton onClick={() => this.handleClick()} color="primary">
        Select Route!
      </IonButton>
    );
  }
}

export default RoutePick;
