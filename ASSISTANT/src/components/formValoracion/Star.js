import React from 'react';

const Star = ({ colorHeader, selected = false, onKeyUp = f => f, onClick = f => f }) => {
    return (
        <div className={selected ? "star selected" : "star"} onKeyUp={this.props.limpiarError} onClick={onClick} style={ selected && colorHeader ? { backgroundColor: `${colorHeader}` } : null } />
    )
};

  export default Star;