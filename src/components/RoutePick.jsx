import React, { Component } from 'react';
import { IonPage, IonButton } from '@ionic/react';
import { postReq } from '../utils/postReq';
import * as utils from '../utils/api';
import '../css/CheckIn.css';

class RoutePick extends Component {
  state = {
    route_name: ''
  };

  componentDidMount() {
    utils
      .getReq(
        `https://tralebackend.herokuapp.com/api/routes/${this.props.routeId}`
      )
      .then(res =>
        this.setState({ route_name: res.route[0].route_name }, () => {
          console.log(this.state.route_name);
        })
      );
  }

  handleClick = () => {
    const url = `https://tralebackend.herokuapp.com/api/user_routes`;
    postReq(
      url,
      this.props.userId,
      this.props.routeId,
      this.state.route_name
    ).then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      // <IonPage className="CheckIn-Page">
      <IonButton
        className="RoutePick-Button"
        onClick={() => this.handleClick()}
      >
        Select Route!
      </IonButton>
      // </IonPage>
    );
  }
}

export default RoutePick;
