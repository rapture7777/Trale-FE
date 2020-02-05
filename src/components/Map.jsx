/*global google*/
import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker
} from 'react-google-maps';
import { IonPage, IonContent } from '@ionic/react';
import axios from 'axios';
import '../css/Map.css';

// hardcoded example location objects
// const origin = { lat: 40.756795, lng: -73.954298 };
// const waypoints = [{ location: new google.maps.LatLng(41.3, -75.95429) }];
// const destination = { lat: 41.756795, lng: -78.954298 };

class Map extends Component {
  state = {
    directions: [],
    trailPubs: [],
    trailId: undefined,
    type: undefined
  };

  //going to get an id from the button which was clicked on on trail list
  updateTrailPubs(id) {
    //change to take id when trail list buttons work, for now set manually
    return axios
      .get(`https://tralebackend.herokuapp.com/api/routes/1`)
      .then(response => {
        console.log(response.data.route, 'response data route after api call');
        //set state to type that we receive from backend once this is implemented, set manually for now
        this.setState({
          trailId: 1,
          trailPubs: response.data.route,
          type: 'WALKING'
        });
      });
    // ^ setting state with the pubs for one trail
  }

  updateDirectionsAndMap() {
    const directionsService = new google.maps.DirectionsService();

    const origin = {
      // lat: this.state.trailPubs[0].lat,
      // lng: this.state.trailPubs[0].lat
    };
    // origin will be geolocation received from GPS

    const destination = {
      // lat: this.state.trailPubs[trailPubs.length - 1].lat,
      // lng: this.state.trailPubs[trailPubs.length -1].lng
    };

    const waypoints = [];

    this.state.trailPubs.forEach((pub, index) => {
      // let thisPub = new google.maps.LatLng(pub.lat, pub.lng);
      if (index === 0) {
        origin.lat = this.state.trailPubs[0].lat;
        origin.lng = this.state.trailPubs[0].lng;
      } else if (index === this.state.trailPubs.length - 1) {
        destination.lat = this.state.trailPubs[
          this.state.trailPubs.length - 1
        ].lat;
        destination.lng = this.state.trailPubs[
          this.state.trailPubs.length - 1
        ].lng;
      } else {
        if (this.state.type === 'WALKING') {
          waypoints.push({
            location: new google.maps.LatLng(pub.lat, pub.lng)
          });
        }
        //if transit, take out waypoints from directions renderer, put them in markers
      }
      console.log(origin, 'origin');
      console.log(waypoints, 'waypoints');
      console.log(destination, 'destination');
    });
    // attempting to push a location object for each pub in state to

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode[this.state.type],
        waypoints: waypoints
      },
      (result, status) => {
        console.log(result, status, 'result and status');
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
    if (this.state.trailId !== 1) {
      this.updateTrailPubs(this.state.trailId).then(() => {
        this.updateDirectionsAndMap();
      });
    }
  }

  render() {
    const GoogleMapMain = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 53.4844482, lng: -2.064649 }}
        defaultZoom={13}
      >
        <DirectionsRenderer directions={this.state.directions} />
        {this.state.type === 'TRANSIT' && (
          <>
            {this.state.trailPubs.map((pub, index) => {
              if (index !== 0 && index !== this.state.trailPubs.length - 1) {
                return <Marker position={{ lat: pub.lat, lng: pub.lng }} />;
              }
            })}
          </>
        )}
      </GoogleMap>
    ));

    return (
      <IonPage className="Map-page">
        <GoogleMapMain
          containerElement={<IonContent className="Map" />}
          mapElement={<IonContent className="Content" />}
        />
      </IonPage>
    );
  }
}

export default Map;
