// @flow
import React from 'react';
import type { Node } from 'react';
import classnames from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles({
    relative: {
        position: 'relative'
    },
    fade: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        background: props => props.fadeBackground || 'rgba(255, 255, 255, 0.8)',
        zIndex: 1
    },
    spinner: {
        zIndex: 2
    },
    centered: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
});

type Props = $ReadOnly<{
    isLoading: boolean,
    variant?: 'centered',
    fade?: boolean,
    fadeBackground?: string,
    Component?: Node,
    className?: string,
    spinnerClassName?: string,
    children?: Node
}>;

function Spinner({ isLoading, variant = 'centered', fade = true, fadeBackground, Component = 'div', className, spinnerClassName, children }: Props) {
    const classes = useStyles({ fadeBackground });

    return (
        <Component
            className={classnames({
                [classes.relative]: variant === 'centered' || fade
            }, className)}
        >
            {isLoading &&
                <React.Fragment>
                    {fade && <div className={classes.fade} />}
                    <div
                        className={classnames(classes.spinner, {
                            [classes.centered]: variant === 'centered'
                        }, spinnerClassName)}
                    >
                        <CircularProgress/>
                    </div>
                </React.Fragment>
            }

            {children}
        </Component>
    )
}

export default Spinner;