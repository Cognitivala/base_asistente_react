import React, { Component } from "react";
import IsFetching from "../modules/is-fetching";
import HelpBox from "./help-box";
import HelpWarning from "./help-warning";
// import PropTypes from "prop-types";

export default class Help extends Component {
  constructor(props) {
    super(props);
    this.help = React.createRef();
    this.callAsyncData();
  }
  callAsyncData() {
    const { ayudaStates } = this.props;
    if (ayudaStates.getIn(["ayuda", 0]).get("title") === "") {
      this.props.getAyuda();
    }
  }

  componentDidUpdate(){
    const { mainCss, ayudaStates } = this.props;
    if(ayudaStates.get('open')){
      setTimeout(() => {
        this.help.current.classList.add(mainCss.Active);
      }, 0);
    }else{
      this.help.current.classList.remove(mainCss.Active);
    }
  }

  content(ayudaStates,positionHelp) {
    const {mainCss} = this.props;
    let css2 = positionHelp==="bottom"?mainCss.AssistantDown+" ":" ";
    if (ayudaStates.getIn(["ayuda", 0]).get("title") !== "" && ayudaStates.get('open')) {
      return (
        <div ref={this.help} className={ css2 + mainCss.AssistantHelper}>
          <HelpWarning ayudaStates={ayudaStates} mainCss={mainCss}/>
          <h3>Ayuda</h3>
          <p className={mainCss.Subtittle}>
            Haz <strong>clic</strong> en los siguientes tópicos para{" "}
            <strong>obtener ayuda</strong> de cómo utilizar la asistencia online.
            Te recuerdo que para responder correctamente, debes considerar tu opción elegida, es decir <strong>“Cursos y Diplomados”</strong> o <strong>“Admisión y Matrícula”</strong>.
          </p>
          {ayudaStates.get("ayuda").map((map, i) => {
            return <HelpBox  mainCss={mainCss} ayuda={map} key={i} updateConversation={this.props.updateConversation} closeHelp={this.props.closeHelp} generalStates={this.props.generalStates}/>;
          })}
        </div>
      )
    } else {
      return (
        <div ref={this.help} className={ css2 + mainCss.AssistantHelper}>
          <HelpWarning ayudaStates={ayudaStates} mainCss={mainCss}/>
        </div>
      );
    }
  }

  render() {
    const { ayudaStates, customParamsStates, mainCss } = this.props,
    colorHeader = customParamsStates.getIn(["customParams","colorHeader"]),
    positionHelp = customParamsStates.getIn(["customParams","settings","positionHelp"]);
    return (
      <IsFetching
        isFetching={ayudaStates.get("isFetching")}
        showChildren={true}
        colorHeader={colorHeader}
        mainCss={mainCss}
      >
        {this.content(ayudaStates, positionHelp)}
      </IsFetching>
    );
  }
}

