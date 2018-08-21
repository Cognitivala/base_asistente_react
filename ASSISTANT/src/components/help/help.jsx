import React, { Component } from "react";
import IsFetching from "../modules/is-fetching";
import HelpBox from "./help-box";
import HelpWarning from "./help-warning";
// import PropTypes from "prop-types";

export default class Help extends Component {
  constructor(props) {
    super(props);
    this.callAsyncData();
  }
  callAsyncData() {
    const { ayudaStates } = this.props;
    if (ayudaStates.getIn(["ayuda", 0]).get("title") === "") {
      this.props.getAyuda();
    }
  }

  content(ayudaStates) {
    if (ayudaStates.getIn(["ayuda", 0]).get("title") !== "") {
      let css = ayudaStates.get('open')?" active":"";
      return (
        <div className={"assitant-helper"+css}>
          <HelpWarning ayudaStates={ayudaStates}/>
          <div className="bloqueo" />
          <p className="subtittle">
            Haz <strong>clic</strong> en los siguientes tópicos para{" "}
            <strong>obtener ayuda</strong> de cómo utilizar la asistencia online
          </p>
          {ayudaStates.get("ayuda").map((map, i) => {
            return <HelpBox ayuda={map} key={i} updateConversation={this.props.updateConversation} closeHelp={this.props.closeHelp}/>;
          })}
        </div>
      );
    } else {
      return <div />;
    }
  }

  render() {
    const { ayudaStates } = this.props;

    return (
      <IsFetching
        isFetching={ayudaStates.get("isFetching")}
        showChildren={true}
      >
        {this.content(ayudaStates)}
      </IsFetching>
    );
  }
}

