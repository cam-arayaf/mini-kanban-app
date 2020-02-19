import React, { Component } from 'react';
import { Grid, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import Board from './Board';

class Boards extends Component {
    constructor(props) {
        super(props);
        this.state = { boards: [], notes: [] };
    }

    componentDidMount() {
        this.getBoards();
        this.getNotes();
    }

    getBoards = () => {
        const { boards } = this.props;
        this.setState({ boards });
    }

    getNotes = () => {
        const { notes } = this.props;
        this.setState({ notes });
    }

    onBlurTextField = _id => {
        setTimeout(() => {
            console.log('onBlurTextField');
            const notes = [...this.state.notes];
            const textField = document.querySelector(`#textField${ _id }`);
            const text = notes.find(note => note._id === _id).text.trim();
            if (textField.value !== text) {
                textField.value = text;
                console.log('onBlurTextField', textField.value);
            }
        }, 250);
    }

    clickIcon = (iconType, _id) => {
        switch (iconType) {
            case 'clickAddIcon':
                return this.clickAddIcon();
            case 'clickSaveIcon':
                return this.clickSaveIcon(_id);
            case 'clickDeleteIcon':
                return this.clickDeleteIcon(_id);
            case 'clickSkipNextIcon':
                return this.clickSkipNextIcon(_id);
            default:
                return this.clickSkipPreviousIcon(_id);
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

    clickSaveIcon = _id => {
        console.log('clickSaveIcon');
        const notes = [...this.state.notes];
        const text = document.querySelector(`#textField${ _id }`).value.trim();
        if (!text) return;
        notes.forEach(note => note._id === _id ? note.text = text : null);
        this.setState({ notes });
        console.log('clickSaveIcon', notes);
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

    clickSkipNextIcon = _id => {
        console.log('clickSkipNextIcon');
        const notes = [...this.state.notes];
        notes.forEach(
            note => note._id === _id ? (
                note.type = note.type === 'ideas' ? 'to-do' :
                note.type === 'to-do' ? 'in-progress' :
                'done'
            ) :
            null
        );
        this.setState({ notes });
        console.log('clickSkipNextIcon', notes);
    }

    clickSkipPreviousIcon = _id => {
        console.log('clickSkipPreviousIcon');
        const notes = [...this.state.notes];
        notes.forEach(
            note => note._id === _id ? (
                note.type = note.type === 'to-do' ? 'ideas' :
                note.type === 'in-progress' ? 'to-do' :
                'in-progress'
            ) :
            null
        );
        this.setState({ notes });
        console.log('clickSkipPreviousIcon', notes);
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
                                    clickIcon={ this.clickIcon }
                                    onBlurTextField={ this.onBlurTextField }
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