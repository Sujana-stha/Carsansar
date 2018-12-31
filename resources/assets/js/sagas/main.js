import { all, fork } from 'redux-saga/effects';

//SAGA FILE
import * as makeSaga from './makeSaga';
import * as modelSaga from './modelSaga';
import * as optionCategorySaga from './optionCategorySaga'
import * as categorySaga from './categoriesSaga'
import * as driveSaga from './driveSaga'
import * as bodySaga from './bodySaga'
import * as enginesizeSaga from './enginesizeSaga'

export default function* rootSaga() {
    yield all (
        [...Object.values(makeSaga),
            ...Object.values(modelSaga),
            ...Object.values(optionCategorySaga),
            ...Object.values(categorySaga),
            ...Object.values(driveSaga),
            ...Object.values(bodySaga),
            ...Object.values(enginesizeSaga)
        ].map(fork)
    );
}