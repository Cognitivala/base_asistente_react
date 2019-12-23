import React, {useState} from 'react';
import './FormValoracion.scss';

const FormularioValoracion = () => {

    const [respuesta, setRespuesta] = useState('si');
    // const [starsSelected, selectStar] = useState(0);
    // const [mensajeAdicional, setMensajeAdicional] = useState('');

    const style = {
        boxStar: {
            width: '100%',
            display: 'flex',
            alignItems:'flex-end',
            justifyContent: 'flex-start',
            marginBottom: '10px',
        }
    }

    const handleOptionChange = (e) => {
        console.log(e.target.value);
        if (e.target.value) {
            // setRespuesta(e.target.value);
        } else {
            // setRespuesta(e.target.value)
        }
    };

    return ( 
        <div className='conversationBubbleForm Send'>
      {/* <img className={mainCss.RoundedImg} src={} alt="" /> */}

      <div className='containerForm'>
      
      <form autoComplete="off">
        
        <div className="headerForm">
            <p>Gracias por utilizar nuestro chat. No dude en dejarnos cualquier comentario adicional.</p>
        </div>
        
        <fieldset className="radios">
            <legend>¿Su caso o inquietud fueron resueltas?</legend>
            <label>
                <div className="round">
                    <div className={respuesta === 'si' ?  "active circle" : " circle"}></div>Sí
                    <input type="radio" name="desicion" value='si' 
                    checked={respuesta === 'si'} onChange={handleOptionChange} />
                </div>
            </label>
            {/* <label>
                <div className="round">
                    <div className={respuesta === 'no' ?  "active circle" : " circle"}></div>No
                    <input type="radio" name="desicion" value='no' 
                    checked={ respuesta === 'no' } onChange={handleOptionChange} />
                </div>
            </label> */}
        </fieldset>

        <fieldset>
            {/* <StarRating totalStars={5} /> */}

            <div className="star-rating">
                <div  style={style.boxStar}>
                    {/* {[...Array(totalStars)].map((n, i) => (
                        <Star key={i} selected={i < starsSelected} onClick={() => selectStar(i + 1)} />
                    ))} */}
                </div>
        
                {/* <div>
                    { starsSelected === 0 && <p>Seleccione su valoración</p> }
                    { starsSelected === 1 && <p>Muy insatisfecho <span role="img" aria-label="">😡</span></p> }
                    { starsSelected === 2 && <p>No fue de mucha ayuda <span role="img" aria-label="">😞</span></p> }
                    { starsSelected === 3 && <p>Me ayudó, pero necesita mejorar <span role="img" aria-label="">😐</span></p> }
                    { starsSelected === 4 && <p>¡Buen servicio! <span role="img" aria-label="">🙂</span></p> }
                    { starsSelected === 5 && <p>¡Excelente servicio! <span role="img" aria-label="">😃</span></p> }
                </div> */}
            </div>
        </fieldset>
    
        <fieldset>
            <legend style={{fontWeight: 100, marginBottom: '0.8rem'}}>
                ¡Gracias por la valoración! Nos ayuda a seguir mejorando. Puedes dejar un mensaje adicional en el espacio siguiente
            </legend>
            {/* <textarea name="por-que" rows="2" onChange={(e) => setMensajeAdicional(e.target.value)}></textarea> */}
        </fieldset>

        <fieldset>
            <button type="submit" >Valorar</button>
        </fieldset>
        </form>
      </div>
    </div>
     );
}
 
export default FormularioValoracion;