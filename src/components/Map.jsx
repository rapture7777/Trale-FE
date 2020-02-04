/*global google*/
import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from 'react-google-maps';
import { IonContent, IonPage } from '@ionic/react';
import '../css/Map.css';

class Map extends Component {
  state = {
    directions: []
  };

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();

    const origin = { lat: 40.756795, lng: -73.954298 };
    const waypoints = [{ location: new google.maps.LatLng(41.3, -75.95429) }];
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
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    const GoogleMapMain = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
        defaultZoom={13}
      >
        <DirectionsRenderer directions={this.state.directions} />
      </GoogleMap>
    ));

    return (
      <IonPage>
        <GoogleMapMain
          containerElement={<IonContent className="Map" />}
          mapElement={<IonContent className="Content" />}
        />
      </IonPage>
    );
  }
}

export default Map;
