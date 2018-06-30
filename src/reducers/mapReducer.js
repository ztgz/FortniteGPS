/* Reducers */
const mapReducerDefaultState = {
    positions: [],
    route: null
}

export default (state = mapReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_POSITION':
            return {
                ...state,
                positions: [...state.positions, { x: action.x, y: action.y }]
            };
        case 'CLEAR_POSITIONS':
            return {
                ...state,
                positions: [],
                route: null
            };
        case 'CALCULATE_ROUTE':
            const route = getRoute(state.positions);
            return {
                ...state,
                route
            }
        default:
            return state;
    }
}

/* Helper methods and constands for calculating state in reducers */
const MAX_POSITIONS = 10;
const MAP_WIDTH = 1024;
const MAP_RULER_WIDTH = 24;
const MAP_SQUARE_WIDTH = 100;
//One square takes 1:15 = 75s
const DISTANCE_PER_SECOND = MAP_SQUARE_WIDTH / 75;

const getRoute = (positions = []) => {
    if (positions.length < 2 || positions.length > MAX_POSITIONS) {
        return null;
    }
    const completeRoute = {
        stages: [],
        seconds: 0,
        minutes: 0,
    };

    let totalSeconds = 0;
    for (let i = 0; i < positions.length - 1; i++) {

        const distance = Math.sqrt( Math.pow(positions[i].x - positions[i+1].x,2) + Math.pow(positions[i].y - positions[i+1].y,2) );
        const seconds = distance / DISTANCE_PER_SECOND;
        totalSeconds += seconds;
        const route = {
            startPosition: positions[i],
            endPosition: positions[i + 1],
            distance,
            seconds,
            startSquare: getSquare(positions[i].x, positions[i].y),
            endSquare: getSquare(positions[i+1].x, positions[i+1].y)
        };

        completeRoute.stages.push(route);
    }  

    completeRoute.seconds = parseInt(totalSeconds%60, 10);
    completeRoute.minutes = parseInt(totalSeconds/60, 10);

    return completeRoute;
};

const getSquare = (x, y) => {
    let square;
    x -= MAP_RULER_WIDTH;
    y -= MAP_RULER_WIDTH;

    if (x < 0 || x >= MAP_WIDTH - MAP_RULER_WIDTH || y < 0 || y > MAP_WIDTH - MAP_RULER_WIDTH)
    {
        square = "OOB";
    }
    else
    {
        const letter = String.fromCharCode(Math.floor(x / MAP_SQUARE_WIDTH + 65)); 
        const number = Math.floor(y / MAP_SQUARE_WIDTH + 1); 
        square = letter + number;
    }

    return square;
};

