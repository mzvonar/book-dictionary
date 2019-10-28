// @flow
import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Debug from 'debug';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import translateActions from '../../actions/translateActions';
import { userIdSelector, configSelector } from '../../selectors/userSelectors';
import { bookIdSelector } from '../../selectors/bookSelectors';
import { listSelector, entitiesSelector } from '../../selectors/wordSelectors';
import firestore from '../../services/firestore';
import Filter from './Filter';
import Word from './Word';

const debug = Debug('book:modules:words');

const sortByTitle = (order) => (a, b) => {
    if(a < b) {
        return order === 'asc' ? -1 : 1;
    }
    else if(a > b) {
        return order === 'asc' ? 1 : -1;
    }
    else {
        return 0;
    }
};

const sortByCount = (order, entities) => (a, b) => {
    if(entities[a].count < entities[b].count) {
        return order === 'asc' ? -1 : 1;
    }
    else if(entities[a].count > entities[b].count) {
        return order === 'asc' ? 1 : -1;
    }
    else {
        return 0;
    }
};

export default function Words() {
    const dispatch = useDispatch();
    const userId = useSelector(userIdSelector);
    const config = useSelector(configSelector);
    const bookId = useSelector(bookIdSelector);
    const list = useSelector(listSelector);
    const entities = useSelector(entitiesSelector);
    const [activeWord, setActiveWord] = useState();
    const hasWords = list && list.length > 0;
    const sort = config && config.sort || {
        by: 'count',
        order: 'desc'
    };

    const onChange = (wordId, isActive) => {
        if(isActive) {
            if(activeWord !== wordId) {
                setActiveWord(wordId);
                dispatch(translateActions.showTranslation(wordId));
            }
        }
        else {
            setActiveWord(null);
        }
    };

    const deleteWord = (wordId) => {
        const collection = `/users/${userId}/books/${bookId}/words`;
        debug(`Deleting ${collection}/${wordId}`);
        firestore.collection(collection).doc(wordId).delete();
    };

    const handleClickAway = () => setActiveWord(null);

    const sortedList = useMemo(() => {
        const sortedList = [].concat(list);

        if(sort.by === 'title') {
            sortedList.sort(sortByTitle(sort.order));
        }
        else if(sort.by === 'count') {
            sortedList.sort(sortByCount(sort.order, entities));
        }

        return sortedList;
    }, [list, sort]);

    return (
        <div>
            <Filter sort={sort} />

            <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                    {!hasWords &&
                        <FormattedMessage
                            id="word.noWords"
                            defaultMessage="No translations yet"
                        />
                    }

                    {hasWords && sortedList.map(word => (
                        <Word
                            key={word}
                            wordId={word}
                            active={word === activeWord}
                            onChange={onChange}
                            onDelete={deleteWord}
                        />
                    ))}
                </div>
            </ClickAwayListener>
        </div>
    );
}