import React, { Component } from "react";
import RatingStarsStar from "./rating-stars-star";

export default class RatingStars extends Component{
  render(){
    let content = [];
    const {over, stars, clickStar, colorHeader, overStar, overStarDefault} = this.props;
    for (let i = 0; i < 5; i++) {
      if(over>0){//Si está en el hover
        if (i < over) {
          content.push(<RatingStarsStar key={i} i={i+1} over={true} clickStar={clickStar} colorHeader={colorHeader} overStar={overStar} overStarDefault={overStarDefault}/>);
        } else {
          content.push(<RatingStarsStar key={i} i={i+1} over={false} clickStar={clickStar} colorHeader={colorHeader} overStar={overStar} overStarDefault={overStarDefault}/>);
        }
      }else{
        if (stars === 0) {
          content.push(<RatingStarsStar key={i} i={i+1} active={false} clickStar={clickStar} colorHeader={colorHeader} overStar={overStar} overStarDefault={overStarDefault}/>);
        } else if (i < stars) {
          content.push(<RatingStarsStar key={i} i={i+1} active={true} clickStar={clickStar} colorHeader={colorHeader} overStar={overStar} overStarDefault={overStarDefault}/>);
        } else {
          content.push(<RatingStarsStar key={i} i={i+1} active={false} clickStar={clickStar} colorHeader={colorHeader} overStar={overStar} overStarDefault={overStarDefault}/>);
        }
      }
    }
    return (
      <fieldset>
        <div className="ratingStars">{content}</div>
      </fieldset>
    );
  }
}


// const RatingStars = props => {
//     let content = [];
//     const {stars, clickStar, colorHeader} = props;
//     for (let i = 0; i < 5; i++) {
//       if (stars === 0) {
//         content.push(star(i + 1, "",clickStar, colorHeader));
//       } else if (i < stars) {
//         content.push(star(i + 1, "active",clickStar, colorHeader));
//       } else {
//         content.push(star(i + 1, "",clickStar, colorHeader));
//       }
//     }
//     return (
//       <fieldset>
//         <div className="ratingStars">{content}</div>
//       </fieldset>
//     );
// };

// const star = (i, classCss, clickStar, colorHeader) => {
//     const style = classCss!==""?{
//       color: colorHeader
//     }: {};

    
//     return (
//       <a
//         key={i}
//         href="#;"
//         style={style}
//         rel="mx"
//         onClick={clickStar}
//       >
//         <span>{i}</span>
//         <i className="fas fa-star" />
//       </a>
//     );
//   }

// export default RatingStars;