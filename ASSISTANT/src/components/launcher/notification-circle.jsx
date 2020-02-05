import React from "react";

const NotificationCircle = (props) => {
  return (
    <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
      <span className={props.mainCss.BubbleLauncher} style={props.bubbleLogo === '' ? {left: '13.5rem'} : null}>1</span>
    </div>
  )
};

export default NotificationCircle;
