/*global google*/
import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker
} from 'react-google-maps';
import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import '../css/Map.css';

class Map extends Component {
  state = {
    directions: [],
    origin: {},
    userLocation: {
      lat: +localStorage.getItem('lat'),
      lng: +localStorage.getItem('lng')
    },
    loading: this.props.loading
  };

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();
    const origin = { lat: 40.756795, lng: -73.954298 };
    const waypoints = [{ location: { lat: 41.3, lng: -75.95429 } }];
    const destination = { lat: 41.756795, lng: -78.954298 };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING,
        waypoints: waypoints
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            loading: false,
            origin: origin,
            directions: result
          });
          this.forceUpdate();
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    const { userLocation, directions, loading } = this.state;
    const GoogleMapMain = withGoogleMap(() => (
      <GoogleMap
        onIdle={() => {
          google.maps.event.trigger(GoogleMap, 'resize');
          console.log('resize');
        }}
        defaultCenter={directions.origin}
        zoom={8}
      >
        <DirectionsRenderer directions={directions} />
        <Marker position={userLocation} />
      </GoogleMap>
    ));

    return loading ? (
      <IonPage className="Loading-Page">
        <IonSpinner className="Loading-Spinner" name="lines" />
      </IonPage>
    ) : (
      <IonPage className="Map-page" style={{ visibility: 'visible' }}>
        <GoogleMapMain
          containerElement={
            <IonContent className="Map" style={{ visibility: 'visible' }} />
          }
          mapElement={
            <IonContent
              className="Map-Content"
              style={{ visibility: 'visible' }}
            />
          }
        />
      </IonPage>
    );
  }
}

export default Map;
