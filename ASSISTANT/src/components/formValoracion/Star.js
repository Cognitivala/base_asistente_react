import React from 'react';

const Star = ({ limpiarError, colorHeader, selected = false, onClick = f => f }) => {
    return (
        <div className={selected ? "star selected" : "star"} onKeyUp={limpiarError} onClick={onClick} style={ selected && colorHeader ? { backgroundColor: `${colorHeader}` } : null } />
    )
};

  export default Star;