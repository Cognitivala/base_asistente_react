import React from 'react';

const Star = ({ colorHeader, selected = false, onClick = f => f }) => {
    return ( <
        div className = { selected ? "star selected" : "star" }
        onClick = { onClick }
        style = { colorHeader ? { backgroundColor: `${colorHeader}` } : null }
        />
    )
};

export default Star;