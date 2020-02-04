import {
  IonTitle,
  IonPage,
  IonDatetime,
  IonItem,
  IonLabel,
  IonText,
  IonThumbnail,
  IonImg,
  IonToolbar,
  IonGrid,
  IonCol,
  IonRow,
  IonHeader
} from '@ionic/react';
import React from 'react';
import '../css/splashScreen.css';

const SplashScreen = () => {
  return (
    <IonGrid>
      <IonPage>
        <IonRow align-self-center>
          <IonCol class="Header">
            <h1>Welcome to trAle</h1>
          </IonCol>
        </IonRow>
        <IonRow align-self-center>
          <IonCol className="DateBox">
            <IonItem>
              <IonLabel>DD-MM-YY</IonLabel>
              <IonDatetime
                displayFormat="DD-MM-YY"
                placeholder="Date of birth"
              ></IonDatetime>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="DrinkAware">
            <IonItem>
              <IonText>Please drink responsibly</IonText>
              <IonThumbnail slot="start">
                <IonImg
                  className="Image"
                  src={
                    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.mNyoI3QekIM0CJIF_Y3o5QHaCA%26pid%3DApi&f=1'
                  }
                ></IonImg>
              </IonThumbnail>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonPage>
    </IonGrid>
  );
};

export default SplashScreen;
