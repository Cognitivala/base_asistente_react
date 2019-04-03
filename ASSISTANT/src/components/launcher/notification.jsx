import React, { Component } from "react";
import PropTypes from 'prop-types';
import NotificationCircle from "./notification-circle";

export default class Notification extends Component {
  render() {
    const { mainCss } = this.props;
    return <NotificationCircle mainCss={mainCss}/>;
    // const { saludo, mainCss } = this.props;
    // return saludo.map((map,i)=>{
    //   return (
    //     <div key={i}>
    //       <NotificationCircle mainCss={mainCss}/>
    //       <div className="cognitive-assistant-notification-container">
    //         <div><span dangerouslySetInnerHTML={{__html: map}}></span></div>
    //         <button className="cognitive-assistant-notification-button-close">
    //           <i className="close-icon" />
    //         </button>
    //       </div>
    //     </div>
    //   );
    // });

  }
}

Notification.propTypes = {
  saludo: PropTypes.any.isRequired
}