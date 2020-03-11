import React, {useState} from 'react';

// import logoCognitiva from '../../assets/images/powered-by-cognitiva.svg';
import './FormAsistencia.scss';



const FormAsistencia = ({ generalStates, sendValoracion}) => {

    const general = generalStates.toJS();

    const [inputAsistencia, setInputAsistencia] = useState('');

    const enviarAsistencia = (e) =>{
        // console.log('Llegué a enviarValoracion:: ');
        e.preventDefault();
        if(inputAsistencia === null || inputAsistencia === 0 || inputAsistencia === '') {
            return false;
        }
        const data = {
            input: inputAsistencia,
        }
        // console.log('DATA VALORACIÓN:: ', data);
        // sendValoracion(data, general);
    }

    return (
        <div className='conversationBubbleForm Send'>
      {/* <img className={mainCss.RoundedImg} src={} alt="" /> */}

      <div className='containerForm'>
      
      <form autoComplete="off" onSubmit={enviarAsistencia}>
        
        <div className="headerForm">
            <p>Gracias por utilizar nuestro chat. No dude en dejarnos cualquier comentario adicional.</p>
        </div>   
    
        <fieldset>
            <legend style={{fontWeight: 100, marginBottom: '0.8rem'}}>
                ¡Gracias por la valoración! Nos ayuda a seguir mejorando. Puedes dejar un mensaje adicional en el espacio siguiente
            </legend>

            <input name="por-que" rows="2" onChange={(e) => setInputAsistencia(e.target.value)}></input>
        </fieldset>

        <fieldset>
            <button type="submit" >Enviar</button>
        </fieldset>
        </form>
      </div>
    </div>
    )
}

export default FormAsistencia
