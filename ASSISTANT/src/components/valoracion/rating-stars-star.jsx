import React, { Component } from "react";

export default class RatingStarsStar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
    // this.inHover = this.inHover.bind(this);
    // this.outHover = this.outHover.bind(this);
  }

//   inHover(e){
//     this.setState({hover:true});
//   }

//   outHover(e){
//     this.setState({hover:false});
//   }

  content() {
    const { i, clickStar, colorHeader, overStar,overStarDefault, over, active } = this.props,
        style = { color: colorHeader };
    if(over!==undefined){
        if(over){
            return (
                <a key={i} href="#;" style={style} rel="mx" onClick={clickStar} onMouseOver={overStar} onMouseLeave={overStarDefault}>
                  <span>{i}</span>
                  <i className="fas fa-star" />
                </a>
              );
            } else {
                return (
                    <a key={i} href="#;" rel="mx" onClick={clickStar} onMouseOver={overStar} onMouseLeave={overStarDefault}>
                      <span>{i}</span>
                      <i className="fas fa-star" />
                    </a>
                  );
            }
    }else{
        if (active) {
          return (
            <a key={i} href="#;" style={style} rel="mx" onClick={clickStar} onMouseOver={overStar} onMouseLeave={overStarDefault}>
              <span>{i}</span>
              <i className="fas fa-star" />
            </a>
          );
        } else {
            return (
                <a key={i} href="#;" rel="mx" onClick={clickStar} onMouseOver={overStar} onMouseLeave={overStarDefault}>
                  <span>{i}</span>
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
