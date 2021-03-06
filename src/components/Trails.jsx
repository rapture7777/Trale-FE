import React, { Component } from 'react';
import {
  IonPage,
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonSpinner
} from '@ionic/react';
import '../css/Trails.css';
import * as utils from '../utils';
import { Link } from 'react-router-dom';

class Trails extends Component {
  state = {
    trails: [],
    loading: true
  };

  componentDidMount() {
    if (!this.state.trails.length) {
      utils.getTrails().then(routes => {
        this.setState({ trails: [...routes], loading: false });
      });
    }
  }

  render() {
    const { getRouteId } = this.props;
    const { loading } = this.state;
    return loading ? (
      <IonPage className="Loading-Page">
        <IonSpinner className="Loading-Spinner" name="lines" />
      </IonPage>
    ) : (
      <IonPage className="Trails-page">
        <IonContent className="Trails-Content">
          <h3 className="Title">TrAles</h3>
          {this.state.trails.length &&
            this.state.trails.map(route => {
              return (
                <Link
                  key={route.id}
                  to={{
                    pathname: `/components/Map/${route.id}`
                  }}
                  className="Card-Link"
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
                      <IonCardTitle className="Card-Name">
                        {route.route_name}
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="Card-Description">
                      {route.route_description}
                    </IonCardContent>
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
