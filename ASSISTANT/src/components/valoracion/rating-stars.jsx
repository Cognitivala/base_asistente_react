import React from "react";

const RatingStars = props => {
    let content = [];
    const {stars, clickStar} = props;
    for (let i = 0; i < 5; i++) {
      if (stars === 0) {
        content.push(star(i + 1, "",clickStar));
      } else if (i < stars) {
        content.push(star(i + 1, "active",clickStar));
      } else {
        content.push(star(i + 1, "",clickStar));
      }
    }
    return (
      <fieldset>
        <div className="ratingStars">{content}</div>
      </fieldset>
    );
};

const star = (i, classCss, clickStar) => {
    return (
      <a
        key={i}
        href="#;"
        className={classCss}
        rel="mx"
        onClick={clickStar}
      >
        <span>{i}</span>
        <i className="fas fa-star" />
      </a>
    );
  }

export default RatingStars;