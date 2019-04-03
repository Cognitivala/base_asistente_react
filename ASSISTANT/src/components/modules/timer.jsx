const React = require("react");
// const ms = require('pretty-ms')
export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 1,
      seconds: 0,
      minutes: 0
    };
  }
  componentWillMount() {
    this.startTimer();
  }
  fillTimer() {
    const { time } = this.state,
     tiempoSegundos = 10;
    if (time > tiempoSegundos) {
      const minutes = time / tiempoSegundos,
        seconds = time % tiempoSegundos;
      this.setState({
        seconds,
        minutes: parseInt(minutes)
      });
    }else{
        this.setState({
            seconds: time
        })
    }
  }
  startTimer() {
    this.timer = setInterval(() => {
      this.setState({
        time: this.state.time + 1
      },this.fillTimer());
      
    }, 1000);
  }
  render() {
      const { minutes, seconds } = this.state,
        {mainCss} = this.props;
    return (
      <div className={mainCss.Timer}>
        <p>
          {minutes<10?"0"+minutes:minutes}:{seconds<10?"0"+seconds:seconds}
        </p>
      </div>
    );
  }
}
