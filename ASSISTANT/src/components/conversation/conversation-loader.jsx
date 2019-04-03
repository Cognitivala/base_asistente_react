import React from "react";

const ConversationLoader = props => {
  if (props.active) {
    return (
      <div className={props.mainCss.Loader}>
        <span className={props.mainCss.Dot}/>
        <span className={props.mainCss.Dot}/>
        <span className={props.mainCss.Dot}/>
      </div>
    );
  } else {
    return null;
  }
};

export default ConversationLoader;
