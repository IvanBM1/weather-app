import React, {Component} from 'react';
import './Styles.css'

import OpenWeather from '../../services/OpenWeather';
import {WeatherIcons, WeekDayLarge} from '../../Constans';

import { Grid, Row } from 'react-flexbox-grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class WeatherDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: null
        }
    }

    componentDidMount() {
        this.update()
    }

    componentDidUpdate(prevProps, prevState) {
        //this.update()
    }

    update = () => {
        const {city, country} = this.props.city
        OpenWeather.forecast(city, country).then(list => {
            
            list = list.map(item => {
                const date = new Date(item.dt_txt)
                return {
                    id: item.id,
                    date: date,
                    weekDay: WeekDayLarge[date.getDay()],
                    temperature: item.main.temp,
                    temperatureMax: item.main.temp_max,
                    temperatureMin: item.main.temp_min,
                    icon: WeatherIcons[item.weather[0].icon]
                }
            })

            this.setState({
                list
            })
        })
    }

    render() {
        return (
            <Grid>
                <Row center='xs' className='margin-top'><h1>{ this.props.city.city }</h1></Row>
                <Row center='xs'><h3>{ this.props.city.main }</h3></Row>
                <Row center='xs'><div className='temperature'>{ this.props.city.temperature }º</div></Row>
                <Row>
                    { this.state.list &&
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Dia</TableCell>
                                <TableCell>Icono</TableCell>
                                <TableCell>Maximo</TableCell>
                                <TableCell>Minimo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { this.state.list.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{ item.weekDay }</TableCell>
                                    <TableCell>{ item.icon }</TableCell>
                                    <TableCell>{ item.temperatureMax }</TableCell>
                                    <TableCell>{ item.temperatureMin }</TableCell>
                                </TableRow>))
                            }
                        </TableBody>
                    </Table>}
                </Row>
            </Grid>
        );
    }
}

export default WeatherDetails;