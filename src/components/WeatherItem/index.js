import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Styles.css';

import OpenWeather from '../../services/OpenWeather'
import { WeatherIcons } from '../../Constans';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider'

class WeatherCard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: {
                city: props.city,
                country: '',
                temperature: 0,
                icon: ''
            },
            isLoaded: false,
            isError: false,
            error: '',
        }
    }

    componentDidMount() {
        this.update()
    }

    componentDidUpdate(prevProps, prevState) { }

    update = () => {
        this.setState({ isLoaded: true })
        
        OpenWeather.weather(this.state.data.city).then(data => {
            data.icon = WeatherIcons[data.icon]
            this.setState({ data, isLoaded: false })
        }).catch(err => {
            this.setState({
                isLoaded: false,
                isError: true,
                error: err
            })
        })
    }

    onSelect = () => {
        this.props.onSelect(this.state.data)
    }

    show = (show) => {
        return show ? {} : { display: 'none' }
    }

    render() {
        return (
            <>
                <ListItem button onClick={this.onSelect}>
                { this.state.isLoaded ?
                    <CircularProgress /> :
                    <>
                        <div className={`wi wi-wind wi-from-e wi-${this.state.data.icon} weather-icon`} />
                        <ListItemText primary={`${this.state.data.temperature} ºC`} secondary={`${this.state.data.city}, ${this.state.data.country}`}/>
                    </>
                }
                </ListItem>
                <Divider variant="inset"/>
            </>
        );
    }
}

WeatherCard.propTypes = {
    city: PropTypes.string.isRequired
}

export default WeatherCard;