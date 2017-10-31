import React from 'react';
import Column from '../../Components/Column'
import style from './style.css'
import PropTypes from 'prop-types';

const Board = (props) => {



    return (
        props.columns.map(c => <Column key={c.id} column={c}></Column>)
    );
};

Board.propTypes = {
    columns: PropTypes.array
};


export default Board;