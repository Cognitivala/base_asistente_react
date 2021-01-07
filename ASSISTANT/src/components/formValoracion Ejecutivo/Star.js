import React from 'react';

const Star = ({ selected = false, onClick = f => f }) => {
    return (
        <div className={selected ? "star selected" : "star"} onClick={onClick} />
    )
};

  export default Star;