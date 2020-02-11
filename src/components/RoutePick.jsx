import React, { Component } from "react";
import { IonPage, IonButton } from "@ionic/react";
import { postReq } from "../utils/postReq";

class RoutePick extends Component {
  state = {};

  handleClick = () => {
    const url = "https://tralebackend.herokuapp.com/api/user_routes";
    postReq(
      url,
      this.props.user_id,
      this.props.route_id,
      this.props.route_name
    ).then(res => {
      // show message
    });
  };

  render() {
    return (
      <IonPage>
        <IonButton onClick={() => this.handleClick()}>Select Route!</IonButton>
      </IonPage>
    );
  }
}

export default RoutePick;
