import React, { Component } from "react";

export default class IsFetching extends Component {
  render() {
    let content, children;
    if (this.props.isFetching) {
      if (this.props.showChildren) children = this.props.children;
      const {mainCss} = this.props;
      content = (
        <div>
          {children}
          <div className={mainCss.SpinnerHolder}>
            <div className={mainCss.Spinner}/>
          </div>
        </div>
      );
    } else {
      content = this.props.children;
    }
    return content;
  }
}
