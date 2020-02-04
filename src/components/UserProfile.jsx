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

const UserProfile = props => {
  const { avatar, username, bio } = props.user;
  return (
    <IonPage>
      <IonGrid className="userProfile">
        <IonRow>
          <IonCol>
            <IonAvatar>
              <img src={avatar} alt="user avatar" />
            </IonAvatar>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>{username}</IonLabel>
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonItem>
            <ion-text>
              <p>{bio}</p>
            </ion-text>
          </IonItem>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonList>
              <IonListHeader>
                <IonLabel>In Progress Tralis</IonLabel>
              </IonListHeader>
              <IonItem>
                <p>This trail "name of trail" is currently in progress..</p>
              </IonItem>
              <IonProgressBar value={0.5}></IonProgressBar>
            </IonList>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonList>
              <IonListHeader>
                <IonLabel>Completed Trails</IonLabel>
              </IonListHeader>
              <IonItem>
                <p>"Username" has completed this trail</p>
              </IonItem>
              <IonProgressBar value={1}></IonProgressBar>

              <IonItem>
                <p>"Username" has completed this trail</p>
              </IonItem>
              <IonProgressBar value={1}></IonProgressBar>
            </IonList>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
};

export default UserProfile;
