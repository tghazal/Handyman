import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

class Map extends Component {
  render() {
    return (
      <div className="row">
        <div className="col d-flex justify-content-center">
          <GoogleMapExample
            containerElement={<div className="p-2 bg-light rounded border mb-3" style={{ height: `500px`, width: '100%', maxWidth: '700px', maxHeight: '75vh' }} />}
            mapElement={<div style={{ height: '100%' }} />}
          />
        </div>
      </div>
    );
  }
};
export default Map;

const GoogleMapExample = withGoogleMap(props => (
  <GoogleMap
    defaultCenter={{ lat: 33.647, lng: -117.840 }}
    defaultZoom={13}
  >
  </GoogleMap>
));