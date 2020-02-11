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
      lat: +localStorage.getItem('lat'),
      lng: +localStorage.getItem('lng')
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

  // handleCheckIn(pubId) {
  //   console.log('checked in');
  // }

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
      } else if (this.state.type === 'TRANSIT') {
        this.getLatLng(pub.pub_name);
      }
      //if we implement transit, then we can change as necessary
    });

    // let infoWindow1 = new google.maps.InfoWindow({
    //   content: 'hello',
    //   width: 200
    // });

    // let infoWindow1 =
    //   '<div class="venue_map_infowindow"><a class="location" ><h3>Hello</h3></a></div>';

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
          // this.forceUpdate();
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  componentDidMount() {
    if (this.state.trailId !== this.props.routeId) {
      this.updateTrailPubs(this.props.routeId).then(() => {
        this.updateDirectionsAndMap();
      });
    }
  }

  render() {
    let defaultCenter = {
      lat: 53.4844482,
      lng: -2.064649
    };
    // put user's geolocation in here when we have it

    //look into changing the events on the markers in directions renderer, you can edit the infowindows, but it seems they are auto updated on the marker's click so that they are filled with content about the place. the info window variable you create remains the info window that comes up, but the content is changed automatically

    const { userLocation, directions, loading } = this.state;

    let infoWindow1 = new google.maps.InfoWindow({
      content: <p>'hello'</p>,
      width: 200
    });

    console.log(infoWindow1, 'infowindow');

    const GoogleMapMain = withGoogleMap(() => (
      <GoogleMap
        onIdle={() => {
          google.maps.event.trigger(GoogleMap, 'resize');
          console.log('resize');
        }}
        defaultCenter={defaultCenter}
        defaultZoom={13}
      >
        <DirectionsRenderer
          directions={directions}
          options={{
            infoWindow: infoWindow1
          }}

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
