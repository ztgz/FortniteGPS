import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';

const store = configureStore();

const App = () => (
  <div className="App">
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </div>
);

export default App;
