import React from 'react';
import WeatherItem from '../WeatherItem';

import List from '@material-ui/core/List';

const WeatherList = ({ cities, onSelect }) => (
    <List>
        { cities.map(city => <WeatherItem key={city} city={city} onSelect={onSelect}/> ) }
    </List>
);

export default WeatherList;