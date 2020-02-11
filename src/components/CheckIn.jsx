/*global google*/
import React, { Component } from 'react';
import { IonPage, IonButton } from '@ionic/react';
import { Geolocation } from '@capacitor/core';
import NoticeMsg from './NoticeMsg';
import { getReq } from '../utils/api';
import '../css/CheckIn.css';

class CheckIn extends Component {
  state = {
    position: {},
    nextDestination: {},
    allDestinations: {},
    gotRoute: false,
    gotCurrentLocation: false,
    distance: null,
    noticeMsg: '',
    noticeMsgDisplayed: false
  };

  getCurrentLocation = () => {
    console.log('getting current location');
    Geolocation.watchPosition({}, (position, err) => {
      if (position)
        this.setState({
          position: position.coords,
          gotCurrentLocation: true
        });
      if (err) console.log(err);
    });
  };

  getRoute = () => {
    const { routeId } = this.props;
    console.log('getting route');
    getReq(`https://tralebackend.herokuapp.com/api/routes/${routeId}`).then(
      ({ route }) => {
        console.log(route);
        this.setState(
          {
            allDestinations: route,
            nextDestination: route[0]
          },
          () => {
            this.setState({ gotRoute: true });
          }
        );
      }
    );
  };

  findDistance = () => {
    const { position, nextDestination } = this.state;
    const DistanceMatrix = new google.maps.DistanceMatrixService();
    DistanceMatrix.getDistanceMatrix(
      {
        origins: [
          new google.maps.LatLng(position.latitude, position.longitude)
        ],
        destinations: [
          new google.maps.LatLng(nextDestination.lat, nextDestination.lng)
        ],
        travelMode: 'WALKING'
      },
      ({ rows }) => {
        const distance = rows[0].elements[0].distance.value;
        this.setState({
          distance: distance,
          gotCurrentLocation: false,
          gotRoute: false
        });
      }
    );
  };

  handleCheckInButton = () => {
    const { distance } = this.state;
    if (distance <= 1000) {
      getReq('https://tralebackend.herokuapp.com/api/user_routes', {
        user_id: 1,
        routes_id: 2
      }).then(res => {
        this.setState({
          noticeMsg: 'You have been checked-in',
          noticeMsgDisplayed: true
        });
      });
    } else {
      this.setState({
        noticeMsg: 'You are so far from the pub!',
        noticeMsgDisplayed: true
      });
    }
  };

  componentDidMount() {
    this.getRoute();
    this.getCurrentLocation();
  }

  componentDidUpdate(prevProps, prevState) {
    const { gotCurrentLocation, gotRoute } = this.state;
    if (
      gotCurrentLocation !== prevState.gotCurrentLocation &&
      gotRoute !== prevState.gotRoute
    ) {
      this.findDistance();
    }
  }

  render() {
    const { noticeMsg, noticeMsgDisplayed } = this.state;
    return (
      <IonPage className="CheckIn-Page">
        <IonButton
          className="CheckIn-Button"
          onClick={() => {
            this.handleCheckInButton();
          }}
        >
          Check-in
        </IonButton>
        {noticeMsg && (
          <NoticeMsg
            msg={noticeMsg}
            header={'Checking-in'}
            button={'Okay!'}
            isDisplayed={noticeMsgDisplayed}
          />
        )}
      </IonPage>
    );
  }
}

export default CheckIn;
