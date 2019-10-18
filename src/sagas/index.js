import { select, takeEvery } from 'redux-saga/effects'
import { STATUS_SUCCESS } from '../middlewares/api';
import firestore from '../services/firestore';
import * as translateConstants from '../constants/translateConstants';
import { userSelector } from '../selectors/userSelectors';
import { bookSelector } from '../selectors/bookSelectors';


function* onTranslate(action) {
    if(action.status === STATUS_SUCCESS) {
        const word = action.data;
        const user = yield select(userSelector);
        const book = yield select(bookSelector);

        firestore.collection('books').doc(book.id).collection('words').doc(word).get().then((doc) => {
            let wordObject = {
                userId: user.uid,
                word: word,
                count: 0
            };

            if(doc.exists) {
                wordObject = {
                    ...wordObject,
                    ...doc.data(),
                    lastSearch: Date.now()
                };
            }

            wordObject.count += 1;

            firestore.collection('books').doc(book.id).collection('words').doc(word).set(wordObject)
                .then(() => console.log(`Word ${word} saved succesfully`))
                .catch(e => console.error(`Error saving word ${word}: `, e));
        })
    }
}


function* rootSaga() {
    yield takeEvery(translateConstants.TRANSLATE, onTranslate);
}


export default rootSaga;