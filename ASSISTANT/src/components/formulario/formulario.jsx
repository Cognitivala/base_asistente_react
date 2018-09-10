import React, { Component } from "react";
import FormHeader from "./form-header";
import FormError from "./form-error";
import FormInput from "./form-input";
import FormTextarea from "./form-textarea";
import * as Validator from "./validator";
import FormSelect from "./form-select";
import FormCheckbox from "./form-checkbox";
import FormSwitch from "./form-switch";

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
    let error = false,
      input = e.target === undefined ? e : e.target,
      arr = this.state.invalidFiels;
    arr = arr.filter(item => item !== name);
    let required = typesValidate.filter(item => item === "required");
    required = required.size > 0;
    typesValidate.map((map, i) => {
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
    let arr = [];
    for (let i = 0; i < fieldsDOM.length; i++) {
      const map = fieldsDOM[i],
        field = fields.get(i),
        name = field.get("name"),
        validates = field.get("validate"),
        typesValidate = validates.get("types");
      let input = map.elements[0],
        error = false,
        required = typesValidate.filter(item => item === "required");

      required = required.size > 0;

      input = input !== undefined ? input : map.getElementsByClassName("options")[0];

      arr = arr.filter(item => item !== name);

      typesValidate.map((map, i) => {
        if (!Validator[map](input, validates, required)) error = true;
      });

      if (error) {
        arr.push(name);
      }
    }
    return arr;
  }

  closeForm() {
    const { general } = this.props,
      conversation = {
        general,
        msg: ["No"],
        send: "to",
        enabled: false
      };
    this.props.closeForm(conversation);
  }

  sendDataForm(e) {
    const { form } = this.props,
      fields = form.get("fields"),
      fieldsDOM = e.target.closest("form").getElementsByTagName("fieldset"),
      arr = this.validateAll(fields, fieldsDOM);
    if (arr.length > 0) {
      this.setState({
        invalidFiels: arr
      });
    } else {
      this.closeForm();
    }
  }

  fillHeader(header) {
    if (header.size > 0) {
      const { general, closeForm, colorHeader } = this.props;
      return (
        <FormHeader
          icon={header.get("icon")}
          textA={header.get("textA")}
          textStrong={header.get("textStrong")}
          textB={header.get("textB")}
          closeMsg={header.get("closeMsg")}
          general={general}
          closeForm={closeForm}
          colorHeader={colorHeader}
        />
      );
    } else {
      return null;
    }
  }

  fillError(withError, error) {
    return withError ? (
      <p>
        <small className="error">{error}</small>
      </p>
    ) : null;
  }

  fillContent(fields) {
    if (fields.size > 0) {
      const retorno = [];
      fields.map((map, i) => {
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
                />
                {this.fillError(withError, map.getIn(["validate", "error"]))}
              </fieldset>
            );
            break;
          case "checkbox":
            retorno.push(
              <fieldset key={i + map.get("name")}>
                <legend>{map.get("legend")}</legend>
                <FormSwitch
                  name={map.get("name")}
                  validateFunc={this.validate}
                  validate={map.get("validate")}
                  withError={withError}
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
    const { formularioStates, form } = this.props,
      header = form.get("header"),
      bajada = form.get("bajada"),
      fields = form.get("fields"),
      error = formularioStates.get("error");
    return (
      <div className="mymodal show">
        <div className="overflow">
          <div className="container-form">
            <form autoComplete="off">
              {this.fillHeader(header)}
              <p className="red">{bajada}</p>
              {this.fillContent(fields)}
              <button type="button" onClick={this.sendDataForm}>
                Enviar
              </button>
            </form>
          </div>
        </div>
        <FormError error={error} />
        <div className="overlay" />
      </div>
    );
  }

  render() {
    return this.content();
  }
}
