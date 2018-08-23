import React, { Component } from "react";
import Header from "../header/header";
import Input from "../input/input";
import Help from "../help/help";
import Conversations from "../conversation/conversations";
import IsFetching from "../modules/is-fetching";
import Valoracion from "../valoracion/valoracion";

export default class Assistant extends Component {
  constructor(props) {
    super(props);
    this.closeAssistant = this.closeAssistant.bind(this);
  }

  closeAssistant() {
    window.top.postMessage(
      {
        test: [
          {
            msg: 'notification'
          }
        ]
      },
      "*"
    );
    this.props.closeAssistant();
  }

  fillHelp(ayuda) {
    if (ayuda) {
      return <Help {...this.props} />;
    }
  }

  valoracion(){
    const { valoracionStates } = this.props;
    if(valoracionStates.get('enabled')) return <Valoracion valoracionStates={valoracionStates} />
  }

  content(assistantStates) {
    if (assistantStates.get("active")) {
      const { customParamsStates } = this.props,
        ayuda = customParamsStates.get("customParams").get("settings").get("help");
      return (
        <div>
          <Header
            logo={customParamsStates.get("customParams").get("logo")}
            titulo={customParamsStates.get("customParams").get("titulo")}
            subtitulo={customParamsStates.get("customParams").get("subtitulo")}
            closeAssistant={this.closeAssistant}
            ayuda={ayuda}
            colorHeader={customParamsStates.get("customParams").get("colorHeader")}
            ayudaStates={this.props.ayudaStates}
            openHelp={this.props.openHelp}
            closeHelp={this.props.closeHelp}
            showWarningHelp={this.props.showWarningHelp}
            hideWarningHelp={this.props.hideWarningHelp}
          />
          {this.fillHelp(ayuda)}
          <Conversations {...this.props}/>
          <Input {...this.props}/>
          {this.valoracion()}
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const { assistantStates } = this.props;

    return (
      <IsFetching
        isFetching={assistantStates.get("isFetching")}
        showChildren={true}
      >
        {this.content(assistantStates)}
      </IsFetching>
    );
  }
}
