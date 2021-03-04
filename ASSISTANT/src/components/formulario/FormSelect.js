import React, { Component } from 'react';

export default class formSelect extends Component {
  state = {
    selected: '',
  };

  handleOnChange = (e) => {
    const { validate, name, mainCss, validateFunc } = this.props;

    validateFunc(validate, name, e);
    this.setState({
      selected: e.target.value,
    });
  };

  render() {
    const { name, options } = this.props;

    return (
      <select name={name} onChange={this.handleOnChange} value={this.state.selected}>
        <option value=''>Seleccionar Categoría</option>
        {options.map((item) => {
          return (
            <option key={item.get('value')} value={item.get('value')}>
              {item.get('text')}
            </option>
          );
        })}
      </select>
    );
  }
}
