"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function (window, document) {
  "use strict";

  var mainHandlers =
  /*#__PURE__*/
  function () {
    function mainHandlers() {
      _classCallCheck(this, mainHandlers);
    }

    _createClass(mainHandlers, [{
      key: "init",
      value: function init(src) {
        this.src = src;
        this.responsive = "";
        this.createIframe();
      }
    }, {
      key: "createIframe",
      value: function createIframe() {
        var _this = this;

        var div = document.createElement("div"),
            ifrm = document.createElement("iframe");
        ifrm.setAttribute("id", "ifrm-assitant");
        ifrm.classList.add("iframe-cognitive-assistant-container");
        ifrm.classList.add("active");
        ifrm.classList.add("notification");
        ifrm.setAttribute("allow", "geolocation *;");
        ifrm.setAttribute("allow", "microphone *;");
        ifrm.setAttribute("src", this.src);
        div.appendChild(ifrm);
        document.body.appendChild(div);
        this.basicStylesSetUp();

        window.onmessage = function (e) {
          if (e.data.test !== undefined) {
            var mensaje = e.data.test[0].msg;

            _this.styleIframe(mensaje);
          } else if (e.data.responsiveFunc !== undefined) {
            _this.responsiveFunc();
          }
        };
      }
    }, {
      key: "styleIframe",
      value: function styleIframe(classStyle) {
        var iframeClasslist = document.getElementById("ifrm-assitant").classList;

        switch (classStyle) {
          case "assistant":
            iframeClasslist.add(classStyle);
            iframeClasslist.remove("notification");
            iframeClasslist.remove("launcher");
            iframeClasslist.remove("minimized");
            break;

          case "notification":
            iframeClasslist.add(classStyle);
            iframeClasslist.remove("assistant");
            iframeClasslist.remove("launcher");
            iframeClasslist.remove("minimized");
            break;

          case "launcher":
            iframeClasslist.add(classStyle);
            iframeClasslist.remove("assistant");
            iframeClasslist.remove("notification");
            iframeClasslist.remove("minimized");
            break;

          case "minimized":
            iframeClasslist.add(classStyle);
            iframeClasslist.remove("assistant");
            iframeClasslist.remove("notification");
            iframeClasslist.remove("launcher");
            break;

          default:
            break;
        }
      }
    }, {
      key: "basicStylesSetUp",
      value: function basicStylesSetUp() {
        var head = document.head;
        var css = "",
            style = document.createElement("style");
        css += ".iframe-cognitive-assistant-container {overflow: hidden;border: none;position: fixed;bottom: 10px;right: 10px;background-color: transparent;opacity: 0;transform: translate3d(0,100%,0);transition: transform opacity height 350ms ease;pointer-events: none;transition-timing-function: cubic-bezier(0.56, 1.19, 0.2, 1.05);z-index: 99999999;border-radius: 5px;}";
        css += ".iframe-cognitive-assistant-container.active {opacity: 1;transform: translate3d(0,0,0);pointer-events: auto;}";
        css += ".iframe-cognitive-assistant-container.notification{ height: 83px;width: 83px;max-width: 365px;box-shadow: none;right: 0;bottom: 0; margin: 0 !important; }";
        css += ".iframe-cognitive-assistant-container.assistant{ height: 100vh;width: 100%;max-width: 401px;right: 0px;bottom: 0px; margin: 0 !important;}";
        css += ".iframe-cognitive-assistant-container.minimized{ height: 100px;width: 100%;max-width: 100px;right: 10px;bottom: 0px;}";
        css += ".cognitive-iframe {height: 100%;width: 100%;border: 0 none;}";
        css += "@media screen and (max-width: 767px){ .iframe-cognitive-assistant-container.assistant{ border-radius: 0px; height: 100% ; top: 0; left: 0; right: 0; bottom: 0; max-width:100%; } ";
        css += ".iframe-cognitive-assistant-container.minimized{max-width: none; bottom:0; left:0; right:0;} }";
        css += "@media screen and (min-width: 1000px) and (max-width: 1200px){ .iframe-cognitive-assistant-container.assistant{ width: 45% }  }";
        style.type = "text/css";
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
      }
    }, {
      key: "styleIframeMessage",
      value: function styleIframeMessage() {
        var _this2 = this;

        var iframe = document.getElementById("ifrm-assitant");
        var contentWindow = iframe ? iframe.contentWindow : null;

        if (contentWindow) {
          contentWindow.postMessage({
            responsive: this.responsive
          }, "*");
        } else {
          setTimeout(function () {
            _this2.styleIframeMessage();
          }, 600);
        }
      }
    }, {
      key: "responsiveFunc",
      value: function responsiveFunc() {
        if (window.outerWidth <= 767) {
          if (this.responsive !== "mobile") {
            this.responsive = "mobile";
            this.styleIframeMessage();
          }
        } else {
          if (this.responsive !== "desktop") {
            this.responsive = "desktop";
            this.styleIframeMessage();
          }
        }
      }
    }]);

    return mainHandlers;
  }();

  window.CognitiveAssistantMain = new mainHandlers();

  window.onresize = function () {
    window.CognitiveAssistantMain.responsiveFunc();
  };

  document.onready;
})(window, document);
//# sourceMappingURL=main.js.map
