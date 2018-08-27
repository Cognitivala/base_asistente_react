import React from "react";
import ValoracionRadios from "./valoracion-radios";

const ValoracionThanThree = props => {
  const { stars, commentError, pudoResolverError, setPudoResolver,setComment } = props;
  let commentCss = commentError ? "error" : "",
    pudoResolverCss = pudoResolverError ? "error" : "";
  if (stars === 0) {
    return <div className="bkg-gray hide" />;
  } else if (stars <= 3) {
    return (
      <div className="bkg-gray" id="less-than-3">
        <ValoracionRadios pudoResolverCss={pudoResolverCss} setPudoResolver={setPudoResolver} />
        <fieldset>
          <legend>Cuéntanos ¿qué mejorarías?</legend>
          <textarea
            name="por-que"
            id="por-que"
            rows="3"
            onKeyUp={setComment}
            className={commentCss}
          />
        </fieldset>
      </div>
    );
  } else {
    return (
      <div className="bkg-gray" id="more-than-3">
        <fieldset>
          <legend>Cuéntanos ¿por qué evalúas con esta nota?</legend>
          <textarea
            name="por-que"
            id="por-nota"
            rows="3"
            onKeyUp={setComment}
            className={commentCss}
          />
        </fieldset>
      </div>
    );
  }
};

export default ValoracionThanThree;
