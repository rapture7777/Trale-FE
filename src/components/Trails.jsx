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
        </IonContent>
      </IonPage>
    );
  }
}

export default Trails;
