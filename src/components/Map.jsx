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
    type: undefined,
    transitMarkers: []
  };

  //going to get an id from the button which was clicked on on trail list
  updateTrailPubs(id) {
    //change to take id when trail list buttons work, for now set manually
    return axios
      .get(`https://tralebackend.herokuapp.com/api/routes/${1}`)
      .then(response => {
        //set state to type that we receive from backend once this is implemented, set manually for now
        this.setState({
          // trailId: this.props.routeId,
          trailPubs: response.data.route,
          type: 'TRANSIT'
        });
      })
      .then(() => {
        console.log(this.state.trailPubs, 'trail pubs in state');
      });
    // ^ setting state with the pubs for one trail
  }

  getLatLng(addressString) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: addressString }, (results, status) => {
      if (status === 'OK') {
        console.log(results[0].geometry.location);
        this.setState(currentState => {
          return {
            transitMarkers: [
              ...currentState.transitMarkers,
              results[0].geometry.location
            ]
          };
        });
      } else console.log(status);
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
      //if transit, dont put waypoints in directions renderer, put them in markers
      // console.log(origin, 'origin');
      console.log(waypoints, 'waypoints');
      // console.log(destination, 'destination');
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
    console.log(this.props, 'props');
    if (this.state.trailId !== 1) {
      this.updateTrailPubs(this.props.routeId).then(() => {
        this.updateDirectionsAndMap();
      });
    }
  }

  render() {
    const GoogleMapMain = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{
          lat: 53.4844482,
          lng: -2.064649
        }}
        defaultZoom={13}
      >
        <DirectionsRenderer
          directions={this.state.directions}
          // options={{ markerOptions: { label: 'Stalybridge buffet bar' } }}
        />
        {this.state.type === 'TRANSIT' && (
          <>
            {this.state.transitMarkers.map(LatLng => {
              return <Marker position={LatLng} />;
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
