import React from 'react';
import { Col } from 'react-flexbox-grid'
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import Notes from './Notes';

const Board = ({ class_name, title, notes, clickIcon, onBlurTextField }) => (
    <Col xs={ 12 } sm={ 6 } md={ 3 }>
        <div className={ class_name }>
            <h3>{ title }</h3>
            <Container maxWidth="sm">
                {
                    <Notes
                        class_name={ class_name }
                        notes={ notes }
                        clickIcon={ clickIcon }
                        onBlurTextField={ onBlurTextField }
                    />
                }
            </Container>
        </div>
    </Col>
);

Board.propTypes = {
    class_name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    notes: PropTypes.array.isRequired,
    clickIcon: PropTypes.func.isRequired,
    onBlurTextField: PropTypes.func.isRequired
}

Board.displayName = "Board";

export default Board;