import React, { Component } from "react";
import RatingStarsStar from "./rating-stars-star";

export default class RatingStars extends Component{

  fillStarValue(value){
    let content = [];
    const {mainCss} = this.props;

    switch (value) {
      case 0:
        content.push(<p key={0} style={{color:"transparent"}}>Debes valorar</p>);
        break;
      case 1:
        content.push(<p key={1}>Muy insatisfecho <span role="img" aria-label="">😡</span></p>);
        break;
      case 2:
        content.push(<p key={2}>No fue de mucha ayuda <span role="img" aria-label="">😞</span></p>);
        break;
      case 3:
        content.push(<p key={3}>Me ayudó, pero necesita mejorar <span role="img" aria-label="">😐</span></p>);
        break;
      case 4:
        content.push(<p key={4}>¡Buen servicio! <span role="img" aria-label="">🙂</span></p>);
        break;
      case 5:
        content.push(<p key={5}>¡Excelente servicio! <span role="img" aria-label="">😃</span></p>);
        break;
      default:
        break;
    }

    return <div key={6} className={mainCss.StarValue}>{content}</div>
  }

  render(){
    let content = [];
    const {over, stars, clickStar, overStar, overStarDefault, mainCss} = this.props;
    for (let i = 0; i < 5; i++) {
      if(over>0){//Si está en el hover
        if (i < over) {
          content.push(<RatingStarsStar key={i} i={i+1} over={true} clickStar={clickStar} mainCss={mainCss} overStar={overStar} overStarDefault={overStarDefault}/>);
        } else {
          content.push(<RatingStarsStar key={i} i={i+1} over={false} clickStar={clickStar} mainCss={mainCss} overStar={overStar} overStarDefault={overStarDefault}/>);
        }
      }else{
        if (stars === 0) {
          content.push(<RatingStarsStar key={i} i={i+1} active={false} clickStar={clickStar} mainCss={mainCss} overStar={overStar} overStarDefault={overStarDefault}/>);
        } else if (i < stars) {
          content.push(<RatingStarsStar key={i} i={i+1} active={true} clickStar={clickStar} mainCss={mainCss} overStar={overStar} overStarDefault={overStarDefault}/>);
        } else {
          content.push(<RatingStarsStar key={i} i={i+1} active={false} clickStar={clickStar} mainCss={mainCss} overStar={overStar} overStarDefault={overStarDefault}/>);
        }
      }
    }
    if(over>0){
      content.push(this.fillStarValue(over));
    }else{
      content.push(this.fillStarValue(stars));
    }
    return (
      <fieldset>
        <div className={mainCss.RatingStars}>
          <legend>¿Cómo valoraría el servicio en general? </legend>
          {content}
        </div>
      </fieldset>
    );
  }
}