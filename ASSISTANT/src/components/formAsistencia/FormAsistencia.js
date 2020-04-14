import React, { Component, createRef, Fragment } from "react";
import {connect} from 'react-redux';

import {updateConversation} from '../../actions/index';
import {messageResponse} from '../../actions/index';
import { Element } from "react-scroll";

import './FormAsistencia.scss';

class FormAsistencia extends Component {

    
    scrollingElement = (document.scrollingElement || document.body);

    constructor(props) {
        super(props)
        this.state = { usuarioAmsa: '', mensajeError: false }
        // this.RefDiv = React.createRef();
    }

    

    enviarAsistencia = async (e) =>{
        e.preventDefault();
        const {updateConversation, updateConversationButton, setUrlParams} = this.props;
        const { generalStates } = this.props;
        const general = generalStates.toJS();

        // console.log('general.integracion:: ', general.integracion);

        let integracion = general.integracion;
        let url_params = general.url_params;

        if(this.state.usuarioAmsa === null || this.state.usuarioAmsa === 0 || this.state.usuarioAmsa === '') {
            this.setState({...this.state, mensajeError: true});
            return false;
        }

        // const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        let RegExPatternEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        const validEmail = RegExPatternEmail.test(String(this.state.usuarioAmsa).toLowerCase());

        if (validEmail === false) {
            this.setState({...this.state, mensajeError: true});
            return false;
        }


        localStorage.setItem("email_user", this.state.usuarioAmsa);
        
        // const conversation = {
        //     // general: {
        //     //     ...general,
        //     //     url_params: {...url_params, email_user: this.state.usuarioAmsa },
        //     //     integracion: {...integracion, email_user: this.state.usuarioAmsa },
        //     // },
            
        //     general: { ...general},
        //     email_user: this.state.usuarioAmsa
        // };
        
        // await setIntegracion(this.state.usuarioAmsa);
        // await updateConversation(conversation);
        // await updateConversationButton(conversation);

        // await setUrlParams(this.state.usuarioAmsa);
        // CIERRA MODAL
        this.props.getAsistencia(false);

    }

    // componentDidMount() {
    //     this.myRef.current.scrollTo(0, 500);
    //     window.scrollTo(0, 500);
    //     var objDiv = document.getElementById("scrollBottom");
    //     objDiv.scrollTop = objDiv.scrollHeight;
    // }
    


    // componentDidUpdate() {
    //     this.myRef.current.scrollTo(0, 500);
    //     window.scrollTo(0, 500);
    //     var objDiv = document.getElementById("scrollBottom");
    //     objDiv.scrollTop = objDiv.scrollHeight;
    // }

    
    
    render() { 
        // let asistencia = document.querySelector('.boxAsistencia');
        // asistencia.classList.toggle('fade');

        return ( 
            <Fragment>
            <div className={'conversationBubbleForm Send boxAsistencia ' + (this.props.asistencia ? 'fade' : '')}>
                <div className='containerForm'>
                    <form  autoComplete="off" onSubmit={this.enviarAsistencia}>
                    
                        <div ref={this.myRef} className="headerForm">
                            <p>Ingrese el email de Usuario</p>
                        </div>   
                
                        <fieldset style={{ marginBottom: '1.5rem', marginTop: '1.5rem'}}>
                            <input placeholder='Ej: juan@perez.cl' name="asistencia" onChange={(e) => this.setState({usuarioAmsa: e.target.value})} />
                        </fieldset>

                            { this.state.mensajeError && 
                                <legend style={{fontWeight: 100, color: 'red', marginBottom: '1.5rem'}}>
                                    <b>*Debe ingresar un Email válido.</b>
                                </legend>
                            }

                        <fieldset>
                            <button type="submit">Enviar</button>
                        </fieldset>

                    </form>
                </div>
            </div>

            <Element name="scrollbottom">
                <section> </section>
            </Element>
            </Fragment>
         );
    }
}

const mapDispatchToProps = {
    updateConversation,
};
 
export default connect(null, mapDispatchToProps)(FormAsistencia);
