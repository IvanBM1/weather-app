import React, {Component} from 'react';
import './Styles.css'

import OpenWeather from '../../services/OpenWeather';

import { Grid, Row } from 'react-flexbox-grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress'

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

    componentWillReceiveProps(nextProps) {
        if(nextProps.city.city !== this.props.city.city) {
            this.setState({list: null})
            this.update()
        }
    }

    componentDidUpdate(prevProps, prevState) {}

    update = () => {
        const {city, country} = this.props.city
        OpenWeather.forecast(city, country).then(list => {
            this.setState({ list })
        })
    }

    render() {
        return (
            <Grid>
                <Row center='xs' className='margin-top'><h1>{ this.props.city.city }</h1></Row>
                <Row center='xs'><h3>{ this.props.city.main }</h3></Row>
                <Row center='xs'><div className='temperature'>{ this.props.city.temperature }º</div></Row>
                <Row center='xs'>
                { !this.state.list?
                    <CircularProgress /> :
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Hora</TableCell>
                                <TableCell>Icono</TableCell>
                                <TableCell>Mínimo</TableCell>
                                <TableCell>Máximo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        { this.state.list.map(item => (
                            <TableRow key={item.id} hover>
                                <TableCell>{ item.date.toLocaleString('es-MX', { weekday: 'long', day: 'numeric', month: 'long'}) }</TableCell>
                                <TableCell>{ item.date.toLocaleString('es-MX', { hour: 'numeric', hour12: true}) }</TableCell>
                                <TableCell><div className={`wi wi-wind wi-from-e wi-${item.icon} weather-icon`}></div></TableCell>
                                <TableCell>{ item.temperatureMin }ºC</TableCell>
                                <TableCell>{ item.temperatureMax }ºC</TableCell>
                            </TableRow>))}
                        </TableBody>
                    </Table>}
                </Row>
            </Grid>
        );
    }
}

export default WeatherDetails;