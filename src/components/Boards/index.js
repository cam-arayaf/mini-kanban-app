import React, { Component } from 'react';
import { Grid, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import Board from './Board';

class Boards extends Component {
    state = { boards: [], notes: [] };

    componentDidMount() {
        this.getBoards();
        this.getNotes();
    }

    getBoards = ({ boards } = this.props) => this.setState({ boards });

    getNotes = ({ notes } = this.props) => this.setState({ notes });

    eventHandler = (event, _id) => {
        switch (event) {
            case 'clickAddIcon':
                return this.clickAddIcon();
            case 'clickDeleteIcon':
                return this.clickDeleteIcon(_id);
            case 'clickSkipPreviousIcon': case 'clickSkipNextIcon':
                return this.clickSkipPreviousNextIcon(event, _id);
            case 'clickSaveIcon':
                return this.clickSaveIcon(_id);
            default:
                return this.onBlurTextField(_id);
        }
    }

    clickAddIcon = () => {
        console.log('clickAddIcon');
        const notes = [...this.state.notes];
        const textField0 = document.querySelector('#textField0');
        const text = textField0.value.trim();
        if (!text) return;
        const maxId = Math.max(...notes.map(note => note._id));
        const _id = maxId === -Infinity ? 1 : maxId + 1;
        const type = 'ideas';
        const note = { _id, type, text };
        textField0.value = '';
        notes.push(note);
        this.setState({ notes });
        console.log('clickAddIcon', notes);
    }

    clickDeleteIcon = _id => {
        console.log('clickDeleteIcon');
        const notes = [...this.state.notes];
        const deleteNoteIndex = notes.findIndex(note => note._id === _id);
        if (deleteNoteIndex === -1) return;
        notes.splice(deleteNoteIndex, 1);
        this.setState({ notes });
        console.log('clickDeleteIcon', notes);
    }

    clickSkipPreviousNextIcon = (event, _id) => {
        console.log(event);
        const notes = [...this.state.notes];
        notes.forEach(
            note => note._id === _id ? (
                note.type =
                    note.type === 'ideas' ? 'to-do' :
                    note.type === 'to-do' ? (event === 'clickSkipNextIcon' ? 'in-progress' : 'ideas') :
                    note.type === 'in-progress' ? (event === 'clickSkipNextIcon' ? 'done' : 'to-do') :
                    'in-progress'
            ) : null
        );
        this.setState({ notes });
        console.log(event, notes);
    }

    clickSaveIcon = _id => {
        console.log('clickSaveIcon');
        const notes = [...this.state.notes];
        const textField = document.querySelector(`#textField${ _id }`).value.trim();
        if (!textField) return;
        notes.forEach(note => note._id === _id && note.text !== textField ? note.text = textField : null);
        this.setState({ notes });
        console.log('clickSaveIcon', notes);
    }

    onBlurTextField = _id => {
        console.log('onBlurTextField');
        const notes = [...this.state.notes];
        const textField = document.querySelector(`#textField${ _id }`);
        notes.forEach(
            note => note._id === _id && note.text !== textField.value ? textField.value = note.text
            : null
        );
        console.log('onBlurTextField', textField.value);
    }

    render() {
        const { boards, notes } = this.state;
        return (
            <Grid>
                <Row>
                    {
                        boards.map(board => {
                            const { _id, class_name, title } = board;
                            return (
                                <Board
                                    key={ _id }
                                    class_name={ class_name }
                                    title={ title }
                                    notes={ notes }
                                    eventHandler={ this.eventHandler }
                                />
                            );
                        })
                    }
                </Row>
            </Grid>
        );
    }
}

Boards.propTypes = {
    boards: PropTypes.array.isRequired,
    notes: PropTypes.array.isRequired
}

Boards.displayName = "Boards";

export default Boards;