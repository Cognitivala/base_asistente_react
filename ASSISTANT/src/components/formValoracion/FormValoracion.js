import React, {useState} from "react";

import './FormValoracion.scss';

const FormValoracion = ({ mainCss }) => {

    const [respuesta, setRespuesta] = useState(null);
    const [starServicio, setStarServicio] = useState(0);
    const [overStarValue, setOverStarValue] = useState(0);
    const [mensajeAdicional, setMensajeAdicional] = useState('');
    const [active, setActive] = useState(false);

    const handleOptionChange = (e) => {
        console.log(e.target.value);
        if (e.target.value) {
            setRespuesta(e.target.value);
        } else {
            setRespuesta(e.target.value)
        }
    };

    const clickStar = (e) => {
        e.preventDefault();
        
        const _this = e.target.tagName === "I" ? e.target.closest("a") : e.target;
        const star = parseInt(
          _this.tagName === "SPAN"
            ? _this.innerText
            : _this.getElementsByTagName("span")[0].innerText
        );
        setStarServicio(star);
        console.log('starServicio:: ', starServicio);
      }

      const overStar = (e) => {
        e.preventDefault();
        const _this = e.target.tagName === "I" ? e.target.closest("a") : e.target;
        const star = parseInt(
          _this.tagName === "SPAN"
            ? _this.innerText
            : _this.getElementsByTagName("span")[0].innerText
        );
        setOverStarValue(star);
        console.log('setOverStar:: ', setOverStarValue);
      }


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
                    <input type="radio" name="desicion" value="si" 
                    checked={respuesta === 'si'} onChange={handleOptionChange} />
                </div>
            </label>
            <label>
                <div className="round">
                    <div className={respuesta === 'no' ?  "active circle" : " circle"}></div>No
                    <input type="radio" name="desicion" value="no" 
                    checked={respuesta === 'no'} onChange={handleOptionChange} />
                </div>
            </label>
        </fieldset>

        
    
        <fieldset>
            <div className="ratingStars">
                <legend>¿Cómo valoraría el servicio en general? </legend>
                
                <a href="#;" rel="mx" className={ starServicio === 1 ? "activeStar" : ''} onClick={clickStar} onMouseOver={overStar}>
                    <span className="hide">1</span>
                    <i className="fas fa-star"></i>
                </a>
                <a href="#;" rel="mx" className={ starServicio === 2 ? "activeStar" : ''}  onClick={clickStar}>
                    <span className="hide">2</span><i className="fas fa-star"></i>
                </a>
                <a href="#;" rel="mx" className={ starServicio === 3 ? "activeStar" : ''}  onClick={clickStar}>
                    <span className="hide">3</span><i className="fas fa-star"></i>
                </a>
                <a href="#;" rel="mx" className={ starServicio === 4 ? "activeStar" : ''}  onClick={clickStar}>
                    <span className="hide">4</span><i className="fas fa-star"></i>
                </a>
                <a href="#;" rel="mx" className={ starServicio === 5 ? "activeStar" : ''}  onClick={clickStar}>
                    <span className="hide">5</span>
                    <i className="fas fa-star"></i>
                </a>

                <div className="starValue">
                    <p>¡Excelente servicio! <span role="img" aria-label="">😃</span></p>
                </div>
            </div>
        </fieldset>
        
        <fieldset>
            <legend style={{fontWeight: 100, marginBottom: '0.8rem'}}>
                ¡Gracias por la valoración! Nos ayuda a seguir mejorando. Puedes dejar un mensaje adicional en el espacio siguiente
            </legend>
            <textarea name="por-que" id="por-que" rows="2"></textarea>
        </fieldset>
        <fieldset>
            <button type="button" data-msg="Sí" disabled="">Valorar</button>
        </fieldset>
        </form>
      </div>
    </div>
  );
};

export default FormValoracion;

