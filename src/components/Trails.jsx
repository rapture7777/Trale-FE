import React, { Component } from 'react';
import {
  IonPage,
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent
} from '@ionic/react';
import '../css/Trails.css';
import * as utils from '../utils';
import { Link } from 'react-router-dom';

class Trails extends Component {
  state = {
    trails: [],
    isLoading: true
  };

  componentDidMount() {
    if (!this.state.trails.length) {
      utils.getTrails().then(routes => {
        this.setState({ trails: [...routes] });
      });
    }
  }

  render() {
    const { getRouteId } = this.props;
    return (
      <IonPage className="Trails-page">
        <IonContent>
          <h3 className="Title">Trails</h3>
          {this.state.trails.length &&
            this.state.trails.map(route => {
              return (
                <Link
                  to={{
                    pathname: `/components/Map/${route.id}`
                  }}
                >
                  <IonCard
                    className="Trail-Card"
                    button="true"
                    trailId={route.id}
                    onClick={() => {
                      getRouteId(route.id);
                    }}
                  >
                    <IonCardHeader>
                      <IonCardTitle>{route.route_name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>{route.description}</IonCardContent>
                  </IonCard>
                </Link>
              );
            })}
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
  }
}


export default Trails;
