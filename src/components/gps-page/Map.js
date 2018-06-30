import React from 'react';
import { connect } from 'react-redux';
import { addPosition, calculateRoute } from '../../actions/map';
import Alert from '../shared/Alert';

const CORDINATES_MAX = 1024;
const MAX_POSITIONS = 10;

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxPosAlert: false
        };
    }
    componentDidMount() {
        this.resizeCanvas();
        window.addEventListener("resize", this.resizeCanvas);
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeCanvas);
    };

    componentDidUpdate() {
        //Redraw canvas when map is updated
        this.clearCanvas();
        this.drawPositions();
    }

    canvasClicked = (e) => {
        const { positions } = this.props;

        if (positions.length < MAX_POSITIONS) {
            //Get the canvas
            const canvas = this.refs.canvas;
            //Get the position as map cordinates
            const scale = CORDINATES_MAX / canvas.width;
            const x = parseInt(scale * e.nativeEvent.offsetX, 10);
            const y = parseInt(scale * e.nativeEvent.offsetY, 10);
            //Add position to store and calculate new route
            this.props.dispatch(addPosition(x, y));
            this.props.dispatch(calculateRoute());
        }
        else {
            this.setState(prevState => {
                return { ...prevState, maxPosAlert: true };
            });
        }
    }

    clearCanvas = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    closeAlert = () => {
        this.setState({
            maxPosAlert: false
        });
    }

    drawCircle = (x, y, first = false) => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        //Set the style of circle
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 2;
        ctx.fillStyle = first ? "#268e16" : "#1d0cd6";
        //mapCordinates need to be transformed into scale cordinates
        const scale = CORDINATES_MAX / canvas.width;
        //Draw circle
        ctx.beginPath();
        ctx.arc(x / scale, y / scale, 7, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    };

    drawLine = (x1, y1, x2, y2, selected = false) => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        //mapCordinates need to be transformed into scale cordinates
        const scale = CORDINATES_MAX / canvas.width;
        //Save style
        ctx.save();
        //New style
        ctx.setLineDash([5, 3]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = selected ? "#FFFF00" : "#FF0000";
        //Draw line
        ctx.beginPath();
        ctx.moveTo(x1 / scale, y1 / scale);
        ctx.lineTo(x2 / scale, y2 / scale);
        ctx.stroke();
        //Restore old style
        ctx.restore();
    };

    drawPositions = () => {
        const { positions } = this.props;
        for (let i = 0; i < positions.length; i++) {
            if (positions[i].x !== null && positions[i].y !== null) {
                const firstCircle = i === 0;
                this.drawCircle(positions[i].x, positions[i].y, firstCircle);
                if (!firstCircle) {
                    this.drawLine(positions[i - 1].x, positions[i - 1].y, positions[i].x, positions[i].y);
                }
            }
        }
    };

    resizeCanvas = () => {
        const canvas = this.refs.canvas;
        let side = this.refs.mapDiv.offsetWidth - this.refs.mapDiv.offsetWidth / 10;
        if (side > 1000) {
            side = 1000;
        }
        canvas.setAttribute("width", side);
        canvas.setAttribute("height", side)
        //Redraw everything on canvas
        this.drawPositions();
    };

    render() {
        const canvasStyle = {
            border: "1px solid #000000",
            backgroundImage: `url("/images/fortniteMap.png")`,
            backgroundSize: "100% 100%"
        };

        const alertProps = {
            alertType: 'alert-danger',
            onClick: this.closeAlert,
            visable: this.state.maxPosAlert,
            text: `Route can at most contain ${MAX_POSITIONS} positions.`,
        };

        return (
            <div>
                <Alert {...alertProps} />
                <div ref="mapDiv" >
                    <canvas ref="canvas" style={canvasStyle} height="500" width="500" onClick={this.canvasClicked} />
                </div>
            </div>

        );
    };
}

export default connect(
    state => state.map
)(Map);