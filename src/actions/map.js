export const addPosition = (x, y) => ({
    type: 'ADD_POSITION',
    x,
    y
});

export const clearPositions = () => ({
    type: 'CLEAR_POSITIONS'
});

export const highlightRoute = id => ({
    type: 'HIGLIGHT_ROUTE',
    id
});