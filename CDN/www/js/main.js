(function(window, document) {
  "use strict";
  class mainHandlers {
    constructor() {}

    /**
     * Init, recibe la URL del Asistente
     */
    init(src) {
      this.src = src;
      this.createIframe();
      // this.getVersionAssets();
    }

    createIframe(){
      var div = document.createElement('div'),
        ifrm = document.createElement('iframe');
        
        ifrm.setAttribute('id', 'ifrm-assitant');
        ifrm.classList.add('iframe-cognitive-assistant-container');
        ifrm.classList.add('active');
        ifrm.classList.add('notification');
        ifrm.setAttribute("allow","geolocation *;");
      ifrm.setAttribute('src', this.src);
      div.appendChild(ifrm);
      document.body.appendChild(div);
      this.basicStylesSetUp();
      window.onmessage = e => {
        const mensaje = e.data.test[0].msg;
        this.styleIframe(mensaje);
      };
    }

    styleIframe(classStyle){
      const iframeClasslist = document.getElementById('ifrm-assitant').classList;
      switch (classStyle) {
        case "assistant":
          iframeClasslist.add(classStyle);
          iframeClasslist.remove('notification');
          iframeClasslist.remove('launcher');
          iframeClasslist.remove('minimized');
          break;
        case "notification":
          iframeClasslist.add(classStyle);
          iframeClasslist.remove('assistant');
          iframeClasslist.remove('launcher');
          iframeClasslist.remove('minimized');
          break;
        case "launcher":
          iframeClasslist.add(classStyle);
          iframeClasslist.remove('assistant');
          iframeClasslist.remove('notification');
          iframeClasslist.remove('minimized');
          break;
        case "minimized":
          iframeClasslist.add(classStyle);
          iframeClasslist.remove('assistant');
          iframeClasslist.remove('notification');
          iframeClasslist.remove('launcher');
          break;
        default:
          break;
      }
    }

    //Pinta el css
    basicStylesSetUp() {
      const head = document.head;
      let css = '',
        style = document.createElement('style');

      css += '.iframe-cognitive-assistant-container {overflow: hidden;border: none;position: fixed;bottom: 10px;right: 10px;background-color: transparent;opacity: 0;transform: translate3d(0,100%,0);transition: transform opacity height 350ms ease;pointer-events: none;transition-timing-function: cubic-bezier(0.56, 1.19, 0.2, 1.05);z-index: 99999999;border-radius: 5px;}';
      css += '.iframe-cognitive-assistant-container.active {opacity: 1;transform: translate3d(0,0,0);pointer-events: auto;}';
      css += '.iframe-cognitive-assistant-container.notification{ height: 30vh;width: 100%;max-width: 330px;box-shadow: none;right: 0;bottom: 0; }';
      css += '.iframe-cognitive-assistant-container.assistant{ height: 90vh;width: 100%;max-width: 360px;box-shadow: -3px 3px 24px rgba(0,0,0,0.2);right: 10px;bottom: 10px; }';
      css += '.iframe-cognitive-assistant-container.minimized{ height: 60px;width: 100%;max-width: 360px;box-shadow: -3px 3px 24px rgba(0,0,0,0.2);right: 10px;bottom: 0px; border-radius: 5px 5px 0px 0px;}';
      css += '.cognitive-iframe {height: 100%;width: 100%;border: 0 none;}';
      css += '@media screen and (max-width: 767px){ .iframe-cognitive-assistant-container.assistant{ border-radius: 0px; height: 100% ; top: 0; left: 0; right: 0; bottom: 0; max-width:100%; } ';
      css += '.iframe-cognitive-assistant-container.minimized{max-width: none; bottom:0; left:0; right:0;} }';
      css += '@media screen and (min-width: 1000px) and (max-width: 1200px){ .iframe-cognitive-assistant-container.assistant{ width: 45% }  }';

      style.type = 'text/css';

      style.appendChild(document.createTextNode(css))
      head.appendChild(style);
    }

    // /**
    //  * Obtiene la última versión de HTML de la URL
    //  */
    // getVersionAssets() {
    //   var request = new XMLHttpRequest();
    //   const _this = this;
    //   request.open("GET", this.src, true);

    //   request.onload = function() {
    //     if (request.status >= 200 && request.status < 400) {
    //       // Success!
    //       let resp = request.responseText,
    //         parser = new DOMParser(),
    //         htmlDoc = parser.parseFromString(resp, "text/html"),
    //         srcJS = htmlDoc.scripts[1].src,
    //         version = srcJS.split(".")[1];
    //       _this.print(version);
    //     } else {
    //       console.log('Error al llamar a index Asistente')
    //     }
    //   };

    //   request.onerror = function() {
    //     console.log('Error al llamar a index Asistente')
    //   };

    //   request.send();
    // }

    // //Pinta el root en un aside, con sus estilos y js
    // print(version) {
    //   this.basicStylesSetUp();
    //   const aside = document.createElement("aside");
    //   aside.id = "root";
    //   document.body.appendChild(aside);
    //   this.basicJSSetUp(version);
    // }

    // //Pinta el js con su version
    // basicJSSetUp(version) {
    //   const script = document.createElement("script");
    //   let js = this.src + "static/js/main." + version + ".js";
    //   script.type = "text/javascript";
    //   script.src = js;
    //   document.body.appendChild(script);
    // }
  }
  window.CognitiveAssistantMain = new mainHandlers();
})(window, document);
