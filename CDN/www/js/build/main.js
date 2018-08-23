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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsid2luZG93IiwiZG9jdW1lbnQiLCJtYWluSGFuZGxlcnMiLCJzcmMiLCJjcmVhdGVJZnJhbWUiLCJkaXYiLCJjcmVhdGVFbGVtZW50IiwiaWZybSIsInNldEF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwiYm9keSIsImJhc2ljU3R5bGVzU2V0VXAiLCJvbm1lc3NhZ2UiLCJtZW5zYWplIiwiZSIsImRhdGEiLCJ0ZXN0IiwibXNnIiwic3R5bGVJZnJhbWUiLCJjbGFzc1N0eWxlIiwiaWZyYW1lQ2xhc3NsaXN0IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW1vdmUiLCJoZWFkIiwiY3NzIiwic3R5bGUiLCJ0eXBlIiwiY3JlYXRlVGV4dE5vZGUiLCJDb2duaXRpdmVBc3Npc3RhbnRNYWluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxDQUFDLFVBQVNBLE1BQVQsRUFBaUJDLFFBQWpCLEVBQTJCO0FBQzFCOztBQUQwQixNQUVwQkMsWUFGb0I7QUFHeEIsNEJBQWM7QUFBQTtBQUFFOztBQUVoQjs7Ozs7QUFMd0I7QUFBQTtBQUFBLDJCQVFuQkMsR0FSbUIsRUFRZDtBQUNSLGFBQUtBLEdBQUwsR0FBV0EsR0FBWDtBQUNBLGFBQUtDLFlBQUw7QUFDQTtBQUNEO0FBWnVCO0FBQUE7QUFBQSxxQ0FjVjtBQUFBOztBQUNaLFlBQUlDLE1BQU1KLFNBQVNLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVjtBQUFBLFlBQ0VDLE9BQU9OLFNBQVNLLGFBQVQsQ0FBdUIsUUFBdkIsQ0FEVDs7QUFHRUMsYUFBS0MsWUFBTCxDQUFrQixJQUFsQixFQUF3QixlQUF4QjtBQUNBRCxhQUFLRSxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsc0NBQW5CO0FBQ0FILGFBQUtFLFNBQUwsQ0FBZUMsR0FBZixDQUFtQixRQUFuQjtBQUNBSCxhQUFLRSxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsY0FBbkI7QUFDRkgsYUFBS0MsWUFBTCxDQUFrQixLQUFsQixFQUF5QixLQUFLTCxHQUE5QjtBQUNBRSxZQUFJTSxXQUFKLENBQWdCSixJQUFoQjtBQUNBTixpQkFBU1csSUFBVCxDQUFjRCxXQUFkLENBQTBCTixHQUExQjtBQUNBLGFBQUtRLGdCQUFMO0FBQ0FiLGVBQU9jLFNBQVAsR0FBbUIsYUFBSztBQUN0QixjQUFNQyxVQUFVQyxFQUFFQyxJQUFGLENBQU9DLElBQVAsQ0FBWSxDQUFaLEVBQWVDLEdBQS9CO0FBQ0EsZ0JBQUtDLFdBQUwsQ0FBaUJMLE9BQWpCO0FBQ0QsU0FIRDtBQUlEO0FBOUJ1QjtBQUFBO0FBQUEsa0NBZ0NaTSxVQWhDWSxFQWdDRDtBQUNyQixZQUFNQyxrQkFBa0JyQixTQUFTc0IsY0FBVCxDQUF3QixlQUF4QixFQUF5Q2QsU0FBakU7QUFDQSxnQkFBUVksVUFBUjtBQUNFLGVBQUssV0FBTDtBQUNFQyw0QkFBZ0JaLEdBQWhCLENBQW9CVyxVQUFwQjtBQUNBQyw0QkFBZ0JFLE1BQWhCLENBQXVCLGNBQXZCO0FBQ0FGLDRCQUFnQkUsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDQTtBQUNGLGVBQUssY0FBTDtBQUNFRiw0QkFBZ0JaLEdBQWhCLENBQW9CVyxVQUFwQjtBQUNBQyw0QkFBZ0JFLE1BQWhCLENBQXVCLFdBQXZCO0FBQ0FGLDRCQUFnQkUsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDQTtBQUNGLGVBQUssVUFBTDtBQUNFRiw0QkFBZ0JaLEdBQWhCLENBQW9CVyxVQUFwQjtBQUNBQyw0QkFBZ0JFLE1BQWhCLENBQXVCLFdBQXZCO0FBQ0FGLDRCQUFnQkUsTUFBaEIsQ0FBdUIsY0FBdkI7QUFDQTtBQUNGO0FBQ0U7QUFqQko7QUFtQkQ7O0FBRUQ7O0FBdkR3QjtBQUFBO0FBQUEseUNBd0RMO0FBQ2pCLFlBQU1DLE9BQU94QixTQUFTd0IsSUFBdEI7QUFDQSxZQUFJQyxNQUFNLEVBQVY7QUFBQSxZQUNFQyxRQUFRMUIsU0FBU0ssYUFBVCxDQUF1QixPQUF2QixDQURWOztBQUdBb0IsZUFBTyw2VUFBUDtBQUNBQSxlQUFPLCtHQUFQO0FBQ0FBLGVBQU8sc0lBQVA7QUFDQUEsZUFBTyxrS0FBUDtBQUNBQSxlQUFPLDhEQUFQO0FBQ0FBLGVBQU8sZ0tBQVA7QUFDQTtBQUNBQSxlQUFPLGlJQUFQOztBQUVBQyxjQUFNQyxJQUFOLEdBQWEsVUFBYjs7QUFFQUQsY0FBTWhCLFdBQU4sQ0FBa0JWLFNBQVM0QixjQUFULENBQXdCSCxHQUF4QixDQUFsQjtBQUNBRCxhQUFLZCxXQUFMLENBQWlCZ0IsS0FBakI7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBekh3Qjs7QUFBQTtBQUFBOztBQTJIMUIzQixTQUFPOEIsc0JBQVAsR0FBZ0MsSUFBSTVCLFlBQUosRUFBaEM7QUFDRCxDQTVIRCxFQTRIR0YsTUE1SEgsRUE0SFdDLFFBNUhYIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgY2xhc3MgbWFpbkhhbmRsZXJzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICAvKipcbiAgICAgKiBJbml0LCByZWNpYmUgbGEgVVJMIGRlbCBBc2lzdGVudGVcbiAgICAgKi9cbiAgICBpbml0KHNyYykge1xuICAgICAgdGhpcy5zcmMgPSBzcmM7XG4gICAgICB0aGlzLmNyZWF0ZUlmcmFtZSgpO1xuICAgICAgLy8gdGhpcy5nZXRWZXJzaW9uQXNzZXRzKCk7XG4gICAgfVxuXG4gICAgY3JlYXRlSWZyYW1lKCl7XG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgIGlmcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgICAgXG4gICAgICAgIGlmcm0uc2V0QXR0cmlidXRlKCdpZCcsICdpZnJtLWFzc2l0YW50Jyk7XG4gICAgICAgIGlmcm0uY2xhc3NMaXN0LmFkZCgnaWZyYW1lLWNvZ25pdGl2ZS1hc3Npc3RhbnQtY29udGFpbmVyJyk7XG4gICAgICAgIGlmcm0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIGlmcm0uY2xhc3NMaXN0LmFkZCgnbm90aWZpY2F0aW9uJyk7XG4gICAgICBpZnJtLnNldEF0dHJpYnV0ZSgnc3JjJywgdGhpcy5zcmMpO1xuICAgICAgZGl2LmFwcGVuZENoaWxkKGlmcm0pO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgdGhpcy5iYXNpY1N0eWxlc1NldFVwKCk7XG4gICAgICB3aW5kb3cub25tZXNzYWdlID0gZSA9PiB7XG4gICAgICAgIGNvbnN0IG1lbnNhamUgPSBlLmRhdGEudGVzdFswXS5tc2c7XG4gICAgICAgIHRoaXMuc3R5bGVJZnJhbWUobWVuc2FqZSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHN0eWxlSWZyYW1lKGNsYXNzU3R5bGUpe1xuICAgICAgY29uc3QgaWZyYW1lQ2xhc3NsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lmcm0tYXNzaXRhbnQnKS5jbGFzc0xpc3Q7XG4gICAgICBzd2l0Y2ggKGNsYXNzU3R5bGUpIHtcbiAgICAgICAgY2FzZSBcImFzc2lzdGFudFwiOlxuICAgICAgICAgIGlmcmFtZUNsYXNzbGlzdC5hZGQoY2xhc3NTdHlsZSk7XG4gICAgICAgICAgaWZyYW1lQ2xhc3NsaXN0LnJlbW92ZSgnbm90aWZpY2F0aW9uJyk7XG4gICAgICAgICAgaWZyYW1lQ2xhc3NsaXN0LnJlbW92ZSgnbGF1bmNoZXInKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm5vdGlmaWNhdGlvblwiOlxuICAgICAgICAgIGlmcmFtZUNsYXNzbGlzdC5hZGQoY2xhc3NTdHlsZSk7XG4gICAgICAgICAgaWZyYW1lQ2xhc3NsaXN0LnJlbW92ZSgnYXNzaXN0YW50Jyk7XG4gICAgICAgICAgaWZyYW1lQ2xhc3NsaXN0LnJlbW92ZSgnbGF1bmNoZXInKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImxhdW5jaGVyXCI6XG4gICAgICAgICAgaWZyYW1lQ2xhc3NsaXN0LmFkZChjbGFzc1N0eWxlKTtcbiAgICAgICAgICBpZnJhbWVDbGFzc2xpc3QucmVtb3ZlKCdhc3Npc3RhbnQnKTtcbiAgICAgICAgICBpZnJhbWVDbGFzc2xpc3QucmVtb3ZlKCdub3RpZmljYXRpb24nKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL1BpbnRhIGVsIGNzc1xuICAgIGJhc2ljU3R5bGVzU2V0VXAoKSB7XG4gICAgICBjb25zdCBoZWFkID0gZG9jdW1lbnQuaGVhZDtcbiAgICAgIGxldCBjc3MgPSAnJyxcbiAgICAgICAgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgICBjc3MgKz0gJy5pZnJhbWUtY29nbml0aXZlLWFzc2lzdGFudC1jb250YWluZXIge2JvcmRlcjogbm9uZTtwb3NpdGlvbjogZml4ZWQ7Ym90dG9tOiAxMHB4O3JpZ2h0OiAxMHB4O2JhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O29wYWNpdHk6IDA7dHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLDEwMCUsMCk7dHJhbnNpdGlvbjogdHJhbnNmb3JtIG9wYWNpdHkgMzUwbXMgZWFzZTtwb2ludGVyLWV2ZW50czogbm9uZTt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNTYsIDEuMTksIDAuMiwgMS4wNSk7ei1pbmRleDogOTk5OTk5OTk7Ym9yZGVyLXJhZGl1czogNXB4O30nO1xuICAgICAgY3NzICs9ICcuaWZyYW1lLWNvZ25pdGl2ZS1hc3Npc3RhbnQtY29udGFpbmVyLmFjdGl2ZSB7b3BhY2l0eTogMTt0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsMCwwKTtwb2ludGVyLWV2ZW50czogYXV0bzt9JztcbiAgICAgIGNzcyArPSAnLmlmcmFtZS1jb2duaXRpdmUtYXNzaXN0YW50LWNvbnRhaW5lci5ub3RpZmljYXRpb257IGhlaWdodDogMzB2aDt3aWR0aDogMTAwJTttYXgtd2lkdGg6IDMzMHB4O2JveC1zaGFkb3c6IG5vbmU7cmlnaHQ6IDA7Ym90dG9tOiAwOyB9JztcbiAgICAgIGNzcyArPSAnLmlmcmFtZS1jb2duaXRpdmUtYXNzaXN0YW50LWNvbnRhaW5lci5hc3Npc3RhbnR7IGhlaWdodDogOTB2aDt3aWR0aDogMTAwJTttYXgtd2lkdGg6IDM2MHB4O2JveC1zaGFkb3c6IC0zcHggM3B4IDI0cHggcmdiYSgwLDAsMCwwLjIpO3JpZ2h0OiAxMHB4O2JvdHRvbTogMTBweDsgfSc7XG4gICAgICBjc3MgKz0gJy5jb2duaXRpdmUtaWZyYW1lIHtoZWlnaHQ6IDEwMCU7d2lkdGg6IDEwMCU7Ym9yZGVyOiAwIG5vbmU7fSc7XG4gICAgICBjc3MgKz0gJ0BtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KXsgLmlmcmFtZS1jb2duaXRpdmUtYXNzaXN0YW50LWNvbnRhaW5lci5hc3Npc3RhbnR7IGhlaWdodDogMTAwJSA7IHRvcDogMDsgbGVmdDogMDsgcmlnaHQ6IDA7IGJvdHRvbTogMDsgbWF4LXdpZHRoOjEwMCU7IH0gJztcbiAgICAgIC8vY3NzICs9ICcuaWZyYW1lLWNvZ25pdGl2ZS1hc3Npc3RhbnQtY29udGFpbmVyLm5vdGlmaWNhdGlvbnsgd2lkdGg6IDI4MHB4OyB9IC5jb2duaXRpdmUtaWZyYW1le2hlaWdodDogMTAwJTsgfSB9JztcbiAgICAgIGNzcyArPSAnQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KSBhbmQgKG1heC13aWR0aDogMTIwMHB4KXsgLmlmcmFtZS1jb2duaXRpdmUtYXNzaXN0YW50LWNvbnRhaW5lci5hc3Npc3RhbnR7IHdpZHRoOiA0NSUgfSAgfSc7XG5cbiAgICAgIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuXG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKVxuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICogT2J0aWVuZSBsYSDDumx0aW1hIHZlcnNpw7NuIGRlIEhUTUwgZGUgbGEgVVJMXG4gICAgLy8gICovXG4gICAgLy8gZ2V0VmVyc2lvbkFzc2V0cygpIHtcbiAgICAvLyAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgLy8gICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgLy8gICByZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgdGhpcy5zcmMsIHRydWUpO1xuXG4gICAgLy8gICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgNDAwKSB7XG4gICAgLy8gICAgICAgLy8gU3VjY2VzcyFcbiAgICAvLyAgICAgICBsZXQgcmVzcCA9IHJlcXVlc3QucmVzcG9uc2VUZXh0LFxuICAgIC8vICAgICAgICAgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpLFxuICAgIC8vICAgICAgICAgaHRtbERvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcocmVzcCwgXCJ0ZXh0L2h0bWxcIiksXG4gICAgLy8gICAgICAgICBzcmNKUyA9IGh0bWxEb2Muc2NyaXB0c1sxXS5zcmMsXG4gICAgLy8gICAgICAgICB2ZXJzaW9uID0gc3JjSlMuc3BsaXQoXCIuXCIpWzFdO1xuICAgIC8vICAgICAgIF90aGlzLnByaW50KHZlcnNpb24pO1xuICAgIC8vICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBhbCBsbGFtYXIgYSBpbmRleCBBc2lzdGVudGUnKVxuICAgIC8vICAgICB9XG4gICAgLy8gICB9O1xuXG4gICAgLy8gICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ0Vycm9yIGFsIGxsYW1hciBhIGluZGV4IEFzaXN0ZW50ZScpXG4gICAgLy8gICB9O1xuXG4gICAgLy8gICByZXF1ZXN0LnNlbmQoKTtcbiAgICAvLyB9XG5cbiAgICAvLyAvL1BpbnRhIGVsIHJvb3QgZW4gdW4gYXNpZGUsIGNvbiBzdXMgZXN0aWxvcyB5IGpzXG4gICAgLy8gcHJpbnQodmVyc2lvbikge1xuICAgIC8vICAgdGhpcy5iYXNpY1N0eWxlc1NldFVwKCk7XG4gICAgLy8gICBjb25zdCBhc2lkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhc2lkZVwiKTtcbiAgICAvLyAgIGFzaWRlLmlkID0gXCJyb290XCI7XG4gICAgLy8gICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFzaWRlKTtcbiAgICAvLyAgIHRoaXMuYmFzaWNKU1NldFVwKHZlcnNpb24pO1xuICAgIC8vIH1cblxuICAgIC8vIC8vUGludGEgZWwganMgY29uIHN1IHZlcnNpb25cbiAgICAvLyBiYXNpY0pTU2V0VXAodmVyc2lvbikge1xuICAgIC8vICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAvLyAgIGxldCBqcyA9IHRoaXMuc3JjICsgXCJzdGF0aWMvanMvbWFpbi5cIiArIHZlcnNpb24gKyBcIi5qc1wiO1xuICAgIC8vICAgc2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xuICAgIC8vICAgc2NyaXB0LnNyYyA9IGpzO1xuICAgIC8vICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIC8vIH1cbiAgfVxuICB3aW5kb3cuQ29nbml0aXZlQXNzaXN0YW50TWFpbiA9IG5ldyBtYWluSGFuZGxlcnMoKTtcbn0pKHdpbmRvdywgZG9jdW1lbnQpO1xuIl19

//# sourceMappingURL=main.js.map
