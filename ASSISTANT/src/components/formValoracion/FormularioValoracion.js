import React, {Component} from 'react'

class FormularioValoracion extends Component {
    state = { 
        respuesta: 'si',
        starsSelected: 0,
        mensajeAdicional: ''
     }
    render() { 
        return ( 
            <h2>Hola! {this.state.respuesta}</h2>
         );
    }
}
 
export default FormularioValoracion;