import React from 'react';
import { connect } from 'react-redux';
import '../../styles/gps-page/routeInformation.css';

const SCALE_Y = 2;

const RouteInformation = props => (
    props.route === null ||
    <div className="row routeInformation mx-2">
        <div className="col-12" >
            <div className="pt-1">
                <p className="pl-2 pt-2">
                    Route time: {props.route.minutes}:{dubbleDigit(props.route.seconds)}
                </p>
                <hr />
                <ol className="routeOl">
                    {props.route.stages.map((stage, i) => (
                        <li key={`route${i}`} className="pt-1 routeLi">
                            <table className="routeTable">
                                <tbody>
                                    <tr>
                                        <td align="left"><i className="fas fa-stopwatch"> Time:</i></td>
                                        <td align="left">{parseInt(stage.seconds / 60, 10)}:{dubbleDigit(parseInt(stage.seconds % 60, 10))}</td>
                                    </tr>
                                    <tr>
                                        <td align="left"><i className="fas fa-map"> Route:</i></td>
                                        <td align="left"> {stage.startSquare} <i className="fas fa-arrow-right" /> {stage.endSquare}</td>
                                    </tr>
                                    <tr>
                                        <td align="left"><i className="fas fa-compass"> Direction:</i></td>
                                        <td align="left">{getAngle(stage)}&deg;</td>
                                    </tr>
                                </tbody>
                            </table>
                            {props.route.stages.length - 1 === i || <hr />}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    </div>
);

function dubbleDigit(digit) {
    return digit < 10 ? '0' + digit : digit;
}

function getAngle(stage) {
    const { startPosition, endPosition } = stage;
    const xDiff = endPosition.x - startPosition.x;
    const yDiff = SCALE_Y * (endPosition.y - startPosition.y);
    let angle = Math.atan2(yDiff, xDiff) * 180.0 / Math.PI - 270;
    while (angle < 0) {
        angle += 360;
    }

    return parseInt(angle, 10);
}

export default connect(
    state => state.map
)(RouteInformation);