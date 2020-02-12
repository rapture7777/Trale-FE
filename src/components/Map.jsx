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
import CheckIn from './CheckIn';
import RoutePick from './RoutePick';

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

  setNamesAndLocations(result) {
    result.routes[0].legs.forEach((leg, legIndex) => {
      if (legIndex === result.routes[0].legs.length - 1) {
        //edit end address
        result.routes[0].legs[
          legIndex
        ].end_address = `<div class="venue_map_infowindow"><h3>${
          this.state.trailPubs[legIndex + 1].pub_name
        }</h3><p>${
          this.state.trailPubs[legIndex + 1].pub_description
        }<p/></div>`;
      }
      result.routes[0].legs[
        legIndex
      ].start_address = `<div class="venue_map_infowindow" id=${this.state.trailPubs[legIndex].id}><h3>${this.state.trailPubs[legIndex].pub_name}</h3><p>${this.state.trailPubs[legIndex].pub_description}<p/>
      </div>`;
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
          console.log(this.state);
          console.log(result, 'directions result');

          this.setNamesAndLocations(result);
          //make it do it for all of them

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
    const { routeId, userId } = this.props;
    let defaultCenter = new google.maps.LatLng(
      userLocation.lat,
      userLocation.lng
    );

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
        <CheckIn routeId={routeId} userId={userId} />
        {/* <RoutePick userId={userId} routeId={routeId} /> */}
      </IonPage>
    );
  }
}

export default Map;
