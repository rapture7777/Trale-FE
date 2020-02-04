import React, { Component } from "react";
import {
  IonTitle,
  IonPage,
  IonDatetime,
  IonItem,
  IonLabel,
  IonText,
  IonThumbnail,
  IonImg
} from "@ionic/react";
import "../css/splashScreen.css";

class SplashScreen extends Component {
  state = { userVerified: 0 };

  handleDateChange = event => {
    event.preventDefault();
    const { value } = event.detail;

    if (value) {
      let dateNow = new Date(value).toISOString();
      let inputInMilliseconds = Date.parse(dateNow);
      const eighteenYearsInMilliseconds = 567993600000;
      let millisecondsNow = Date.now();
      const eighteenYearsAgo = millisecondsNow - eighteenYearsInMilliseconds;

      if (eighteenYearsAgo > inputInMilliseconds) {
        this.setState({ userVerified: true });
      } else {
        this.setState({ userVerified: false });
      }
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
      </IonPage>
    );
  }
}

export default SplashScreen;
