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
import React from "react";

const SplashScreen = () => {
  return (
    <IonPage>
      <IonTitle size="large">Welcome to trAle</IonTitle>
      <IonItem>
        <IonLabel>DD-MM-YY</IonLabel>
        <IonDatetime
          displayFormat="DD-MM-YY"
          placeholder="Date of birth"
        ></IonDatetime>
      </IonItem>
      <IonItem>
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
};

export default SplashScreen;
