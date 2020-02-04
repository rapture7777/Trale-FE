import React from "react";
import {
  IonAvatar,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
  IonCol,
  IonPage,
  IonListHeader,
  IonList,
  IonProgressBar
} from "@ionic/react";

const UserProfile = () => {
  return (
    <IonPage>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonAvatar>
              <img
                src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
                alt="user avatar"
              />
            </IonAvatar>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>username</IonLabel>
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonItem>
            <ion-text>
              <p>
                This is where the user can enter their personal bio. What ales
                they like festivals visited etc...
              </p>
            </ion-text>
          </IonItem>
        </IonRow>

        <IonRow>
          <IonList>
            <IonListHeader>
              <IonLabel>In Progress Tralis</IonLabel>
            </IonListHeader>
            <IonItem>
              <p>This trail "name of trail" is currently in progress..</p>
            </IonItem>
            <IonProgressBar value={0.5}></IonProgressBar>
          </IonList>
        </IonRow>

        <IonRow>
          <IonList>
            <IonListHeader>
              <IonLabel>Completed Trails</IonLabel>
            </IonListHeader>
            <IonItem>
              <p>
                "Username" has completed this trail this is some longer text
              </p>
            </IonItem>
            <IonProgressBar value={1}></IonProgressBar>
          </IonList>
          <IonItem>
            <p>"Username" has completed this trail</p>
          </IonItem>
          <IonProgressBar value={1}></IonProgressBar>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
};

export default UserProfile;
