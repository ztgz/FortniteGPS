import React from 'react';
import { connect } from 'react-redux';
import { clearPositions } from "../actions/map";
import Alert from "./shared/Alert";
import Map from './gps-page/Map';
import RouteInformation from './gps-page/RouteInformation';
import '../styles/shared/button.css';

class GpsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            helpAlertVisable: false,
        };
    }

    clearMap = () => {
        const action = clearPositions();
        this.props.dispatch(action);
    };

    closeAlert = () => {
        this.setState({
            helpAlertVisable: false
        });
    };

    showAlert = () => {
        this.setState({
            helpAlertVisable: true
        });
    }

    render() {
        const length = this.props.positions.length;
        const clearMapDisabled = length < 1;

        const alertProps = {
            alertType: 'alert-info',
            onClick: this.closeAlert,
            visable: this.state.helpAlertVisable,
            text: `Click on the map to start creating a route.`,
        };

        return (
            <div className="container-fluid">
                <div className="row mt-4 mb-2 mx-1">
                    <div className="col-12 col-md-8 col-lg-6 mb-3">
                        <h2>Map</h2>
                        <Map />
                        <Alert {...alertProps} />
                        <button className="btn btn-default mr-2 mt-1" onClick={this.clearMap} disabled={clearMapDisabled}>
                            <i className="fas fa-trash-alt" /> Clear Map
                        </button>
                        <button className="btn btn-default mr-2 mt-1" onClick={this.showAlert} disabled={this.state.helpAlertVisable}>
                           <i className="fas fa-info-circle" /> Help 
                        </button>
                    </div>
                    <div className="col-12 col-md-4 col-lg-4">
                        <h2>Route</h2>
                        <RouteInformation />
                    </div>
                </div>
            </div >
        );
    };
}

export default connect(
    state => state.map
)(GpsPage);