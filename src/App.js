import React, { Component } from 'react';
import './App.css';

import { Grid, Row, Col } from 'react-flexbox-grid';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import WeatherList from './components/WeatherList';
import WeatherDetails from './components/WeatherDetails'

class App extends Component {

    constructor() {
        super()
        this.state = {
            city: null,
            cities: [
                'Puebla',
                'Oaxaca',
                'México',
                'Guadalajara'
            ]
        }
    }

    onWeatherCardSelect = (position) => {
        this.setState({ position: position, showMap: true })
    }

    onSelect = (city) => {
        this.setState({ city })
    }

    render() {
        return (
            <Grid>
                <AppBar position='sticky'>
                    <Toolbar>Weather App</Toolbar>
                </AppBar>
                <Row>
                    <Col xs={4}>
                        <WeatherList onSelect={this.onSelect} cities={this.state.cities} />
                    </Col>
                    <Col xs={8}>
                        {this.state.city &&
                        <WeatherDetails city={this.state.city}/>}
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default App;
