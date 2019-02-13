import { all, fork } from 'redux-saga/effects';

//SAGA FILE
import * as makeSaga from './makeSaga';
import * as modelSaga from './modelSaga';
import * as optionCategorySaga from './optionCategorySaga'
import * as categorySaga from './categoriesSaga'
import * as driveSaga from './driveSaga'
import * as bodySaga from './bodySaga'
import * as enginesizeSaga from './enginesizeSaga'
import * as fueltypeSaga from './fueltypeSaga'
import * as transmissionSaga from './transmissionSaga'
import * as companySaga from './companySaga'
import * as optionSaga from './optionsSaga'
import * as colorSaga from './colorSaga'
import * as dealSaga from './dealsSaga';
import * as loginSaga from './loginSaga';

export default function* rootSaga() {
    yield all (
        [...Object.values(makeSaga),
            ...Object.values(modelSaga),
            ...Object.values(optionCategorySaga),
            ...Object.values(categorySaga),
            ...Object.values(driveSaga),
            ...Object.values(bodySaga),
            ...Object.values(enginesizeSaga),
            ...Object.values(fueltypeSaga),
            ...Object.values(transmissionSaga),
            ...Object.values(companySaga),
            ...Object.values(optionSaga),
            ...Object.values(colorSaga),
            ...Object.values(dealSaga),
            ...Object.values(loginSaga)
        ].map(fork)
    );
}