import { all, fork } from 'redux-saga/effects';

//SAGA FILE
import * as makeSaga from './makeSaga';
import * as modelSaga from './modelSaga';

export default function* rootSaga() {
    yield all (
        [...Object.values(makeSaga),
            ...Object.values(modelSaga)
        ].map(fork)
    );
}