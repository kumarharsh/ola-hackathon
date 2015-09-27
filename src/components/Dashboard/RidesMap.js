import {default as React, addons, Component} from 'react/addons';

import { GoogleMap, SearchBox, InfoWindow, Circle } from 'react-google-maps';
import raf from 'raf';
import OlaApi from '../../Services/OlaApi';

window.OlaApi = OlaApi;

const {update} = addons;

const geolocation = (
  "undefined" !== typeof window && navigator && navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure("Your browser doesn't support geolocation.");
    },
  }
);

export default class RideMap extends Component {

  componentDidMount() {
    setTimeout(() => {
      var {markers} = this.state;
      markers = update(markers, {
        $push: [
          {
            position: {
              lat: 25.99,
              lng: 122.9,
            },
            defaultAnimation: 2,
            key: Date.now(),// Add a key property for: http://fb.me/react-warning-keys
          },
        ],
      });
      this.setState({ markers });
    }, 2000);
  }

  state = {
    center: null,
    content: null,
    radius: 6000,
  };

  static inputStyle = {
    border: '1px solid transparent',
    borderRadius: '1px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    boxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    fontSize: '14px',
    height: '32px',
    outline: 'none',
    padding: '0 12px',
    textOverflow: 'ellipses',
    width: '100%',
    left: '0px',
    zIndex: '1000'
  };

  _handle_places_changed = () => {
    const places = this.refs.searchBox.getPlaces();
    const markers = [];

    // Add a marker for each place returned from search bar
    places.forEach((place) => {
      this.props.onChangeLocation(place.geometry.location)
      markers.push({
        position: place.geometry.location,
      });
    });

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter,
      markers: markers,
    });

    return;
  };

  componentDidMount() {
    geolocation.getCurrentPosition((position) => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        content: 'You Are Here',
      });

      const tick = () => {
        this.setState({ radius: Math.max(this.state.radius - 20, 0) });
        if (this.state.radius > 200) {
          raf(tick);
        }
      };
      raf(tick);
    }, (reason) => {
      this.setState({
        center: {
          lat: 60,
          lng: 105,
        },
        content: `Error: The Geolocation service failed (${ reason }).`
      });
    });
  }

  render() {
    const {center, content, radius} = this.state;
    let contents = [];

    if (center) {
      contents = contents.concat([
        (<InfoWindow key="info" position={center} content={content} />),
        (<Circle key="circle" center={center} radius={radius} options={{
          fillColor: 'red',
          fillOpacity: 0.20,
          strokeColor: 'red',
          strokeOpacity: 1,
          strokeWeight: 1,
        }} />),
      ]);
    }

    return (
      <section style={{height: '100%'}}>
        <GoogleMap containerProps={{
            style: {
              height: '100%',
            },
          }}
          ref="map"
          defaultZoom={12}
          center={center}>

          <SearchBox
            bounds={this.state.bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={this._handle_places_changed}
            ref="searchBox"
            style={RideMap.inputStyle} />

          {contents}

        </GoogleMap>
      </section>
    );
  }
}
