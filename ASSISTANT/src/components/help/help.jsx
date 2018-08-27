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

  content(ayudaStates,customParamsStates) {
    if (ayudaStates.getIn(["ayuda", 0]).get("title") !== "") {
      let css = ayudaStates.get('open')?" active":"";
      const colorHeader = customParamsStates.getIn(["customParams","colorHeader"]),
        style = {
          backgroundColor: colorHeader
        };
      
      return (
        <div className={"assitant-helper"+css} style={style}>
          <HelpWarning ayudaStates={ayudaStates}/>
          <p className="subtittle">
            Haz <strong>clic</strong> en los siguientes tópicos para{" "}
            <strong>obtener ayuda</strong> de cómo utilizar la asistencia online
          </p>
          {ayudaStates.get("ayuda").map((map, i) => {
            return <HelpBox  colorHeader={colorHeader} ayuda={map} key={i} updateConversation={this.props.updateConversation} closeHelp={this.props.closeHelp} generalStates={this.props.generalStates}/>;
          })}
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const { ayudaStates, customParamsStates } = this.props;

    return (
      <IsFetching
        isFetching={ayudaStates.get("isFetching")}
        showChildren={true}
      >
        {this.content(ayudaStates,customParamsStates)}
      </IsFetching>
    );
  }
}

