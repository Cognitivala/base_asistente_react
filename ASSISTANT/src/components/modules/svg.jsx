import React, { Component } from "react";

export default class Svg extends Component {
  render() {
    // "M143,352.3,7,216.3a23.9,23.9,0,0,1,0-33.9H7a24.291,24.291,0,0,1,34.223,0L159.9,306.2,281.937,182.4c9.4-9.4,21.563-9.4,30.863,0h0a23.9,23.9,0,0,1,0,33.9l-136,136a23.781,23.781,0,0,1-33.8,0Z"
    //"translate(0.05 -175.35)"
    const { d, transform, style, viewBox, className } = this.props;
    return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
        <defs />
        <path
          id="angle-down-solid"
          style={style}
          d={d}
          transform={transform}
        //   className={className}
        />
      </svg>
    );
  }
}
