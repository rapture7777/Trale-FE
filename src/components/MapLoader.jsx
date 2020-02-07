import React from 'react';
import { withScriptjs } from 'react-google-maps';
import apiKey from '../apiKey';
import Map from './Map';

const MapLoader = () => {
  const MapLoad = withScriptjs(Map);

  return (
    <MapLoad
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
      loadingElement={<div style={{ height: `100%` }} />}
      // routeId={this.props.routeId}
    />
  );
};

export default MapLoader;
