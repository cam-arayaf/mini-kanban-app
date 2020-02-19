import React, { Fragment } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Card, CardActions, CardContent, IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PropTypes from 'prop-types';

const IconBtn = ({ onClick, icon }) => (
    <IconButton onClick={ onClick } size="small">
        { icon }
    </IconButton>
);

const AddIdea = ({ clickIcon }) => (
    <Col xs={ 12 }>
        <IconBtn onClick={ () => clickIcon('clickAddIcon') } icon={ <AddIcon /> } />
    </Col>
);

const IdeaAndDoneNote = ({ _id, type, clickIcon }) => (
    <Fragment>
        <Col xs={ 4 }>
            <IconBtn
                onClick={ type === 'ideas' ? () => clickIcon('clickSaveIcon', _id) :
                    () => clickIcon('clickSkipPreviousIcon', _id)
                }
                icon={ type === 'ideas' ? <SaveIcon /> : <SkipPreviousIcon /> }
            />
        </Col>
        <Col xs={ 4 }>
            <IconBtn
                onClick={ type === 'ideas' ? () => clickIcon('clickDeleteIcon', _id) :
                    () => clickIcon('clickSaveIcon', _id)
                }
                icon={ type === 'ideas' ? <DeleteIcon /> : <SaveIcon /> }
            />
        </Col>
        <Col xs={ 4 }>
            <IconBtn
                onClick={ type === 'ideas' ? () => clickIcon('clickSkipNextIcon', _id) :
                    () => clickIcon('clickDeleteIcon', _id)
                }
                icon={ type === 'ideas' ? <SkipNextIcon /> : <DeleteIcon /> }
            />
        </Col>
    </Fragment>
);

const ToDoAndInProgressNote = ({ _id, clickIcon }) => (
    <Fragment>
        <Col xs={ 6 } sm={ 3 }>
            <IconBtn
                onClick={ () => clickIcon('clickSkipPreviousIcon', _id) }
                icon={ <SkipPreviousIcon /> }
            />
        </Col>
        <Col xs={ 6 } sm={ 3 }>
            <IconBtn
                onClick={ () => clickIcon('clickSaveIcon', _id) }
                icon={ <SaveIcon /> }
            />
        </Col>
        <Col xs={ 6 } sm={ 3 }>
            <IconBtn
                onClick={ () => clickIcon('clickDeleteIcon', _id) }
                icon={ <DeleteIcon /> }
            />
        </Col>
        <Col xs={ 6 } sm={ 3 }>
            <IconBtn
                onClick={ () => clickIcon('clickSkipNextIcon', _id) }
                icon={ <SkipNextIcon /> }
            />
        </Col>
    </Fragment>
);

const Buttons = ({ _id, type, clickIcon }) => (
    type === 'ideas' || type === 'done' ?
        <IdeaAndDoneNote _id={ _id } type={ type } clickIcon={ clickIcon } /> :
        <ToDoAndInProgressNote _id={ _id } clickIcon={ clickIcon } />
);

const Note = ({ _id, type, text, clickIcon, onBlurTextField }) => (
    <Card>
        <CardContent>
            <TextField
                id={ `textField${ _id ? _id : 0 }` }
                multiline
                rowsMax="4"
                variant="outlined"
                defaultValue={ text }
                onBlur={ _id ? () => onBlurTextField(_id) : null }
            />
        </CardContent>
        <CardActions>
            <Grid>
                <Row>
                    {
                        _id ?
                            <Buttons _id={ _id } type={ type } clickIcon={ clickIcon } /> :
                            <AddIdea clickIcon={ clickIcon } />
                    }
                </Row>
            </Grid>
        </CardActions>
    </Card>
);

IconBtn.propTypes = {
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.element.isRequired
}

AddIdea.propTypes = {
    clickIcon: PropTypes.func.isRequired
}

IdeaAndDoneNote.propTypes = {
    _id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    clickIcon: PropTypes.func.isRequired
}

ToDoAndInProgressNote.propTypes = {
    _id: PropTypes.number.isRequired,
    clickIcon: PropTypes.func.isRequired
}

Buttons.propTypes = {
    _id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    clickIcon: PropTypes.func.isRequired
}

Note.propTypes = {
    _id: PropTypes.number,
    type: PropTypes.string,
    text: PropTypes.string,
    clickIcon: PropTypes.func.isRequired,
    onBlurTextField: PropTypes.func
}

Note.displayName = "Note";

export default Note;