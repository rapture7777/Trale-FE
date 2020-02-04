import React, { Component } from "react";
import {
  IonTitle,
  IonPage,
  IonDatetime,
  IonItem,
  IonLabel,
  IonText,
  IonThumbnail,
  IonImg,
  IonAlert
} from "@ionic/react";
import "../css/splashScreen.css";
import { ageValidation } from "../utils";

class SplashScreen extends Component {
  state = { userVerified: 1 };

  handleDateChange = event => {
    const { value } = event.detail;
    if (value) {
      const validAge = ageValidation(value);
      this.setState({ userVerified: validAge });
    }
  };

  render() {
    return (
      <IonPage className="splashScreen">
        <IonTitle className="Header" size="large">
          Welcome to trAle
        </IonTitle>
        <IonItem className="age-verification">
          <IonLabel>DD-MM-YY</IonLabel>
          <IonDatetime
            value={""}
            onIonChange={event => this.handleDateChange(event)}
            displayFormat="DD-MM-YY"
            placeholder="Date of birth"
          ></IonDatetime>
        </IonItem>
        <IonItem className="Drink-responsibly">
          <IonText>Please drink responsibly</IonText>
          <IonThumbnail slot="start">
            <IonImg
              src={
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.mNyoI3QekIM0CJIF_Y3o5QHaCA%26pid%3DApi&f=1"
              }
            ></IonImg>
          </IonThumbnail>
        </IonItem>
        <IonItem>
          <IonAlert
            isOpen={!this.state.userVerified}
            header={"Age Restriction"}
            message={"You must be over 18 to use this app"}
            buttons={["I understand"]}
          ></IonAlert>
        </IonItem>
      </IonPage>
    );
  }
}

export default SplashScreen;
