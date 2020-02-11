/*global google*/
import React, { Component } from "react";
import { IonPage, IonTitle, IonButton } from "@ionic/react";
import { Geolocation } from "@capacitor/core";
import NoticeMsg from "./NoticeMsg";
import { getReq } from "../utils/api";

class CheckIn extends Component {
  state = {
    position: {},
    nextDestination: {},
    allDestinations: {},
    sSet: 0,
    distance: null,
    noticeMsg: "",
    noticeMsgDisplayed: false
  };

  getCurrentLocation = () => {
    console.log("getting current location");
    Geolocation.watchPosition({}, (position, err) => {
      if (position) this.setState({ position: position.coords });
      if (err) console.log(err);
    });
    this.setState(currentState => {
      return { sSet: currentState.sSet + 1 };
    });
  };

  getRoute = () => {
    console.log("getting route");
    getReq(`https://tralebackend.herokuapp.com/api/routes/2`).then(
      ({ route }) => {
        this.setState(currentState => {
          return {
            allDestinations: route,
            nextDestination: route[0],
            sSet: currentState.sSet + 1
          };
        });
      }
    );
  };

  findDistance = () => {
    console.log(this.state, "getting distance");
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
        travelMode: "WALKING"
      },
      ({ rows }, status) => {
        const distance = rows[0].elements[0].distance.value;
        this.setState({ distance });
      }
    );
  };

  handleCheckInButton = () => {
    const { distance } = this.state;
    if (distance <= 1000) {
      getReq("https://tralebackend.herokuapp.com/api/user_routes", {
        user_id: 1,
        routes_id: 2
      }).then(res => {
        this.setState({
          noticeMsg: "You have been checked-in",
          noticeMsgDisplayed: true
        });
      });
    } else {
      this.setState({
        noticeMsg: "You are so far from the pub!",
        noticeMsgDisplayed: true
      });
    }
  };

  componentDidMount() {
    this.getRoute();
    this.getCurrentLocation();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.sSet !== prevState.sSet && this.state.sSet >= 2) {
      this.findDistance();
    }
  }

  render() {
    const { noticeMsg, noticeMsgDisplayed } = this.state;
    return (
      <IonPage>
        <IonTitle>Location Tracking</IonTitle>
        <IonButton
          onClick={() => {
            this.handleCheckInButton();
          }}
        >
          Check-in
        </IonButton>
        {noticeMsg && (
          <NoticeMsg
            msg={noticeMsg}
            header={"Checking-in"}
            button={"Okay!"}
            isDisplayed={noticeMsgDisplayed}
          />
        )}
      </IonPage>
    );
  }
}

export default CheckIn;
