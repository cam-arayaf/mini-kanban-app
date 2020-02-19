import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Note from './Note';

const Notes = ({ class_name, notes, clickIcon, onBlurTextField }) => (
    <Fragment>
        { class_name === 'ideas' && <Note clickIcon={ clickIcon } /> }
        {
            notes.filter(note => note.type === class_name).map(note => {
                const { _id, type, text } = note;
                return (
                    <Note
                        key={ _id }
                        _id={ _id }
                        type={ type }
                        text={ text }
                        clickIcon={ clickIcon }
                        onBlurTextField={ onBlurTextField }
                    />
                );
            })
        }
    </Fragment>
);

Notes.propTypes = {
    class_name: PropTypes.string.isRequired,
    notes: PropTypes.array.isRequired,
    clickIcon: PropTypes.func.isRequired,
    onBlurTextField: PropTypes.func.isRequired
}

Notes.displayName = "Notes";

export default Notes;