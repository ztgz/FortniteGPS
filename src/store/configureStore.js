import { createStore, combineReducers } from 'redux';
import mapReducer from '../reducers/mapReducer';

export default () => {
    const store = createStore(
        combineReducers({
            map: mapReducer,
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}