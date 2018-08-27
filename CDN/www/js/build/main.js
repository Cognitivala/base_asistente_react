'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (window, document) {
  "use strict";

  var mainHandlers = function () {
    function mainHandlers() {
      _classCallCheck(this, mainHandlers);
    }

    /**
     * Init, recibe la URL del Asistente
     */


    _createClass(mainHandlers, [{
      key: 'init',
      value: function init(src) {
        this.src = src;
        this.createIframe();
        // this.getVersionAssets();
      }
    }, {
      key: 'createIframe',
      value: function createIframe() {
        var _this = this;

        var div = document.createElement('div'),
            ifrm = document.createElement('iframe');

        ifrm.setAttribute('id', 'ifrm-assitant');
        ifrm.classList.add('iframe-cognitive-assistant-container');
        ifrm.classList.add('active');
        ifrm.classList.add('notification');
        ifrm.setAttribute("allow", "geolocation *;");
        ifrm.setAttribute('src', this.src);
        div.appendChild(ifrm);
        document.body.appendChild(div);
        this.basicStylesSetUp();
        window.onmessage = function (e) {
          var mensaje = e.data.test[0].msg;
          _this.styleIframe(mensaje);
        };
      }
    }, {
      key: 'styleIframe',
      value: function styleIframe(classStyle) {
        var iframeClasslist = document.getElementById('ifrm-assitant').classList;
        switch (classStyle) {
          case "assistant":
            iframeClasslist.add(classStyle);
            iframeClasslist.remove('notification');
            iframeClasslist.remove('launcher');
            break;
          case "notification":
            iframeClasslist.add(classStyle);
            iframeClasslist.remove('assistant');
            iframeClasslist.remove('launcher');
            break;
          case "launcher":
            iframeClasslist.add(classStyle);
            iframeClasslist.remove('assistant');
            iframeClasslist.remove('notification');
            break;
          default:
            break;
        }
      }

      //Pinta el css

    }, {
      key: 'basicStylesSetUp',
      value: function basicStylesSetUp() {
        var head = document.head;
        var css = '',
            style = document.createElement('style');

        css += '.iframe-cognitive-assistant-container {border: none;position: fixed;bottom: 10px;right: 10px;background-color: transparent;opacity: 0;transform: translate3d(0,100%,0);transition: transform opacity 350ms ease;pointer-events: none;transition-timing-function: cubic-bezier(0.56, 1.19, 0.2, 1.05);z-index: 99999999;border-radius: 5px;}';
        css += '.iframe-cognitive-assistant-container.active {opacity: 1;transform: translate3d(0,0,0);pointer-events: auto;}';
        css += '.iframe-cognitive-assistant-container.notification{ height: 30vh;width: 100%;max-width: 330px;box-shadow: none;right: 0;bottom: 0; }';
        css += '.iframe-cognitive-assistant-container.assistant{ height: 90vh;width: 100%;max-width: 360px;box-shadow: -3px 3px 24px rgba(0,0,0,0.2);right: 10px;bottom: 10px; }';
        css += '.cognitive-iframe {height: 100%;width: 100%;border: 0 none;}';
        css += '@media screen and (max-width: 767px){ .iframe-cognitive-assistant-container.assistant{ height: 100% ; top: 0; left: 0; right: 0; bottom: 0; max-width:100%; } ';
        //css += '.iframe-cognitive-assistant-container.notification{ width: 280px; } .cognitive-iframe{height: 100%; } }';
        css += '@media screen and (min-width: 1000px) and (max-width: 1200px){ .iframe-cognitive-assistant-container.assistant{ width: 45% }  }';

        style.type = 'text/css';

        style.appendChild(document.createTextNode(css));
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

    }]);

    return mainHandlers;
  }();

  window.CognitiveAssistantMain = new mainHandlers();
})(window, document);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsid2luZG93IiwiZG9jdW1lbnQiLCJtYWluSGFuZGxlcnMiLCJzcmMiLCJjcmVhdGVJZnJhbWUiLCJkaXYiLCJjcmVhdGVFbGVtZW50IiwiaWZybSIsInNldEF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwiYm9keSIsImJhc2ljU3R5bGVzU2V0VXAiLCJvbm1lc3NhZ2UiLCJtZW5zYWplIiwiZSIsImRhdGEiLCJ0ZXN0IiwibXNnIiwic3R5bGVJZnJhbWUiLCJjbGFzc1N0eWxlIiwiaWZyYW1lQ2xhc3NsaXN0IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW1vdmUiLCJoZWFkIiwiY3NzIiwic3R5bGUiLCJ0eXBlIiwiY3JlYXRlVGV4dE5vZGUiLCJDb2duaXRpdmVBc3Npc3RhbnRNYWluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxDQUFDLFVBQVNBLE1BQVQsRUFBaUJDLFFBQWpCLEVBQTJCO0FBQzFCOztBQUQwQixNQUVwQkMsWUFGb0I7QUFHeEIsNEJBQWM7QUFBQTtBQUFFOztBQUVoQjs7Ozs7QUFMd0I7QUFBQTtBQUFBLDJCQVFuQkMsR0FSbUIsRUFRZDtBQUNSLGFBQUtBLEdBQUwsR0FBV0EsR0FBWDtBQUNBLGFBQUtDLFlBQUw7QUFDQTtBQUNEO0FBWnVCO0FBQUE7QUFBQSxxQ0FjVjtBQUFBOztBQUNaLFlBQUlDLE1BQU1KLFNBQVNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVjtBQUFBLFlBQ0VDLE9BQU9OLFNBQVNLLGFBQVQsQ0FBdUIsUUFBdkIsQ0FEVDs7QUFHRUMsYUFBS0MsWUFBTCxDQUFrQixJQUFsQixFQUF3QixlQUF4QjtBQUNBRCxhQUFLRSxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsc0NBQW5CO0FBQ0FILGFBQUtFLFNBQUwsQ0FBZUMsR0FBZixDQUFtQixRQUFuQjtBQUNBSCxhQUFLRSxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsY0FBbkI7QUFDQUgsYUFBS0MsWUFBTCxDQUFrQixPQUFsQixFQUEwQixnQkFBMUI7QUFDRkQsYUFBS0MsWUFBTCxDQUFrQixLQUFsQixFQUF5QixLQUFLTCxHQUE5QjtBQUNBRSxZQUFJTSxXQUFKLENBQWdCSixJQUFoQjtBQUNBTixpQkFBU1csSUFBVCxDQUFjRCxXQUFkLENBQTBCTixHQUExQjtBQUNBLGFBQUtRLGdCQUFMO0FBQ0FiLGVBQU9jLFNBQVAsR0FBbUIsYUFBSztBQUN0QixjQUFNQyxVQUFVQyxFQUFFQyxJQUFGLENBQU9DLElBQVAsQ0FBWSxDQUFaLEVBQWVDLEdBQS9CO0FBQ0EsZ0JBQUtDLFdBQUwsQ0FBaUJMLE9BQWpCO0FBQ0QsU0FIRDtBQUlEO0FBL0J1QjtBQUFBO0FBQUEsa0NBaUNaTSxVQWpDWSxFQWlDRDtBQUNyQixZQUFNQyxrQkFBa0JyQixTQUFTc0IsY0FBVCxDQUF3QixlQUF4QixFQUF5Q2QsU0FBakU7QUFDQSxnQkFBUVksVUFBUjtBQUNFLGVBQUssV0FBTDtBQUNFQyw0QkFBZ0JaLEdBQWhCLENBQW9CVyxVQUFwQjtBQUNBQyw0QkFBZ0JFLE1BQWhCLENBQXVCLGNBQXZCO0FBQ0FGLDRCQUFnQkUsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDQTtBQUNGLGVBQUssY0FBTDtBQUNFRiw0QkFBZ0JaLEdBQWhCLENBQW9CVyxVQUFwQjtBQUNBQyw0QkFBZ0JFLE1BQWhCLENBQXVCLFdBQXZCO0FBQ0FGLDRCQUFnQkUsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDQTtBQUNGLGVBQUssVUFBTDtBQUNFRiw0QkFBZ0JaLEdBQWhCLENBQW9CVyxVQUFwQjtBQUNBQyw0QkFBZ0JFLE1BQWhCLENBQXVCLFdBQXZCO0FBQ0FGLDRCQUFnQkUsTUFBaEIsQ0FBdUIsY0FBdkI7QUFDQTtBQUNGO0FBQ0U7QUFqQko7QUFtQkQ7O0FBRUQ7O0FBeER3QjtBQUFBO0FBQUEseUNBeURMO0FBQ2pCLFlBQU1DLE9BQU94QixTQUFTd0IsSUFBdEI7QUFDQSxZQUFJQyxNQUFNLEVBQVY7QUFBQSxZQUNFQyxRQUFRMUIsU0FBU0ssYUFBVCxDQUF1QixPQUF2QixDQURWOztBQUdBb0IsZUFBTyw2VUFBUDtBQUNBQSxlQUFPLCtHQUFQO0FBQ0FBLGVBQU8sc0lBQVA7QUFDQUEsZUFBTyxrS0FBUDtBQUNBQSxlQUFPLDhEQUFQO0FBQ0FBLGVBQU8sZ0tBQVA7QUFDQTtBQUNBQSxlQUFPLGlJQUFQOztBQUVBQyxjQUFNQyxJQUFOLEdBQWEsVUFBYjs7QUFFQUQsY0FBTWhCLFdBQU4sQ0FBa0JWLFNBQVM0QixjQUFULENBQXdCSCxHQUF4QixDQUFsQjtBQUNBRCxhQUFLZCxXQUFMLENBQWlCZ0IsS0FBakI7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBMUh3Qjs7QUFBQTtBQUFBOztBQTRIMUIzQixTQUFPOEIsc0JBQVAsR0FBZ0MsSUFBSTVCLFlBQUosRUFBaEM7QUFDRCxDQTdIRCxFQTZIR0YsTUE3SEgsRUE2SFdDLFFBN0hYIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgY2xhc3MgbWFpbkhhbmRsZXJzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICAvKipcbiAgICAgKiBJbml0LCByZWNpYmUgbGEgVVJMIGRlbCBBc2lzdGVudGVcbiAgICAgKi9cbiAgICBpbml0KHNyYykge1xuICAgICAgdGhpcy5zcmMgPSBzcmM7XG4gICAgICB0aGlzLmNyZWF0ZUlmcmFtZSgpO1xuICAgICAgLy8gdGhpcy5nZXRWZXJzaW9uQXNzZXRzKCk7XG4gICAgfVxuXG4gICAgY3JlYXRlSWZyYW1lKCl7XG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgIGlmcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgICAgXG4gICAgICAgIGlmcm0uc2V0QXR0cmlidXRlKCdpZCcsICdpZnJtLWFzc2l0YW50Jyk7XG4gICAgICAgIGlmcm0uY2xhc3NMaXN0LmFkZCgnaWZyYW1lLWNvZ25pdGl2ZS1hc3Npc3RhbnQtY29udGFpbmVyJyk7XG4gICAgICAgIGlmcm0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIGlmcm0uY2xhc3NMaXN0LmFkZCgnbm90aWZpY2F0aW9uJyk7XG4gICAgICAgIGlmcm0uc2V0QXR0cmlidXRlKFwiYWxsb3dcIixcImdlb2xvY2F0aW9uICo7XCIpO1xuICAgICAgaWZybS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHRoaXMuc3JjKTtcbiAgICAgIGRpdi5hcHBlbmRDaGlsZChpZnJtKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgIHRoaXMuYmFzaWNTdHlsZXNTZXRVcCgpO1xuICAgICAgd2luZG93Lm9ubWVzc2FnZSA9IGUgPT4ge1xuICAgICAgICBjb25zdCBtZW5zYWplID0gZS5kYXRhLnRlc3RbMF0ubXNnO1xuICAgICAgICB0aGlzLnN0eWxlSWZyYW1lKG1lbnNhamUpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBzdHlsZUlmcmFtZShjbGFzc1N0eWxlKXtcbiAgICAgIGNvbnN0IGlmcmFtZUNsYXNzbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpZnJtLWFzc2l0YW50JykuY2xhc3NMaXN0O1xuICAgICAgc3dpdGNoIChjbGFzc1N0eWxlKSB7XG4gICAgICAgIGNhc2UgXCJhc3Npc3RhbnRcIjpcbiAgICAgICAgICBpZnJhbWVDbGFzc2xpc3QuYWRkKGNsYXNzU3R5bGUpO1xuICAgICAgICAgIGlmcmFtZUNsYXNzbGlzdC5yZW1vdmUoJ25vdGlmaWNhdGlvbicpO1xuICAgICAgICAgIGlmcmFtZUNsYXNzbGlzdC5yZW1vdmUoJ2xhdW5jaGVyJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJub3RpZmljYXRpb25cIjpcbiAgICAgICAgICBpZnJhbWVDbGFzc2xpc3QuYWRkKGNsYXNzU3R5bGUpO1xuICAgICAgICAgIGlmcmFtZUNsYXNzbGlzdC5yZW1vdmUoJ2Fzc2lzdGFudCcpO1xuICAgICAgICAgIGlmcmFtZUNsYXNzbGlzdC5yZW1vdmUoJ2xhdW5jaGVyJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJsYXVuY2hlclwiOlxuICAgICAgICAgIGlmcmFtZUNsYXNzbGlzdC5hZGQoY2xhc3NTdHlsZSk7XG4gICAgICAgICAgaWZyYW1lQ2xhc3NsaXN0LnJlbW92ZSgnYXNzaXN0YW50Jyk7XG4gICAgICAgICAgaWZyYW1lQ2xhc3NsaXN0LnJlbW92ZSgnbm90aWZpY2F0aW9uJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9QaW50YSBlbCBjc3NcbiAgICBiYXNpY1N0eWxlc1NldFVwKCkge1xuICAgICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmhlYWQ7XG4gICAgICBsZXQgY3NzID0gJycsXG4gICAgICAgIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgY3NzICs9ICcuaWZyYW1lLWNvZ25pdGl2ZS1hc3Npc3RhbnQtY29udGFpbmVyIHtib3JkZXI6IG5vbmU7cG9zaXRpb246IGZpeGVkO2JvdHRvbTogMTBweDtyaWdodDogMTBweDtiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtvcGFjaXR5OiAwO3RyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwxMDAlLDApO3RyYW5zaXRpb246IHRyYW5zZm9ybSBvcGFjaXR5IDM1MG1zIGVhc2U7cG9pbnRlci1ldmVudHM6IG5vbmU7dHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjU2LCAxLjE5LCAwLjIsIDEuMDUpO3otaW5kZXg6IDk5OTk5OTk5O2JvcmRlci1yYWRpdXM6IDVweDt9JztcbiAgICAgIGNzcyArPSAnLmlmcmFtZS1jb2duaXRpdmUtYXNzaXN0YW50LWNvbnRhaW5lci5hY3RpdmUge29wYWNpdHk6IDE7dHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLDAsMCk7cG9pbnRlci1ldmVudHM6IGF1dG87fSc7XG4gICAgICBjc3MgKz0gJy5pZnJhbWUtY29nbml0aXZlLWFzc2lzdGFudC1jb250YWluZXIubm90aWZpY2F0aW9ueyBoZWlnaHQ6IDMwdmg7d2lkdGg6IDEwMCU7bWF4LXdpZHRoOiAzMzBweDtib3gtc2hhZG93OiBub25lO3JpZ2h0OiAwO2JvdHRvbTogMDsgfSc7XG4gICAgICBjc3MgKz0gJy5pZnJhbWUtY29nbml0aXZlLWFzc2lzdGFudC1jb250YWluZXIuYXNzaXN0YW50eyBoZWlnaHQ6IDkwdmg7d2lkdGg6IDEwMCU7bWF4LXdpZHRoOiAzNjBweDtib3gtc2hhZG93OiAtM3B4IDNweCAyNHB4IHJnYmEoMCwwLDAsMC4yKTtyaWdodDogMTBweDtib3R0b206IDEwcHg7IH0nO1xuICAgICAgY3NzICs9ICcuY29nbml0aXZlLWlmcmFtZSB7aGVpZ2h0OiAxMDAlO3dpZHRoOiAxMDAlO2JvcmRlcjogMCBub25lO30nO1xuICAgICAgY3NzICs9ICdAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjdweCl7IC5pZnJhbWUtY29nbml0aXZlLWFzc2lzdGFudC1jb250YWluZXIuYXNzaXN0YW50eyBoZWlnaHQ6IDEwMCUgOyB0b3A6IDA7IGxlZnQ6IDA7IHJpZ2h0OiAwOyBib3R0b206IDA7IG1heC13aWR0aDoxMDAlOyB9ICc7XG4gICAgICAvL2NzcyArPSAnLmlmcmFtZS1jb2duaXRpdmUtYXNzaXN0YW50LWNvbnRhaW5lci5ub3RpZmljYXRpb257IHdpZHRoOiAyODBweDsgfSAuY29nbml0aXZlLWlmcmFtZXtoZWlnaHQ6IDEwMCU7IH0gfSc7XG4gICAgICBjc3MgKz0gJ0BtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCkgYW5kIChtYXgtd2lkdGg6IDEyMDBweCl7IC5pZnJhbWUtY29nbml0aXZlLWFzc2lzdGFudC1jb250YWluZXIuYXNzaXN0YW50eyB3aWR0aDogNDUlIH0gIH0nO1xuXG4gICAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcblxuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSlcbiAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIE9idGllbmUgbGEgw7psdGltYSB2ZXJzacOzbiBkZSBIVE1MIGRlIGxhIFVSTFxuICAgIC8vICAqL1xuICAgIC8vIGdldFZlcnNpb25Bc3NldHMoKSB7XG4gICAgLy8gICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIC8vICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIC8vICAgcmVxdWVzdC5vcGVuKFwiR0VUXCIsIHRoaXMuc3JjLCB0cnVlKTtcblxuICAgIC8vICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgIC8vICAgICAgIC8vIFN1Y2Nlc3MhXG4gICAgLy8gICAgICAgbGV0IHJlc3AgPSByZXF1ZXN0LnJlc3BvbnNlVGV4dCxcbiAgICAvLyAgICAgICAgIHBhcnNlciA9IG5ldyBET01QYXJzZXIoKSxcbiAgICAvLyAgICAgICAgIGh0bWxEb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHJlc3AsIFwidGV4dC9odG1sXCIpLFxuICAgIC8vICAgICAgICAgc3JjSlMgPSBodG1sRG9jLnNjcmlwdHNbMV0uc3JjLFxuICAgIC8vICAgICAgICAgdmVyc2lvbiA9IHNyY0pTLnNwbGl0KFwiLlwiKVsxXTtcbiAgICAvLyAgICAgICBfdGhpcy5wcmludCh2ZXJzaW9uKTtcbiAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgYWwgbGxhbWFyIGEgaW5kZXggQXNpc3RlbnRlJylcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfTtcblxuICAgIC8vICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdFcnJvciBhbCBsbGFtYXIgYSBpbmRleCBBc2lzdGVudGUnKVxuICAgIC8vICAgfTtcblxuICAgIC8vICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgLy8gfVxuXG4gICAgLy8gLy9QaW50YSBlbCByb290IGVuIHVuIGFzaWRlLCBjb24gc3VzIGVzdGlsb3MgeSBqc1xuICAgIC8vIHByaW50KHZlcnNpb24pIHtcbiAgICAvLyAgIHRoaXMuYmFzaWNTdHlsZXNTZXRVcCgpO1xuICAgIC8vICAgY29uc3QgYXNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXNpZGVcIik7XG4gICAgLy8gICBhc2lkZS5pZCA9IFwicm9vdFwiO1xuICAgIC8vICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhc2lkZSk7XG4gICAgLy8gICB0aGlzLmJhc2ljSlNTZXRVcCh2ZXJzaW9uKTtcbiAgICAvLyB9XG5cbiAgICAvLyAvL1BpbnRhIGVsIGpzIGNvbiBzdSB2ZXJzaW9uXG4gICAgLy8gYmFzaWNKU1NldFVwKHZlcnNpb24pIHtcbiAgICAvLyAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgLy8gICBsZXQganMgPSB0aGlzLnNyYyArIFwic3RhdGljL2pzL21haW4uXCIgKyB2ZXJzaW9uICsgXCIuanNcIjtcbiAgICAvLyAgIHNjcmlwdC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcbiAgICAvLyAgIHNjcmlwdC5zcmMgPSBqcztcbiAgICAvLyAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAvLyB9XG4gIH1cbiAgd2luZG93LkNvZ25pdGl2ZUFzc2lzdGFudE1haW4gPSBuZXcgbWFpbkhhbmRsZXJzKCk7XG59KSh3aW5kb3csIGRvY3VtZW50KTtcbiJdfQ==

//# sourceMappingURL=main.js.map
