import React, { Component } from 'react';
import { IonPage, IonButton } from '@ionic/react';
import { postReq } from '../utils/postReq';
import * as utils from '../utils/api';
import '../css/CheckIn.css';

class RoutePick extends Component {
  state = {
    route_name: null,
    hideButton: false,
    usersRoutes: []
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

    utils
      .getReq(
        `https://tralebackend.herokuapp.com/api/user_routes/${this.props.userId}`
      )
      .then(res =>
        this.setState({ usersRoutes: res }, () =>
          console.log(this.state.usersRoutes)
        )
      )
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    const { route_name, usersRoutes, hideButton } = this.state;
    if (route_name && usersRoutes && !hideButton) {
      if (
        usersRoutes.filter(route => route.routes_id === this.props.routeId)
          .length
      ) {
        this.setState({ hideButton: true });
      }
    }
  }

  handleClick = () => {
    const { usersRoutes } = this.state;

    if (
      !usersRoutes.filter(route => route.routes_id === this.props.routeId)
        .length
    ) {
      const url = `https://tralebackend.herokuapp.com/api/user_routes`;
      postReq(
        url,
        this.props.userId,
        this.props.routeId,
        this.state.route_name
      ).then(res => {
        this.setState({ hideButton: true });
      });
    }
  };

  render() {
    const { hideButton } = this.state;
    return (
      !hideButton && (
        <IonButton
          className="RoutePick-Button"
          onClick={() => this.handleClick()}
        >
          <b>Select Route!</b>
        </IonButton>
      )
    );
  }
}

export default RoutePick;
