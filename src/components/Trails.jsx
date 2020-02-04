import React from 'react';
import {
  IonPage,
  IonToolbar,
  IonTitle,
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton
} from '@ionic/react';
import '../css/Trails.css';

const Trails = () => {
  return (
    <IonPage>
      <IonToolbar>
        <IonTitle>Trails</IonTitle>
      </IonToolbar>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Transpennine Real Ale Trail</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          Keep close to Nature's heart... and break clear away, once in awhile,
          and climb a mountain or spend a week in the woods. Wash your spirit
          clean.
        </IonCardContent>
        <IonButton>Select</IonButton>
      </IonCard>
    </IonPage>
  );
};

export default Trails;
