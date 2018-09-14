import React, { Component } from "react";

export default class IsFetching extends Component {
  render() {
    let content, children;
    if (this.props.isFetching) {
      if (this.props.showChildren) children = this.props.children;
      content = (
        <div style={{borderLeft:"2px solid"+this.props.colorHeader}}>
          {children}
          <div className="spinner-holder">
            <div className="spinner" />
          </div>
        </div>
      );
    } else {
      content = this.props.children;
    }
    return content;
  }
}
