import React, { Component } from "react";
import {connect} from 'react-redux';

import {updateConversation} from '../../actions/index';

import './FormAsistencia.scss';

class FormAsistencia extends Component {
    state = { usuarioAmsa: '' }

    

    enviarAsistencia = (e) =>{
        e.preventDefault();
        const {updateConversation} = this.props;
        console.log('this.props:: ', this.props);

        if(this.state.inputAsistencia === null || this.state.inputAsistencia === 0 || this.state.inputAsistencia === '') {
            return false;
        }
        const data = {
            usuarioAmsa: this.state.inputAsistencia,
        }

        const { generalStates } = this.props;
        const general = generalStates.toJS();
        const conversation = {
            general,
            usuarioAmsa: this.state.inputAsistencia,
        };
        
        
        updateConversation(conversation);
    }

    
    render() { 
        // let asistencia = document.querySelector('.boxAsistencia');
        // asistencia.classList.toggle('fade');

        return ( 
            <div  className={'conversationBubbleForm Send boxAsistencia ' + (this.props.asistencia ? 'fade' : '')}>
            <div className='containerForm'>
                <form autoComplete="off" onSubmit={this.enviarAsistencia}>
                    
                    <div className="headerForm">
                        <p>Ingrese el email de Usuario</p>
                    </div>   
                
                    <fieldset style={{ marginBottom: '1.5rem', marginTop: '1.5rem'}}>
                        {/* <legend style={{fontWeight: 100, marginBottom: '0.8rem'}}>
                            ¡Gracias por la valoración! Nos ayuda a seguir mejorando. Puedes dejar un mensaje adicional en el espacio siguiente
                        </legend> */}

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

const mapDispatchToProps = {
    updateConversation,
};
 
export default connect(null, mapDispatchToProps)(FormAsistencia);
