import {default as React, addons, Component} from 'react/addons';

import { GoogleMap, Marker, SearchBox } from 'react-google-maps';

const {update} = addons;

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
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
    markers: [{
      position: {
        lat: 25.0112183,
        lng: 121.52067570000001,
      },
      key: 'Taiwan',
      defaultAnimation: 2,
    }],
  };

  static inputStyle = {
    border: '1px solid transparent',
    borderRadius: '1px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    boxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    fontSize: '14px',
    height: '32px',
    marginTop: '27px',
    outline: 'none',
    padding: '0 12px',
    textOverflow: 'ellipses',
    width: '400px'
  };

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  _handle_map_click = (event) => {
    let {markers} = this.state;
    markers = update(markers, {
      $push: [
        {
          position: event.latLng,
          defaultAnimation: 2,
          key: Date.now(),// Add a key property for: http://fb.me/react-warning-keys
        },
      ],
    });
    this.setState({ markers });

    console.log(this.refs.map.getBounds());
  };

  _handle_places_changed = () => {
    const places = this.refs.searchBox.getPlaces();
    const markers = [];

    // Add a marker for each place returned from search bar
    places.forEach(function (place) {
      markers.push({
        position: place.geometry.location
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

  _handle_marker_rightclick(index, event) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    let {markers} = this.state;
    markers = update(markers, {
      $splice: [
        [index, 1]
      ],
    });
    this.setState({ markers });
  }

  render() {
    return (
      <section style={{height: "300px"}}>
        <GoogleMap containerProps={{
            style: {
              height: "100%",
            },
          }}
          ref="map"
          defaultZoom={3}
          defaultCenter={{lat: -25.363882, lng: 131.044922}}
          onClick={this._handle_map_click}>

           <SearchBox
            bounds={this.state.bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={this._handle_places_changed}
            ref="searchBox"
            style={RideMap.inputStyle} />

          {this.state.markers.map((marker, index) => {
            return (
              <Marker
                {...marker}
                onRightclick={this._handle_marker_rightclick.bind(this, index)} />
            );
          })}
        </GoogleMap>
      </section>
    );
  }
}
