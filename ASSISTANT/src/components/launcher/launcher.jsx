import React, { Fragment, Component } from 'react';
import IsFetching from '../modules/is-fetching';
import Notification from './notification';
import NotificationCircle from './notification-circle';
import PropTypes from 'prop-types';

// import { store } from '../../store/store';
import { connect } from 'react-redux';
import { updateConversation } from '../../actions/index';

import './Launcher.scss';

class Launcher extends Component {
  constructor(props) {
    super(props);
    this.closeLauncher = this.closeLauncher.bind(this);
    this.closeAssistant = this.closeAssistant.bind(this);
    this.callAsyncData();
    this.launcher = React.createRef();
  }

  // componentDidMount(){
  //   // console.log('componentDidMount');
  //   const { openAssistant, closeLauncher} = this.props;
  //   if(window.outerWidth <= 767){
  //     openAssistant();
  //     closeLauncher();
  //   }
  // }

  componentWillMount() {
    const src = window.location.search;
    const urlParams = window.location;
    const polizasSitioPrivado = window.location.search;

    // console.log('src:: ', src);
    // console.log("urlParams:: ", urlParams);
    // console.log("polizasSitioPrivado:: ", polizasSitioPrivado);

    if (localStorage.getItem('previous_input') && polizasSitioPrivado) {
      const { generalStates } = this.props;
      const general = generalStates.toJS();
      const msg = localStorage.getItem('previous_input');
      const conversation = {
        general,
        msg: [msg],
        send: 'to',
        enabled: true,
      };
      // console.log('Desde previous_input: ', msg);
      this.props.updateConversation(conversation);
    }

    if (src === '?open=true') {
      const { closeLauncher, closeHelp, openAssistant, ayudaStates } = this.props;
      closeLauncher();
      this.openAssitantCDN();
      openAssistant();
      if (ayudaStates.get('open')) closeHelp();
      if (localStorage.getItem('hcm')) localStorage.removeItem('hcm');
    }
  }

  // componentDidMount(){
  //   const { customParamsStates } = this.props;
  //   const keep_conversation = customParamsStates.getIn([
  //     "keep_conversation"
  //   ]);
  //   console.log('this.props.store: ', this.props.updateConversation);

  //   if(localStorage.getItem('previous_input')) {
  //     console.log('previous_input:: ', localStorage.getItem('previous_input'));
  //     this.props.updateConversation('previous_input');
  //   }
  // }

  callAsyncData() {
    this.saludar();
  }

  saludar() {
    const { customParamsStates } = this.props;
    const keep_conversation = customParamsStates.getIn(['customParams', 'settings', 'keep_conversation']);
    const hc = localStorage.getItem('hc');

    if (!keep_conversation) {
      this.props.getSaludo();
    } else {
      if (!hc) {
        this.props.getSaludo();
      }
    }
  }

  closeAssistant() {
    const { closeAssistant } = this.props;
    this.notificationCDN();
    localStorage.removeItem('hcm');
    localStorage.removeItem('hc');

    // console.log('closeAssistant:: ', closeAssistant);
    closeAssistant();
  }

  openAssitantCDN() {
    window.top.postMessage(
      {
        test: [
          {
            msg: 'assistant',
          },
        ],
      },
      '*'
    );
  }

  notificationCDN() {
    window.top.postMessage(
      {
        test: [
          {
            msg: 'notification',
          },
        ],
      },
      '*'
    );
  }

  closeLauncher() {
    const { closeLauncher, closeHelp, openAssistant, ayudaStates } = this.props;
    closeLauncher();
    this.openAssitantCDN();
    openAssistant();
    if (ayudaStates.get('open')) closeHelp();
    if (localStorage.getItem('hcm')) localStorage.removeItem('hcm');
  }

  notification(launcherStates, mainCss, bubble_logo, bubble) {
    if (bubble) {
      if (launcherStates.get('notification') && !localStorage.getItem('hc')) {
        return <Notification saludo={launcherStates.get('notification')} mainCss={mainCss} bubbleLogo={bubble_logo} />;
      } else if (launcherStates.get('circle')) {
        return <NotificationCircle mainCss={mainCss} bubbleLogo={bubble_logo} />;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  content(customParamsStates, launcherStates, conversationsStates, mainCss, responsiveStates) {
    // console.log('responsive content:: ', responsiveStates.get("responsive"));
    if (customParamsStates.get(['customParams', 'status']) !== 0 && conversationsStates.get('conversations').size > 0) {
      if (launcherStates.get('active')) {
        const bubble_logo = customParamsStates.getIn(['customParams', 'bubble_logo']);
        const bubble = customParamsStates.getIn(['customParams', 'settings', 'bubble']);

        return (
          <Fragment>
            <div className={mainCss.MainLauncher}>
              {this.notification(launcherStates, mainCss, bubble_logo, bubble)}

              {bubble_logo.length > 0 ? (
                <div className='boxBubbleLogo'>
                  <img className='imgBubbleLogo' onClick={this.closeLauncher} src={`${bubble_logo}`} alt='Avatar Img' />
                </div>
              ) : (
                <button ref={this.launcher} className={mainCss.LauncherButton} onClick={this.closeLauncher}>
                  <i className={mainCss.IconLauncher} />
                </button>
              )}
            </div>
          </Fragment>
        );
      } else if (responsiveStates.get('responsive') === 'desktop') {
        // console.log('responsive:: ', responsiveStates.get("responsive"));
        return (
          <div className={mainCss.MainLauncher}>
            <button ref={this.launcher} className={mainCss.LauncherButton + ' ' + mainCss.Close} onClick={this.closeAssistant}>
              <i className={mainCss.IconClose} />
            </button>
          </div>
        );
      }
    }
    return null;
  }

  render() {
    const { customParamsStates, launcherStates, conversationsStates, mainCss, responsiveStates } = this.props,
      colorHeader = customParamsStates.getIn(['customParams', 'colorHeader']);

    return (
      <IsFetching isFetching={customParamsStates.get('isFetching')} showChildren={true} colorHeader={colorHeader} mainCss={mainCss}>
        {this.content(customParamsStates, launcherStates, conversationsStates, mainCss, responsiveStates)}
      </IsFetching>
    );
  }
}

Launcher.propTypes = {
  customParamsStates: PropTypes.any.isRequired,
  saludoStates: PropTypes.any.isRequired,
  launcherStates: PropTypes.any.isRequired,
  generalStates: PropTypes.any.isRequired,
};

export default connect(null, { updateConversation })(Launcher);
