import React, { Component, useState } from "react";
import FormHeader from "./form-header";
import FormError from "./form-error";
import FormInput from "./form-input";
import FormTextarea from "./form-textarea";
import * as Validator from "./validator";
import FormSelect from "./form-select";
import FormSwitch from "./form-switch";
import IsFetching from "../modules/is-fetching";
import FormFile from "./form-file";
import FormSearch from "./form-search";
import FormSelectsLink from "./form-selects-link"
import logo from "../../assets/images/icono-cognitiva-2.svg";

// const Formulario = () => {
//   //STATES
//   const [invalidFields,setInvalidFields] = useState([]),
//     [validator,setValidator] = useState(false);

// }

export default class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidFiels: [],
      validator: false
    };
    this.validate = this.validate.bind(this);
    this.sendDataForm = this.sendDataForm.bind(this);
  }

  validate(validates, name, e) {
    const typesValidate = validates.get("types");
    // console.log('typesValidate:: ', typesValidate);
    let error = false;
    let input = e.target === undefined ? e : e.target;
    let arr = this.state.invalidFiels;

    arr = arr.filter(item => item !== name);

    let required = typesValidate.filter(item => item === "required");
    required = required.size > 0;
  
    typesValidate.forEach(map => {
      if (!Validator[map](input, validates, required)) error = true;
    });
  
    if (error) {
      arr.push(name);
    }
    this.setState({
      invalidFiels: arr
    });
  }

  validateAll(fields, fieldsDOM) {
    const { mainCss } = this.props;
    let arr = [];
    for (let i = 0; i < fieldsDOM.length; i++) {
      const map = fieldsDOM[i],
        field = fields.get(i);
      const name = field.get("name"),
        validates = field.get("validate"),
        typesValidate = validates.get("types");
      let input = map.elements[0],
        error = false,
        required = typesValidate.filter(item => item === "required");
      required = required.size > 0;
      input =
        input !== undefined
          ? input
          : map.getElementsByClassName(mainCss.Options)[0];

      arr = arr.filter(item => item !== name);
      typesValidate.forEach(map => {
        if (!Validator[map](input, validates, required)) error = true;
      });

      if (error) {
        arr.push(name);
      }
    }
    return arr;
  }

  closeForm() {
    const { generalStates: general, closeForm } = this.props,
      conversation = {
        general,
        msg: ["noContacto"],
        send: "to",
        enabled: false
      };

    closeForm(conversation);
  }

  sendDataForm(e) {
    const { form, sendForm, generalStates } = this.props,
      general = generalStates.toJS(),
      fields = form.get("fields"),
      fieldsDOM = e.target.closest("form").getElementsByTagName("fieldset"),
      arr = this.validateAll(fields, fieldsDOM),
      url = form.get("url");
    let dataForm = {};
    if (arr.length > 0) {
      this.setState({
        invalidFiels: arr
      });
    } else {
      //let arrayOut = [];
      for (let i = 0; i < fieldsDOM.length; i++) {
        let input = fieldsDOM[i].elements[0],
          value = input.value,
          name = input.name;
        dataForm[name] = value;
        //arrayOut.push({ name, value });
      }
      sendForm(dataForm, url, general);
    }
  }

  fillHeader(header) {
    if (header.size > 0) {
      const { generalStates, closeForm, colorHeader, mainCss } = this.props;
      return (
        <FormHeader
          icon={header.get("icon")}
          textA={header.get("textA")}
          textStrong={header.get("textStrong")}
          textB={header.get("textB")}
          closeMsg={header.get("closeMsg")}
          general={generalStates}
          closeForm={closeForm}
          colorHeader={colorHeader}
          mainCss={mainCss}
        />
      );
    } else {
      return null;
    }
  }

  fillError(withError, error) {
    const { mainCss } = this.props;
    return withError ? (
      <p>
        <small className={mainCss.Error}>{error}</small>
      </p>
    ) : null;
  }

  fillContent(fields) {
    const { mainCss } = this.props;
    if (fields.size > 0) {
      const retorno = [];
      fields.forEach((map, i) => {
        const withError = this.state.invalidFiels.includes(map.get("name"));
        switch (map.get("type")) {
          case "textarea":
            retorno.push(
              <fieldset key={i + map.get("name")}>
                <legend>{map.get("legend")}</legend>
                <FormTextarea
                  rows={map.get("rows")}
                  name={map.get("name")}
                  placeholder={map.get("placeholder")}
                  autocomplete={map.get("autocomplete")}
                  validateFunc={this.validate}
                  validate={map.get("validate")}
                  withError={withError}
                  mainCss={mainCss}
                />
                {this.fillError(withError, map.getIn(["validate", "error"]))}
              </fieldset>
            );
            break;
          case "select":
            retorno.push(
              <fieldset key={i + map.get("name")}>
                <legend>{map.get("legend")}</legend>
                <FormSelect
                  name={map.get("name")}
                  validateFunc={this.validate}
                  validate={map.get("validate")}
                  withError={withError}
                  options={map.get("options")}
                  mainCss={mainCss}
                />
                {this.fillError(withError, map.getIn(["validate", "error"]))}
              </fieldset>
            );
            break;
          case "search":
            retorno.push(
              <fieldset key={i + map.get("name")}>
                <legend>{map.get("legend")}</legend>
                <FormSearch
                  name={map.get("name")}
                  validateFunc={this.validate}
                  validate={map.get("validate")}
                  withError={withError}
                  options={map.get("options")}
                  mainCss={mainCss}
                />
                {this.fillError(withError, map.getIn(["validate", "error"]))}
              </fieldset>
            );
            break;
          case "selects-link":
            const withErrorParent = this.state.invalidFiels.includes(map.get("parent").get("name"));
            const withErrorChildren = this.state.invalidFiels.includes(map.get("children").get("name"));
            retorno.push(
              <FormSelectsLink
                key={i}
                selects={map} 
                withErrorParent={withErrorParent}
                withErrorChildren={withErrorChildren} 
                validateFunc={this.validate}
                mainCss={mainCss}
              />
            );
            break;
          case "checkbox":
            retorno.push(
              <fieldset key={i + map.get("name")}>
                <legend>{map.get("legend")}</legend>
                <FormSwitch
                  name={map.get("name")}
                  mainCss={mainCss}
                  validateFunc={this.validate}
                  validate={map.get("validate")}
                  withError={withError}
                />
                {this.fillError(withError, map.getIn(["validate", "error"]))}
              </fieldset>
            );
            break;
          case "file":
            const {
              attachFileForm,
              formularioStates,
              general,
              colorHeader,
              deleteFileForm
            } = this.props;
            retorno.push(
              <fieldset key={i + map.get("name")}>
                <legend>{map.get("legend")}</legend>
                <FormFile
                  validateFunc={this.validate}
                  validate={map.get("validate")}
                  withError={withError}
                  general={general}
                  attachFileForm={attachFileForm}
                  colorHeader={colorHeader}
                  type={map.get("type")}
                  name={map.get("name")}
                  formularioStates={formularioStates}
                  deleteFileForm={deleteFileForm}
                  attach={map.getIn(["validate", "rules"])}
                  mainCss={mainCss}
                />
                {this.fillError(withError, map.getIn(["validate", "error"]))}
              </fieldset>
            );
            break;
          default:
            retorno.push(
              <fieldset key={i + map.get("name")}>
                <legend>{map.get("legend")}</legend>
                <FormInput
                  type={map.get("type")}
                  name={map.get("name")}
                  placeholder={map.get("placeholder")}
                  autocomplete={map.get("autocomplete")}
                  validateFunc={this.validate}
                  validate={map.get("validate")}
                  withError={withError}
                  value={map.get("value")}
                  mainCss={mainCss}
                />
                {this.fillError(withError, map.getIn(["validate", "error"]))}
              </fieldset>
            );
            break;
        }
      });
      return retorno;
    } else {
      return null;
    }
  }

  content() {
    const { formularioStates, form, mainCss, animation, disableForm } = this.props,
      header = form.get("header"),
      bajada = form.get("bajada"),
      fields = form.get("fields"),
      error = formularioStates.get("error");
    return (
      <div
        className={
          mainCss.ConversationBubbleForm + " " + animation + " " + mainCss.Send
        }
      >
        <img className={mainCss.RoundedImg} src={logo} alt="" />

        <div className={mainCss.ContainerForm}>
          <form autoComplete="off">
            <div className={mainCss.closeFormContainer}>
              <button
                className={mainCss.closeFormButton}
                type="button"
                onClick={() => this.closeForm()}
              >
                x
              </button>
            </div>
            {this.fillHeader(header)}
            <p className={mainCss.Red}>{bajada}</p>
            {this.fillContent(fields)}
            <button
              type="button"
              onClick={this.sendDataForm}
              className={mainCss.ButtonSend}
            >
              Enviar
            </button>
          </form>
          <FormError error={error} mainCss={mainCss} />
        </div>
      </div>
    );
  }

  render() {
    const { formularioStates, customParamsStates,mainCss } = this.props,
      colorHeader = customParamsStates.getIn(["customParams", "colorHeader"]);
    return (
      <IsFetching
        isFetching={formularioStates.get("isFetching")}
        showChildren={true}
        colorHeader={colorHeader}
        mainCss={mainCss}
      >
        {this.content()}
      </IsFetching>
    );
  }
}
