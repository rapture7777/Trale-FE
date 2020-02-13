/*global google*/
import React, { Component } from 'react';
import { IonPage, IonButton } from '@ionic/react';
import { Geolocation } from '@capacitor/core';
import NoticeMsg from './NoticeMsg';
import { getReq } from '../utils/api';
import '../css/CheckIn.css';
import axios from 'axios';

class CheckIn extends Component {
  state = {
    position: {},
    routeIndex: 0,
    nextDestination: {},
    allDestinations: {},
    gotRoute: false,
    gotCurrentLocation: false,
    distance: null,
    noticeMsg: '',
    noticeMsgDisplayed: false
  };

  async getCurrentLocation() {
    console.log('getting current location');
    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true
    });
    if (position)
      this.setState(
        {
          position: position.coords,
          gotCurrentLocation: true
        },
        () => console.log(this.state.position, 'Current Position')
      );
  }

  getRoute = () => {
    const { routeId } = this.props;
    const { routeIndex } = this.state;
    console.log('getting route');
    getReq(`https://tralebackend.herokuapp.com/api/routes/${routeId}`).then(
      ({ route }) => {
        console.log(route);
        this.setState(
          {
            allDestinations: route,
            nextDestination: route[routeIndex]
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
        console.log(rows);
        const distance = rows[0].elements[0].distance.value;
        this.setState(
          {
            distance: distance,
            gotCurrentLocation: false
          },
          () => console.log(this.state.distance, 'Distance')
        );
      }
    );
  };

  patchProgress = () => {
    const { userId, routeId } = this.props;
    axios
      .put(`https://tralebackend.herokuapp.com/api/user_routes`, {
        routes_id: routeId,
        user_id: userId,
        inc_progress: 1
      })
      .then(({ data: { updatedUserRoutes: { progress } } }) =>
        console.log(progress, 'progress')
      );
  };

  handleCheckInButton = () => {
    this.getCurrentLocation();
    const { distance, nextDestination } = this.state;
    if (distance <= 200) {
      this.props.addCompletedPub(nextDestination);
      this.setState(
        currentState => {
          return {
            noticeMsg: `You've arrived at ${nextDestination.pub_name}`,
            noticeMsgDisplayed: true,
            routeIndex: currentState.routeIndex + 1,
            nextDestination:
              currentState.allDestinations[currentState.routeIndex + 1]
          };
        },
        () => {
          this.patchProgress();
        }
      );
    } else {
      this.setState({
        noticeMsg: `You are too far from ${nextDestination.pub_name}!`,
        noticeMsgDisplayed: true
      });
    }
  };

  componentDidMount() {
    this.getRoute();
    this.getCurrentLocation();
    this.interval = setInterval(() => this.getCurrentLocation(), 60000);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      gotCurrentLocation,
      gotRoute,
      routeIndex,
      allDestinations
    } = this.state;
    if (gotCurrentLocation && gotRoute && routeIndex < allDestinations.length) {
      this.findDistance();
    }
  }

  completedTrail = () => {
    const { userId, routeId } = this.props;
    return axios
      .put(`https://tralebackend.herokuapp.com/api/user_routes`, {
        routes_id: routeId,
        user_id: userId,
        completed: true
      })
      .then(res => console.log(res));
  };

  render() {
    const {
      noticeMsg,
      noticeMsgDisplayed,
      routeIndex,
      allDestinations
    } = this.state;
    return (
      // <IonPage className="CheckIn-Page">
      <>
        {routeIndex <= allDestinations.length - 1 && (
          <IonButton
            className="CheckIn-Button"
            onClick={() => {
              this.handleCheckInButton();
            }}
          >
            Check-in
          </IonButton>
        )}
        {noticeMsg && (
          <NoticeMsg
            msg={noticeMsg}
            header={'Checking-in'}
            button={{
              text: 'Okay!',
              handler: () => {
                this.setState({ noticeMsgDisplayed: false });
              }
            }}
            isDisplayed={noticeMsgDisplayed}
          />
        )}
        {routeIndex === allDestinations.length && (
          <NoticeMsg
            msg={`Congratulations you have completed ${allDestinations[0].route_name}!`}
            header={'TrAle Completed!'}
            button={{
              text: 'Thanks!',
              handler: () => {
                this.setState({ noticeMsgDisplayed: false });
                this.completedTrail();
              }
            }}
            onClick={() => console.log('click')}
            isDisplayed={noticeMsgDisplayed}
          />
        )}
      </>
      // </IonPage>
    );
  }
}

export default CheckIn;
