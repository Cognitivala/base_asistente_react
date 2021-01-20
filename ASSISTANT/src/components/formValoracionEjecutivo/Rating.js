import React, { useState } from "react";
import Star from './Star';
  
  const StarRating = ({ totalStars }) => {
    const [starsSelected, selectStar] = useState(0);

    // console.log('star', starsSelected);

    const style = {
        boxStar: {
            width: '100%',
            display: 'flex',
            alignItems:'flex-end',
            justifyContent: 'flex-start',
            marginBottom: '10px',
        }
    }
    
    return (
      <div className="star-rating">
        <div  style={style.boxStar}>
        {[...Array(totalStars)].map((n, i) => (
          
          <Star
            key={i}
            selected={i < starsSelected}
            onClick={() => selectStar(i + 1)}
          />
          
        ))}
        </div>
        
        <div>
            { starsSelected === 0 && <p>Seleccione su valoración</p> }
            { starsSelected === 1 && <p>Muy insatisfecho <span role="img" aria-label="">😡</span></p> }
            { starsSelected === 2 && <p>No fue de mucha ayuda <span role="img" aria-label="">😞</span></p> }
            { starsSelected === 3 && <p>Me ayudó, pero necesita mejorar <span role="img" aria-label="">😐</span></p> }
            { starsSelected === 4 && <p>¡Buen servicio! <span role="img" aria-label="">🙂</span></p> }
            { starsSelected === 5 && <p>¡Excelente servicio! <span role="img" aria-label="">😃</span></p> }
        </div>
      </div>
    );
  };
 
export default StarRating;