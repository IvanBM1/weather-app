import React, {Component} from 'react'

import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { googleMapsKey } from '../../Config'

class WeatherMap extends Component {
    render() {
        return (
            <Map 
                google={this.props.google}
                initialCenter={this.props.position} 
                center={this.props.position}
            >
                <Marker position={this.props.position} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: googleMapsKey
})(WeatherMap)