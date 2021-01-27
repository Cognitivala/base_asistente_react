import React from 'react';

const NotificationCircle = (props) => {
  // console.log('NotificationCircle:: ', props);
  return (
    <div style={{position: 'relative'}}>
      <span className={props.mainCss.BubbleLauncher}>
        1
      </span>
    </div>
  );
};

export default NotificationCircle;
