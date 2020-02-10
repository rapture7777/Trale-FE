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
  IonProgressBar,
  IonCard
} from "@ionic/react";
import { Authenticator } from "aws-amplify-react";

const UserProfile = props => {
  const { avatar, username, bio } = props.user;
  const { selectedTrail } = props;
  return (
    <IonPage>
      <Authenticator authState="signIn" />
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
            <IonCard>
              <IonList>
                <IonListHeader>
                  <IonLabel>In Progress Tralis</IonLabel>
                </IonListHeader>
                <IonItem>
                  <p>{`The ${selectedTrail} is currently in progress..`}</p>
                </IonItem>
                <IonProgressBar value={0.5}></IonProgressBar>
              </IonList>
            </IonCard>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonCard>
              <IonListHeader>
                <IonLabel>Completed Trails</IonLabel>
              </IonListHeader>
              <IonItem>
                <p>{`${username} has completed "trail name" `}</p>
              </IonItem>
              <IonProgressBar value={1}></IonProgressBar>
            </IonCard>

            <IonCard>
              <IonItem>
                <p>{`${username} has completed "trail name" `}</p>
              </IonItem>
              <IonProgressBar value={1}></IonProgressBar>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
};

export default UserProfile;
