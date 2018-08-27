import React from "react";

const RatingStars = props => {
    let content = [];
    const {stars, clickStar, colorHeader} = props;
    for (let i = 0; i < 5; i++) {
      if (stars === 0) {
        content.push(star(i + 1, "",clickStar, colorHeader));
      } else if (i < stars) {
        content.push(star(i + 1, "active",clickStar, colorHeader));
      } else {
        content.push(star(i + 1, "",clickStar, colorHeader));
      }
    }
    return (
      <fieldset>
        <div className="ratingStars">{content}</div>
      </fieldset>
    );
};

const star = (i, classCss, clickStar, colorHeader) => {
    const style = classCss!==""?{
      color: colorHeader
    }: {};

    
    return (
      <a
        key={i}
        href="#;"
        style={style}
        rel="mx"
        onClick={clickStar}
      >
        <span>{i}</span>
        <i className="fas fa-star" />
      </a>
    );
  }

export default RatingStars;