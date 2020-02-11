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
const { Geolocation } = Plugins;

// hardcoded example location objects
// const origin = { lat: 40.756795, lng: -73.954298 };
// const waypoints = [{ location: new google.maps.LatLng(41.3, -75.95429) }];
// const destination = { lat: 41.756795, lng: -78.954298 };

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

  //going to get an id from the button which was clicked on on trail list
  updateTrailPubs(id) {
    //change to take id when trail list buttons work, for now set manually
    return axios
      .get(`https://tralebackend.herokuapp.com/api/routes/${id}`)
      .then(response => {
        //set state to type that we receive from backend once this is implemented
        this.setState({
          trailPubs: response.data.route,
          type: 'WALKING',
          trailId: id
        });
      });
    // ^ setting state with the pubs for one trail
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
      // probably best to do something if it cant recognise the pub name, implement
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
      //if we implement transit, then we can change as necessary
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
    Geolocation.watchPosition({}, (position, err) => {
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
    let defaultCenter = new google.maps.LatLng(
      userLocation.lat,
      userLocation.lng
    );
    // put user's geolocation in here when we have it

    const GoogleMapMain = withGoogleMap(() => (
      <GoogleMap defaultCenter={defaultCenter} defaultZoom={13}>
        <DirectionsRenderer
          directions={directions}
          // options={{ markerOptions: { label: 'Stalybridge buffet bar' } }}
          // can style the markers as above
        />
        <Marker position={userLocation} />
        {this.state.type === 'TRANSIT' && (
          <>
            {this.state.transitMarkers.map(LatLng => {
              return <Marker position={LatLng} />;
            })}
          </>
        )}
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
