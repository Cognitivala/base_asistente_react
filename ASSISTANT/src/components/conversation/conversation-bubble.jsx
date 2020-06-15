import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ConversationBubble extends Component {

  render() {
    const { msg, send, mainCss, extensionDoc, tipoExtencion } = this.props;

    if(msg === "exito_formulario") {
      return null;
    }

    if (send === "to") {
      return (
        <div className={mainCss.Bubble}>
          <span
            className={mainCss.BubbleText}
            dangerouslySetInnerHTML={{ __html: msg }}
          />
        </div>
      );
    } else {
      
      if ( tipoExtencion === 'media'
        // extensionDoc === 'pdf' || extensionDoc === "jpg" || extensionDoc === "jpeg" || 
        // extensionDoc === "bmp" || extensionDoc === "doc" || extensionDoc === "docx" || 
        // extensionDoc === "odt" // Validacion de Extenciones permitidas
        ) {
        return (
          <div className={mainCss.Bubble}>
              {/* <a href={msg} target="_blank" rel="noopener noreferrer">{msg}</a> */}
              {/* <button className={mainCss.Btn + " "} type="button" onClick={()=> descargarDoc(msg)}>Descargar Documento</button> */}
              <a style={{width: '100%', fontWeight: '500'}} className={mainCss.Btn + " "} 
                type="button" href={msg} 
                target="_blank"
                rel="noopener noreferrer" download>
                Descargar Documento
              </a>
          </div>
        );
      } else {
        return (
          <div className={mainCss.Bubble}>
            <span
              className={mainCss.BubbleText}
              dangerouslySetInnerHTML={{ __html: msg }}
            />
          </div>
        );
      }
      
    }
  }
}

ConversationBubble.propTypes = {
  msg: PropTypes.any.isRequired,
  send: PropTypes.any,
  mainCss: PropTypes.any.isRequired
};
