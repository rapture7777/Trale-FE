/*global google*/
import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from 'react-google-maps';
import { IonPage, IonContent } from '@ionic/react';
import axios from 'axios';
import '../css/Map.css';

class Map extends Component {
  state = {
    directions: [],
    trailPubs: [],
    trailId: undefined
  };

  updateTrailPubs(id) {
    axios
      .get('https://tralebackend.herokuapp.com/api/routes')
      .then(response => {
        this.setState({ trailPubs: response.data.related_pubs });
      });
    // setting state with the pubs for one trail

    // hardcoded example location objects
    // const origin = { lat: 40.756795, lng: -73.954298 };
    // const waypoints = [{ location: new google.maps.LatLng(41.3, -75.95429) }];
    // const destination = { lat: 41.756795, lng: -78.954298 };
  }

  updateDirectionsAndMap() {
    const directionsService = new google.maps.DirectionsService();

    const origin = { lat: 40.756795, lng: -73.954298 };
    // origin will be geolocation received from GPS

    const waypoints = [];

    this.state.trailPubs.forEach(pub => {
      let thisPub = new google.maps.LatLng(pub.lat, pub.lng);
      waypoints.push({ location: thisPub });
    });
    // attempting to push a location object for each pub in state to

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

  componentDidMount() {
    if (this.state.trailId !== this.props.trailId)
      this.setState({ trailId: this.props.trailId }).then(
        this.updateTrailPubs(this.state.trailId)
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
