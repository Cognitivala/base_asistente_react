import React, { Component } from "react";

import './FormAsistencia.scss';

class FormAsistencia extends Component {
    state = { usuarioAmsa: '' }

    enviarAsistencia = (e) =>{
        e.preventDefault();
        if(this.state.inputAsistencia === null || this.state.inputAsistencia === 0 || this.state.inputAsistencia === '') {
            return false;
        }
        const data = {
            usuarioAmsa: this.state.inputAsistencia,
        }
        console.log('DATA VALORACIÓN:: ', data);
        // sendValoracion(data, general);
    }

    
    render() { 
        // let asistencia = document.querySelector('.boxAsistencia');
        // asistencia.classList.toggle('fade');

        return ( 
            <div  className={'conversationBubbleForm Send boxAsistencia ' + (this.props.asistencia ? 'fade' : '')}>
            <div className='containerForm'>
                <form autoComplete="off" onSubmit={this.enviarAsistencia}>
                    
                    <div className="headerForm">
                        <p>Gracias por utilizar nuestro chat. No dude en dejarnos cualquier comentario adicional.</p>
                    </div>   
                
                    <fieldset>
                        <legend style={{fontWeight: 100, marginBottom: '0.8rem'}}>
                            ¡Gracias por la valoración! Nos ayuda a seguir mejorando. Puedes dejar un mensaje adicional en el espacio siguiente
                        </legend>

                        <input name="asistencia" onChange={(e) => this.setState({usuarioAmsa: e.target.value})} />
                    </fieldset>

                    <fieldset>
                        <button type="submit">Enviar</button>
                    </fieldset>

                </form>
            </div>
        </div>
         );
    }
}
 
export default FormAsistencia;
