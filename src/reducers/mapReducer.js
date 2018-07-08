import uuid from 'uuid';

/* Reducers */
const mapReducerDefaultState = {
    positions: [],
    route: null,
    dirty: false
}

export default (state = mapReducerDefaultState, action) => {
    let route;
    switch (action.type) {
        case 'ADD_POSITION':
            route = addPositionToRoute(state, action.x, action.y);
            return {
                ...state,
                positions: [...state.positions, { x: action.x, y: action.y }],
                route
            };
        case 'CLEAR_POSITIONS':
            return {
                ...state,
                positions: [],
                route: null
            };
        case 'HIGLIGHT_ROUTE':
            route = state.route;
            const stages = state.route.stages.map( stage => {
                if( stage.id === action.id){
                    stage.highlight = !stage.highlight;
                }
                return stage;
            });
            route.stages = stages;
            return{
                ...state,
                route,
                dirty: !state.dirty //update flag to force components to rerender
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

const addSecondsToRoute = (route, seconds) => {
    route.seconds += seconds;
    route.minutes += parseInt(route.seconds / 60, 10);
    route.seconds = parseInt(route.seconds % 60, 10);
    return route;
}

const addPositionToRoute = (state,x,y) => {
    const {positions} = state;
    let { route } = state;
    if (positions.length < 1 || positions.length > MAX_POSITIONS) {
        return route;
    }

    if( route  === null){
        route = {
            stages: [],
            seconds: 0,
            minutes: 0
        };
    }

    //Calculate new stage to route
    const startPosition = positions[positions.length-1];
    const seconds = getDistance(startPosition.x, startPosition.y, x, y) / DISTANCE_PER_SECOND;
    const stage = {
        id: uuid(),
        startPosition,
        endPosition: {x, y},
        seconds,
        startSquare: getSquare(startPosition.x, startPosition.y),
        endSquare: getSquare(x,y),
        highlight: false
    };
    route.stages.push(stage);

    //Get stage duration to route
    route = addSecondsToRoute(route, seconds);
    
    return route;
}

const getDistance = (startX, startY, endX, endY) => Math.sqrt( Math.pow(startX-endX, 2) + Math.pow(startY-endY, 2) );

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

