/*global google*/
import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker
} from 'react-google-maps';
import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import axios from 'axios';
import '../css/Map.css';
import { Plugins } from '@capacitor/core';

class Map extends Component {
  state = {
    directions: [],
    trailPubs: [],
    trailId: undefined,
    type: undefined,
    transitMarkers: [],
    origin: {},
    userLocation: {
      lat: '',
      lng: ''
    },
    loading: this.props.loading
  };

  updateTrailPubs(id) {
    return axios
      .get(`https://tralebackend.herokuapp.com/api/routes/${id}`)
      .then(response => {
        this.setState({
          trailPubs: response.data.route,
          type: 'WALKING',
          trailId: id
        });
      });
  }

  getLatLng(addressString) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: addressString }, (results, status) => {
      if (status === 'OK') {
        this.setState(currentState => {
          return {
            transitMarkers: [
              ...currentState.transitMarkers,
              results[0].geometry.location
            ]
          };
        });
      } else console.error(`error fetching directions ${results}`);
    });
  }

  updateDirectionsAndMap() {
    const directionsService = new google.maps.DirectionsService();
    let origin = '';
    let destination = '';
    const waypoints = [];
    this.state.trailPubs.forEach((pub, index) => {
      if (index === 0) {
        origin = pub.pub_name;
      } else if (index === this.state.trailPubs.length - 1) {
        destination = pub.pub_name;
      } else if (this.state.type === 'WALKING') {
        waypoints.push({ location: pub.pub_name });
      } else if (this.state.type === 'TRANSIT') {
        this.getLatLng(pub.pub_name);
      }
    });

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode[this.state.type],
        waypoints: waypoints
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            loading: false,
            origin: origin,
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  componentDidMount() {
    const { Geolocation } = Plugins;
    Geolocation.getCurrentPosition({}, (position, err) => {
      if (!err) {
        this.setState({
          userLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      } else {
        console.log(err);
      }
    });
    if (
      this.state.trailId !== this.props.routeId &&
      this.props.routeId !== null
    ) {
      this.updateTrailPubs(this.props.routeId).then(() => {
        this.updateDirectionsAndMap();
      });
    }
  }

  render() {
    const { userLocation, directions, loading } = this.state;
    const { routeId } = this.props;
    let defaultCenter = new google.maps.LatLng(51.4466, -1.476454);

    const GoogleMapMain = withGoogleMap(() => (
      <GoogleMap defaultCenter={defaultCenter} defaultZoom={13}>
        <DirectionsRenderer directions={directions} />
        <Marker position={defaultCenter} />
      </GoogleMap>
    ));

    return loading ? (
      <IonPage className="Loading-Page">
        {routeId ? (
          <IonSpinner className="Loading-Spinner" name="lines" />
        ) : (
          <h3 className="Loading-Text">Please select a trail...</h3>
        )}
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
