import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from '../../Components/Board'
import style from './style.css'
import { denormalize, normalize } from 'normalizr';
import {boardSchema} from './../../Schemas/Board'


class BoardContainer extends Component {

    render() {
        console.log(this.props.board.columns);
        return (
            <Board columns={this.props.board.columns}></Board>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { entities } = state.boardReducer;
    return {
       board: denormalize(1, boardSchema, entities)
    }
}

export default connect(mapStateToProps)(BoardContainer);