import 'babel-polyfill';// because we are using generators
import {takeLatest, delay} from 'redux-saga';
import {select, put, call} from 'redux-saga/effects';
import {score} from '../lib/cards';
import {dealToDealer, determineWinner, setRecord,
        fetchingRecord, fetchedRecord,
        patchingRecord, patchedRecord} from '../action_creators';
import {fetchUser, patchUser } from '../lib/api';


/*
helpers "selector" function that takes the state object as a parameter
and returns the piece of state that we want to see.
*/
const getUserToken = (state) => state.settings.get('userToken');
const getDealerHand= (state) => state.game.get('dealerHand');
const getSpeed = (state) => state.settings.get('speed');
const getWinCount = (state) => state.game.get('winCount');
const getLossCount = (state) => state.game.get('lossCount');


/* 
select effect enables a saga to grab data from the application state.
put effect enables a saga to dispatch actions to the reducer.
call effect receive the function to call and its arguments  
*/

/*
sagas run asynchronously. This means that while the saga is dispatching
DEAL_TO_DEALER actions, the rest of the page will still function like normal 
and the reducer can receive other actions.
*/

export function* onStand(){
    const dealSpeed = yield select(getSpeed);
    let dealerHand;
    while(true){
        yield put(dealToDealer());
        dealerHand= yield select(getDealerHand);
        
        if(score(dealerHand) >= 17){
            break;
        }
        else {
            yield call(delay, dealSpeed);
        }
    }
    yield put(determineWinner());
}


/*
call effect allows onFetchRecord saga to run a function fetchUser 
that returns a promise and stops the saga until the promise is resolved
*/

export function* onFetchRecord(){
    const userToken = yield select(getUserToken);
    yield put(fetchingRecord());
    const user = yield call(fetchUser, userToken);
    yield put(fetchedRecord());
    yield put(setRecord(user.win_count, user.loss_count));
}


export function* onPatchRecord() {
    const userToken = yield select(getUserToken);
    const winCount = yield select(getWinCount);
    const lossCount = yield select(getLossCount);
    yield put(patchingRecord());
    yield call(patchUser, userToken, {
        user: {
            'win_count': winCount,
            'loss_count': lossCount
        }
    });
    yield put(patchedRecord());
}


/* 
takeLatest() is a take effects function of Redux Saga
It will not run a new worker saga if one is already running. 
*/

export default function*(){
    yield [takeLatest('STAND', onStand),
            takeLatest('FETCH_RECORD', onFetchRecord),
            takeLatest('SETUP_GAME', onPatchRecord)
    ];
}
