import React from 'react';
import { connect } from 'react-redux';
import '../../styles/gps-page/routeInformation.css';

const SCALE_Y = 2;

class RouteInformation extends React.Component{
    dubbleDigit = (digit) => digit < 10 ? '0' + digit : digit;

    getAngle = (stage) => {
        const { startPosition, endPosition } = stage;
        const xDiff = endPosition.x - startPosition.x;
        const yDiff = SCALE_Y * (endPosition.y - startPosition.y);
        let angle = Math.atan2(yDiff, xDiff) * 180.0 / Math.PI - 270;
        while (angle < 0) {
            angle += 360;
        }

        return parseInt(angle, 10);
    }

    render(){
        let jsx = null;
        if(this.props.route === null){
            jsx = (
                <div className="row routeInformation mx-2">
                    <div className="col-12" >
                        <div className="pt-3 pb-1">
                            <h4>No route selected</h4>
                            <p>Click on the map to create a route</p>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            jsx = (
                <div className="row routeInformation mx-2">
                    <div className="col-12" >
                        <div className="pt-1">
                            <p className="pl-2 pt-2">
                                Route time: {this.props.route.minutes}:{this.dubbleDigit(this.props.route.seconds)}
                            </p>
                            <hr />
                            <ol className="routeOl">
                                {this.props.route.stages.map((stage, i) => (
                                    <li key={`route${i}`} className="pt-1 routeLi">
                                        <table className="routeTable">
                                            <tbody>
                                                <tr>
                                                    <td align="left"><i className="fas fa-stopwatch"> Time:</i></td>
                                                    <td align="left">{parseInt(stage.seconds / 60, 10)}:{this.dubbleDigit(parseInt(stage.seconds % 60, 10))}</td>
                                                </tr>
                                                <tr>
                                                    <td align="left"><i className="fas fa-map"> Route:</i></td>
                                                    <td align="left"> {stage.startSquare} <i className="fas fa-arrow-right" /> {stage.endSquare}</td>
                                                </tr>
                                                <tr>
                                                    <td align="left"><i className="fas fa-compass"> Direction:</i></td>
                                                    <td align="left">{this.getAngle(stage)}&deg;</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {this.props.route.stages.length - 1 === i || <hr />}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            )
        }

        return jsx;
    }
}






export default connect(
    state => state.map
)(RouteInformation);