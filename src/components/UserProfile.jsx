import React from 'react';
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
  IonCard,
  IonSpinner
} from '@ionic/react';
import { Authenticator } from 'aws-amplify-react';
import axios from 'axios';

class UserProfile extends React.Component {
  state = {
    loading: true,
    userTrails: []
  };

  componentDidMount = () => {
    this.fetchUserTrails();
  };

  fetchUserTrails = () => {
    const { id, username } = this.props;
    return axios
      .get(`https://tralebackend.herokuapp.com/api/user_routes/${id}`)
      .then(({ data }) => {
        this.setState({ userTrails: data, loading: false });
      });
  };

  render() {
    const { avatar, bio } = this.props.username;
    const { username } = this.props;
    const { userTrails, loading } = this.state;
    console.log(userTrails);
    return loading ? (
      <IonPage className="Loading-Page">
        <IonSpinner className="Loading-Spinner" name="lines" />
      </IonPage>
    ) : (
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
                    <IonLabel>In Progress Trails</IonLabel>
                  </IonListHeader>
                  {userTrails.filter(trail => trail.completed).length ? (
                    <IonItem>
                      <p>You have started any trails! Get choosing!</p>
                    </IonItem>
                  ) : (
                    userTrails.map(function(trail) {
                      if (!trail.completed) {
                        return (
                          <IonRow key={trail.id}>
                            <IonItem>
                              <p>{`The ${trail.route_name} is currently in progress..`}</p>
                            </IonItem>
                            <IonProgressBar value={0.25}></IonProgressBar>
                          </IonRow>
                        );
                      }
                    })
                  )}
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
                {!userTrails.filter(trail => trail.completed).length ? (
                  <IonItem>
                    <p>You have not completed any trails! Get drinking!</p>
                  </IonItem>
                ) : (
                  userTrails.map(function(trail) {
                    if (trail.completed) {
                      return (
                        <IonRow key={trail.id}>
                          <IonItem>
                            <p>{`The ${trail.route_name} is currently in progress..`}</p>
                          </IonItem>
                          <IonProgressBar value={1}></IonProgressBar>
                        </IonRow>
                      );
                    }
                  })
                )}
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonPage>
    );
  }
}

export default UserProfile;
