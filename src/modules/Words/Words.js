// @flow
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import translateActions from '../../actions/translateActions';
import { listSelector } from '../../selectors/wordSelectors';
import Word from './Word';

export default function Words() {
    const dispatch = useDispatch();
    const list = useSelector(listSelector);
    const [activeWord, setActiveWord] = useState();
    const hasWords = list && list.length > 0;

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

    const handleClickAway = () => setActiveWord(null);

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div>
                {!hasWords &&
                    <FormattedMessage
                        id="word.noWords"
                        defaultMessage="No translations yet"
                    />
                }

                {hasWords && list.map(word => (
                    <Word
                        key={word}
                        wordId={word}
                        active={word === activeWord}
                        onChange={onChange}
                    />
                ))}
            </div>
        </ClickAwayListener>
    );
}