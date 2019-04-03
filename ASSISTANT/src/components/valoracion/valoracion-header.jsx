import React from "react";

const ValoracionHeader = props => {
  const { mainCss, closeValoracion } = props;
        return (
          <div className={mainCss.HeaderForm}>
          {/* <div className={mainCss.CloseForm}>
            <button type="button" onClick={closeValoracion} className={mainCss.Btn + " " + mainCss.BtnTransparent}>
              <i className="fas fa-times"/>
            </button>
          </div> */}
          <p>
              Gracias por utilizar nuestro chat. No dude en dejarnos cualquier comentario adicional.
          </p>
        </div>
        );
};

export default ValoracionHeader;
