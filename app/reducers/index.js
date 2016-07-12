import { combineReducers } from 'redux';

import game from './game';
import settings from './settings';
import api from './api';

import { routerReducer as routing }from 'react-router-redux';
import { reducer as form } from 'redux-form';

//combine all of our reducers into a single reducer
export default combineReducers({
    game, settings,api, routing, form
});



