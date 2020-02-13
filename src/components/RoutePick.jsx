import React, { Component } from 'react';
import { IonPage, IonButton } from '@ionic/react';
import { postReq } from '../utils/postReq';
import * as utils from '../utils/api';
import '../css/CheckIn.css';

class RoutePick extends Component {
  state = {
    route_name: '',
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
      .then(res => this.setState({ usersRoutes: res }));
  }

  handleClick = () => {
    const { usersRoutes } = this.state;
    const hasRoute = usersRoutes.filter(
      route => route.routes_id === this.props.routeId
    ).length;

    if (!hasRoute) {
      const url = `https://tralebackend.herokuapp.com/api/user_routes`;
      postReq(
        url,
        this.props.userId,
        this.props.routeId,
        this.state.route_name
      ).then(res => {
        this.setState({ hideButton: true });
      });
    } else {
      console.log('restart route');
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
          Select Route!
        </IonButton>
      )
    );
  }
}

export default RoutePick;
