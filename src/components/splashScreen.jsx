import React, { Component } from 'react';
import {
  IonPage,
  IonDatetime,
  IonItem,
  IonLabel,
  IonText,
  IonThumbnail,
  IonImg,
  IonGrid,
  IonCol,
  IonRow,
  IonAlert
} from '@ionic/react';
import '../css/splashScreen.css';
import * as utils from '../utils';
import NavBar from './NavBar';

class SplashScreen extends Component {
  state = { userVerified: 1 };

  handleDateChange = event => {
    const { value } = event.detail;
    if (value) {
      const validAge = utils.ageValidation(value);
      this.setState({ userVerified: validAge });
    }
  };

  render() {
    const { userVerified } = this.state;
    return userVerified === true ? (
      <IonPage>
        <NavBar />
      </IonPage>
    ) : (
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
                <IonLabel> Please enter your date of birth</IonLabel>
                <IonDatetime
                  value={''}
                  onIonChange={event => this.handleDateChange(event)}
                  displayFormat="DD-MM-YY"
                  placeholder="here"
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
                    src={
                      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.mNyoI3QekIM0CJIF_Y3o5QHaCA%26pid%3DApi&f=1'
                    }
                  ></IonImg>
                </IonThumbnail>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonAlert
            isOpen={!this.state.userVerified}
            header={'Age Restriction'}
            message={'You must be over 18 to use this app'}
            buttons={['I understand']}
          ></IonAlert>
        </IonPage>
      </IonGrid>
    );
  }
}

export default SplashScreen;
