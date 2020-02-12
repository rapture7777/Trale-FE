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
    routeIndex: 0,
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
    const { distance, nextDestination, allDestinations } = this.state;
    const { userId, routeId } = this.props;
    console.log(allDestinations);
    if (distance <= 1000) {
      getReq('https://tralebackend.herokuapp.com/api/user_routes', {
        user_id: userId,
        routes_id: routeId
      }).then(res => {
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
          () => console.log(this.state)
        );
      });
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
    const {
      noticeMsg,
      noticeMsgDisplayed,
      routeIndex,
      allDestinations,
      nextDestination
    } = this.state;
    return (
      <IonPage className="CheckIn-Page">
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
            onClick={() => console.log('click')}
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
              }
            }}
            onClick={() => console.log('click')}
            isDisplayed={noticeMsgDisplayed}
          />
        )}
      </IonPage>
    );
  }
}

export default CheckIn;
