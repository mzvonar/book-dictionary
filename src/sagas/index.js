import { all, select, takeEvery } from 'redux-saga/effects'
import { STATUS_SUCCESS } from '../middlewares/api';
import firestore from '../services/firestore';
import * as translateConstants from '../constants/translateConstants';
import { userSelector } from '../selectors/userSelectors';
import { bookSelector } from '../selectors/bookSelectors';


function* onTranslate(action) {
    if(action.type === translateConstants.TRANSLATE && action.status !== STATUS_SUCCESS) {
        return;
    }

    const word = action.data;
    const user = yield select(userSelector);
    const book = yield select(bookSelector);

    firestore.collection('users').doc(user.id).collection('books').doc(book.id).collection('words').doc(word).get().then((doc) => {
        let wordObject = {
            word: word,
            count: 0,
        };

        if(doc.exists) {
            wordObject = {
                ...wordObject,
                ...doc.data()
            };
        }

        wordObject.count += 1;
        wordObject.lastSearch = Date.now();

        if(action.type === translateConstants.TRANSLATE) {
            wordObject.translations = action.response;
        }

        firestore.collection('users').doc(user.id).collection('books').doc(book.id).collection('words').doc(word).set(wordObject)
            .then(() => console.log(`Word ${word} saved succesfully`))
            .catch(e => console.error(`Error saving word ${word}: `, e));
    })
}

function* onShowTranslation(action) {
    const word = action.data;
    const user = yield select(userSelector);
    const book = yield select(bookSelector);

    firestore.collection('users').doc(user.id).collection('books').doc(book.id).collection('words').doc(word).get().then((doc) => {
        let wordObject = {
            word: word,
            count: 0,
        };

        if(doc.exists) {
            wordObject = {
                ...wordObject,
                ...doc.data()
            };
        }

        wordObject.count += 1;
        wordObject.lastSearch = Date.now();

        firestore.collection('users').doc(user.id).collection('books').doc(book.id).collection('words').doc(word).set(wordObject)
            .then(() => console.log(`Word ${word} saved succesfully`))
            .catch(e => console.error(`Error saving word ${word}: `, e));
    })
}

function* rootSaga() {
    yield all([
        yield takeEvery(translateConstants.TRANSLATE, onTranslate),
        yield takeEvery(translateConstants.SHOW_TRANSLATION, onTranslate)
    ]);
}


export default rootSaga;