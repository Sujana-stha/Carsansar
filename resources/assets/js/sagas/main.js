import { all, fork } from 'redux-saga/effects';

//SAGA FILE
import * as makeSaga from './makeSaga';
import * as modelSaga from './modelSaga';
import * as optionCategorySaga from './optionCategorySaga'
import * as categorySaga from './categoriesSaga'

export default function* rootSaga() {
    yield all (
        [...Object.values(makeSaga),
            ...Object.values(modelSaga),
            ...Object.values(optionCategorySaga),
            ...Object.values(categorySaga)
        ].map(fork)
    );
}