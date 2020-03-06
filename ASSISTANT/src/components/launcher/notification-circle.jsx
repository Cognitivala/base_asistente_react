import React from "react";

const NotificationCircle = (props) => {
  // console.log('NotificationCircle:: ', props);
  return (
    <div>
      <span className={props.mainCss.BubbleLauncher} style={props.bubbleLogo === '' ? {left: '13.5rem'} : null}>1</span>
    </div>
  )
};

export default NotificationCircle;
