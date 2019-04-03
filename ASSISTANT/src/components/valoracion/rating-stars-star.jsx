import React, { Component } from "react";

export default class RatingStarsStar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  content() {
    const {
      i,
      clickStar,
      mainCss,
      overStar,
      overStarDefault,
      over,
      active
    } = this.props;
    if (over !== undefined) {
      if (over) {
        return (
          <a
            key={i}
            href="#;"
            className={mainCss.ActiveStar}
            rel="mx"
            onClick={clickStar}
            onMouseOver={overStar}
            onMouseLeave={overStarDefault}
          >
            <span className={mainCss.Hide}>{i}</span>
            <i className="fas fa-star" />
          </a>
        );
      } else {
        return (
          <a
            key={i}
            href="#;"
            rel="mx"
            onClick={clickStar}
            onMouseOver={overStar}
            onMouseLeave={overStarDefault}
          >
            <span className={mainCss.Hide}>{i}</span>
            <i className="fas fa-star" />
          </a>
        );
      }
    } else {
      if (active) {
        return (
          <a
            key={i}
            href="#;"
            className={mainCss.ActiveStar}
            rel="mx"
            onClick={clickStar}
            onMouseOver={overStar}
            onMouseLeave={overStarDefault}
          >
            <span className={mainCss.Hide}>{i}</span>
            <i className="fas fa-star" />
          </a>
        );
      } else {
        return (
          <a
            key={i}
            href="#;"
            rel="mx"
            onClick={clickStar}
            onMouseOver={overStar}
            onMouseLeave={overStarDefault}
          >
            <span className={mainCss.Hide}>{i}</span>
            <i className="fas fa-star" />
          </a>
        );
      }
    }
  }

  render() {
    return this.content();
  }
}
