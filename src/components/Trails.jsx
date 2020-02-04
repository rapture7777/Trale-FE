import React from 'react';
import {
  IonPage,
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent
} from '@ionic/react';
import '../css/Trails.css';

const Trails = () => {
  return (
    <IonPage className="Trails-page">
      <IonContent className="Trails-Content">
        <h3 className="Title">Select a trail to see the route</h3>
        <IonCard className="Trail-Card" button="true">
          <IonCardHeader>
            <IonCardTitle>Transpennine Real Ale Trail</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            As featured on the BBC's Oz and James Drink to Britain, The
            Transpennine Real Ale Trail is a unique voyage to a selection of
            Yorkshire and Lancashires best real ale pubs - on a train! <br />
            <br />
            All the pubs are within a stones throw of their respective Railway
            Stations, so finding your way there (and back) couldn't be easier.
          </IonCardContent>
        </IonCard>
        <IonCard className="Trail-Card" button="true">
          <IonCardHeader>
            <IonCardTitle>Number 2 Real Ale Trail</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            As featured on the BBC's Oz and James Drink to Britain, The
            Transpennine Real Ale Trail is a unique voyage to a selection of
            Yorkshire and Lancashires best real ale pubs - on a train! <br />
            <br />
            All the pubs are within a stones throw of their respective Railway
            Stations, so finding your way there (and back) couldn't be easier.
          </IonCardContent>
        </IonCard>
        <IonCard className="Trail-Card" button="true">
          <IonCardHeader>
            <IonCardTitle>Number 3 Real Ale Trail</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            As featured on the BBC's Oz and James Drink to Britain, The
            Transpennine Real Ale Trail is a unique voyage to a selection of
            Yorkshire and Lancashires best real ale pubs - on a train! <br />
            <br />
            All the pubs are within a stones throw of their respective Railway
            Stations, so finding your way there (and back) couldn't be easier.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Trails;
