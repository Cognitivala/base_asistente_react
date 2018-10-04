'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (window, document) {
  "use strict";

  var mainHandlers = function () {
    function mainHandlers() {
      _classCallCheck(this, mainHandlers);
    }

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
          if (e.data.test !== undefined) {
            var mensaje = e.data.test[0].msg;
            _this.styleIframe(mensaje);
          }
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
    }, {
      key: 'basicStylesSetUp',
      value: function basicStylesSetUp() {
        var head = document.head;
        var css = '',
            style = document.createElement('style');

        css += '.iframe-cognitive-assistant-container {overflow: hidden;border: none;position: fixed;bottom: 10px;right: 10px;background-color: transparent;opacity: 0;transform: translate3d(0,100%,0);transition: transform opacity height 350ms ease;pointer-events: none;transition-timing-function: cubic-bezier(0.56, 1.19, 0.2, 1.05);z-index: 99999999;border-radius: 5px;}';
        css += '.iframe-cognitive-assistant-container.active {opacity: 1;transform: translate3d(0,0,0);pointer-events: auto;}';
        css += '.iframe-cognitive-assistant-container.notification{ height: 300px;width: 100%;max-width: 330px;box-shadow: none;right: 0;bottom: 0; }';
        css += '.iframe-cognitive-assistant-container.assistant{ height: 90vh;width: 100%;max-width: 360px;box-shadow: -3px 3px 24px rgba(0,0,0,0.2);right: 10px;bottom: 10px; }';
        css += '.iframe-cognitive-assistant-container.minimized{ height: 60px;width: 100%;max-width: 360px;box-shadow: -3px 3px 24px rgba(0,0,0,0.2);right: 10px;bottom: 0px; border-radius: 5px 5px 0px 0px;}';
        css += '.cognitive-iframe {height: 100%;width: 100%;border: 0 none;}';
        css += '@media screen and (max-width: 767px){ .iframe-cognitive-assistant-container.assistant{ border-radius: 0px; height: 100% ; top: 0; left: 0; right: 0; bottom: 0; max-width:100%; } ';
        css += '.iframe-cognitive-assistant-container.minimized{max-width: none; bottom:0; left:0; right:0;} }';
        css += '@media screen and (min-width: 1000px) and (max-width: 1200px){ .iframe-cognitive-assistant-container.assistant{ width: 45% }  }';

        style.type = 'text/css';

        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
      }
    }]);

    return mainHandlers;
  }();

  window.CognitiveAssistantMain = new mainHandlers();
})(window, document);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsid2luZG93IiwiZG9jdW1lbnQiLCJtYWluSGFuZGxlcnMiLCJzcmMiLCJjcmVhdGVJZnJhbWUiLCJkaXYiLCJjcmVhdGVFbGVtZW50IiwiaWZybSIsInNldEF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZENoaWxkIiwiYm9keSIsImJhc2ljU3R5bGVzU2V0VXAiLCJvbm1lc3NhZ2UiLCJlIiwiZGF0YSIsInRlc3QiLCJ1bmRlZmluZWQiLCJtZW5zYWplIiwibXNnIiwic3R5bGVJZnJhbWUiLCJjbGFzc1N0eWxlIiwiaWZyYW1lQ2xhc3NsaXN0IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW1vdmUiLCJoZWFkIiwiY3NzIiwic3R5bGUiLCJ0eXBlIiwiY3JlYXRlVGV4dE5vZGUiLCJDb2duaXRpdmVBc3Npc3RhbnRNYWluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxDQUFDLFVBQVNBLE1BQVQsRUFBaUJDLFFBQWpCLEVBQTJCO0FBQzFCOztBQUQwQixNQUVwQkMsWUFGb0I7QUFHeEIsNEJBQWM7QUFBQTtBQUFFOztBQUhRO0FBQUE7QUFBQSwyQkFLbkJDLEdBTG1CLEVBS2Q7QUFDUixhQUFLQSxHQUFMLEdBQVdBLEdBQVg7QUFDQSxhQUFLQyxZQUFMO0FBQ0E7QUFDRDtBQVR1QjtBQUFBO0FBQUEscUNBV1Y7QUFBQTs7QUFDWixZQUFJQyxNQUFNSixTQUFTSyxhQUFULENBQXVCLEtBQXZCLENBQVY7QUFBQSxZQUNFQyxPQUFPTixTQUFTSyxhQUFULENBQXVCLFFBQXZCLENBRFQ7O0FBR0VDLGFBQUtDLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsZUFBeEI7QUFDQUQsYUFBS0UsU0FBTCxDQUFlQyxHQUFmLENBQW1CLHNDQUFuQjtBQUNBSCxhQUFLRSxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsUUFBbkI7QUFDQUgsYUFBS0UsU0FBTCxDQUFlQyxHQUFmLENBQW1CLGNBQW5CO0FBQ0FILGFBQUtDLFlBQUwsQ0FBa0IsT0FBbEIsRUFBMEIsZ0JBQTFCO0FBQ0ZELGFBQUtDLFlBQUwsQ0FBa0IsS0FBbEIsRUFBeUIsS0FBS0wsR0FBOUI7QUFDQUUsWUFBSU0sV0FBSixDQUFnQkosSUFBaEI7QUFDQU4saUJBQVNXLElBQVQsQ0FBY0QsV0FBZCxDQUEwQk4sR0FBMUI7QUFDQSxhQUFLUSxnQkFBTDtBQUNBYixlQUFPYyxTQUFQLEdBQW1CLGFBQUs7QUFDdEIsY0FBR0MsRUFBRUMsSUFBRixDQUFPQyxJQUFQLEtBQWdCQyxTQUFuQixFQUE2QjtBQUMzQixnQkFBTUMsVUFBVUosRUFBRUMsSUFBRixDQUFPQyxJQUFQLENBQVksQ0FBWixFQUFlRyxHQUEvQjtBQUNBLGtCQUFLQyxXQUFMLENBQWlCRixPQUFqQjtBQUNEO0FBQ0YsU0FMRDtBQU1EO0FBOUJ1QjtBQUFBO0FBQUEsa0NBZ0NaRyxVQWhDWSxFQWdDRDtBQUNyQixZQUFNQyxrQkFBa0J0QixTQUFTdUIsY0FBVCxDQUF3QixlQUF4QixFQUF5Q2YsU0FBakU7QUFDQSxnQkFBUWEsVUFBUjtBQUNFLGVBQUssV0FBTDtBQUNFQyw0QkFBZ0JiLEdBQWhCLENBQW9CWSxVQUFwQjtBQUNBQyw0QkFBZ0JFLE1BQWhCLENBQXVCLGNBQXZCO0FBQ0FGLDRCQUFnQkUsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDQUYsNEJBQWdCRSxNQUFoQixDQUF1QixXQUF2QjtBQUNBO0FBQ0YsZUFBSyxjQUFMO0FBQ0VGLDRCQUFnQmIsR0FBaEIsQ0FBb0JZLFVBQXBCO0FBQ0FDLDRCQUFnQkUsTUFBaEIsQ0FBdUIsV0FBdkI7QUFDQUYsNEJBQWdCRSxNQUFoQixDQUF1QixVQUF2QjtBQUNBRiw0QkFBZ0JFLE1BQWhCLENBQXVCLFdBQXZCO0FBQ0E7QUFDRixlQUFLLFVBQUw7QUFDRUYsNEJBQWdCYixHQUFoQixDQUFvQlksVUFBcEI7QUFDQUMsNEJBQWdCRSxNQUFoQixDQUF1QixXQUF2QjtBQUNBRiw0QkFBZ0JFLE1BQWhCLENBQXVCLGNBQXZCO0FBQ0FGLDRCQUFnQkUsTUFBaEIsQ0FBdUIsV0FBdkI7QUFDQTtBQUNGLGVBQUssV0FBTDtBQUNFRiw0QkFBZ0JiLEdBQWhCLENBQW9CWSxVQUFwQjtBQUNBQyw0QkFBZ0JFLE1BQWhCLENBQXVCLFdBQXZCO0FBQ0FGLDRCQUFnQkUsTUFBaEIsQ0FBdUIsY0FBdkI7QUFDQUYsNEJBQWdCRSxNQUFoQixDQUF1QixVQUF2QjtBQUNBO0FBQ0Y7QUFDRTtBQTFCSjtBQTRCRDtBQTlEdUI7QUFBQTtBQUFBLHlDQWdFTDtBQUNqQixZQUFNQyxPQUFPekIsU0FBU3lCLElBQXRCO0FBQ0EsWUFBSUMsTUFBTSxFQUFWO0FBQUEsWUFDRUMsUUFBUTNCLFNBQVNLLGFBQVQsQ0FBdUIsT0FBdkIsQ0FEVjs7QUFHQXFCLGVBQU8scVdBQVA7QUFDQUEsZUFBTywrR0FBUDtBQUNBQSxlQUFPLHVJQUFQO0FBQ0FBLGVBQU8sa0tBQVA7QUFDQUEsZUFBTyxnTUFBUDtBQUNBQSxlQUFPLDhEQUFQO0FBQ0FBLGVBQU8sb0xBQVA7QUFDQUEsZUFBTyxnR0FBUDtBQUNBQSxlQUFPLGlJQUFQOztBQUVBQyxjQUFNQyxJQUFOLEdBQWEsVUFBYjs7QUFFQUQsY0FBTWpCLFdBQU4sQ0FBa0JWLFNBQVM2QixjQUFULENBQXdCSCxHQUF4QixDQUFsQjtBQUNBRCxhQUFLZixXQUFMLENBQWlCaUIsS0FBakI7QUFDRDtBQW5GdUI7O0FBQUE7QUFBQTs7QUFzRjFCNUIsU0FBTytCLHNCQUFQLEdBQWdDLElBQUk3QixZQUFKLEVBQWhDO0FBQ0QsQ0F2RkQsRUF1RkdGLE1BdkZILEVBdUZXQyxRQXZGWCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIGNsYXNzIG1haW5IYW5kbGVycyB7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgaW5pdChzcmMpIHtcbiAgICAgIHRoaXMuc3JjID0gc3JjO1xuICAgICAgdGhpcy5jcmVhdGVJZnJhbWUoKTtcbiAgICAgIC8vIHRoaXMuZ2V0VmVyc2lvbkFzc2V0cygpO1xuICAgIH1cblxuICAgIGNyZWF0ZUlmcmFtZSgpe1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICBpZnJtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgIFxuICAgICAgICBpZnJtLnNldEF0dHJpYnV0ZSgnaWQnLCAnaWZybS1hc3NpdGFudCcpO1xuICAgICAgICBpZnJtLmNsYXNzTGlzdC5hZGQoJ2lmcmFtZS1jb2duaXRpdmUtYXNzaXN0YW50LWNvbnRhaW5lcicpO1xuICAgICAgICBpZnJtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICBpZnJtLmNsYXNzTGlzdC5hZGQoJ25vdGlmaWNhdGlvbicpO1xuICAgICAgICBpZnJtLnNldEF0dHJpYnV0ZShcImFsbG93XCIsXCJnZW9sb2NhdGlvbiAqO1wiKTtcbiAgICAgIGlmcm0uc2V0QXR0cmlidXRlKCdzcmMnLCB0aGlzLnNyYyk7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoaWZybSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gICAgICB0aGlzLmJhc2ljU3R5bGVzU2V0VXAoKTtcbiAgICAgIHdpbmRvdy5vbm1lc3NhZ2UgPSBlID0+IHtcbiAgICAgICAgaWYoZS5kYXRhLnRlc3QgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgY29uc3QgbWVuc2FqZSA9IGUuZGF0YS50ZXN0WzBdLm1zZztcbiAgICAgICAgICB0aGlzLnN0eWxlSWZyYW1lKG1lbnNhamUpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHN0eWxlSWZyYW1lKGNsYXNzU3R5bGUpe1xuICAgICAgY29uc3QgaWZyYW1lQ2xhc3NsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lmcm0tYXNzaXRhbnQnKS5jbGFzc0xpc3Q7XG4gICAgICBzd2l0Y2ggKGNsYXNzU3R5bGUpIHtcbiAgICAgICAgY2FzZSBcImFzc2lzdGFudFwiOlxuICAgICAgICAgIGlmcmFtZUNsYXNzbGlzdC5hZGQoY2xhc3NTdHlsZSk7XG4gICAgICAgICAgaWZyYW1lQ2xhc3NsaXN0LnJlbW92ZSgnbm90aWZpY2F0aW9uJyk7XG4gICAgICAgICAgaWZyYW1lQ2xhc3NsaXN0LnJlbW92ZSgnbGF1bmNoZXInKTtcbiAgICAgICAgICBpZnJhbWVDbGFzc2xpc3QucmVtb3ZlKCdtaW5pbWl6ZWQnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm5vdGlmaWNhdGlvblwiOlxuICAgICAgICAgIGlmcmFtZUNsYXNzbGlzdC5hZGQoY2xhc3NTdHlsZSk7XG4gICAgICAgICAgaWZyYW1lQ2xhc3NsaXN0LnJlbW92ZSgnYXNzaXN0YW50Jyk7XG4gICAgICAgICAgaWZyYW1lQ2xhc3NsaXN0LnJlbW92ZSgnbGF1bmNoZXInKTtcbiAgICAgICAgICBpZnJhbWVDbGFzc2xpc3QucmVtb3ZlKCdtaW5pbWl6ZWQnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImxhdW5jaGVyXCI6XG4gICAgICAgICAgaWZyYW1lQ2xhc3NsaXN0LmFkZChjbGFzc1N0eWxlKTtcbiAgICAgICAgICBpZnJhbWVDbGFzc2xpc3QucmVtb3ZlKCdhc3Npc3RhbnQnKTtcbiAgICAgICAgICBpZnJhbWVDbGFzc2xpc3QucmVtb3ZlKCdub3RpZmljYXRpb24nKTtcbiAgICAgICAgICBpZnJhbWVDbGFzc2xpc3QucmVtb3ZlKCdtaW5pbWl6ZWQnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm1pbmltaXplZFwiOlxuICAgICAgICAgIGlmcmFtZUNsYXNzbGlzdC5hZGQoY2xhc3NTdHlsZSk7XG4gICAgICAgICAgaWZyYW1lQ2xhc3NsaXN0LnJlbW92ZSgnYXNzaXN0YW50Jyk7XG4gICAgICAgICAgaWZyYW1lQ2xhc3NsaXN0LnJlbW92ZSgnbm90aWZpY2F0aW9uJyk7XG4gICAgICAgICAgaWZyYW1lQ2xhc3NsaXN0LnJlbW92ZSgnbGF1bmNoZXInKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBiYXNpY1N0eWxlc1NldFVwKCkge1xuICAgICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmhlYWQ7XG4gICAgICBsZXQgY3NzID0gJycsXG4gICAgICAgIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgY3NzICs9ICcuaWZyYW1lLWNvZ25pdGl2ZS1hc3Npc3RhbnQtY29udGFpbmVyIHtvdmVyZmxvdzogaGlkZGVuO2JvcmRlcjogbm9uZTtwb3NpdGlvbjogZml4ZWQ7Ym90dG9tOiAxMHB4O3JpZ2h0OiAxMHB4O2JhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O29wYWNpdHk6IDA7dHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLDEwMCUsMCk7dHJhbnNpdGlvbjogdHJhbnNmb3JtIG9wYWNpdHkgaGVpZ2h0IDM1MG1zIGVhc2U7cG9pbnRlci1ldmVudHM6IG5vbmU7dHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjU2LCAxLjE5LCAwLjIsIDEuMDUpO3otaW5kZXg6IDk5OTk5OTk5O2JvcmRlci1yYWRpdXM6IDVweDt9JztcbiAgICAgIGNzcyArPSAnLmlmcmFtZS1jb2duaXRpdmUtYXNzaXN0YW50LWNvbnRhaW5lci5hY3RpdmUge29wYWNpdHk6IDE7dHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLDAsMCk7cG9pbnRlci1ldmVudHM6IGF1dG87fSc7XG4gICAgICBjc3MgKz0gJy5pZnJhbWUtY29nbml0aXZlLWFzc2lzdGFudC1jb250YWluZXIubm90aWZpY2F0aW9ueyBoZWlnaHQ6IDMwMHB4O3dpZHRoOiAxMDAlO21heC13aWR0aDogMzMwcHg7Ym94LXNoYWRvdzogbm9uZTtyaWdodDogMDtib3R0b206IDA7IH0nO1xuICAgICAgY3NzICs9ICcuaWZyYW1lLWNvZ25pdGl2ZS1hc3Npc3RhbnQtY29udGFpbmVyLmFzc2lzdGFudHsgaGVpZ2h0OiA5MHZoO3dpZHRoOiAxMDAlO21heC13aWR0aDogMzYwcHg7Ym94LXNoYWRvdzogLTNweCAzcHggMjRweCByZ2JhKDAsMCwwLDAuMik7cmlnaHQ6IDEwcHg7Ym90dG9tOiAxMHB4OyB9JztcbiAgICAgIGNzcyArPSAnLmlmcmFtZS1jb2duaXRpdmUtYXNzaXN0YW50LWNvbnRhaW5lci5taW5pbWl6ZWR7IGhlaWdodDogNjBweDt3aWR0aDogMTAwJTttYXgtd2lkdGg6IDM2MHB4O2JveC1zaGFkb3c6IC0zcHggM3B4IDI0cHggcmdiYSgwLDAsMCwwLjIpO3JpZ2h0OiAxMHB4O2JvdHRvbTogMHB4OyBib3JkZXItcmFkaXVzOiA1cHggNXB4IDBweCAwcHg7fSc7XG4gICAgICBjc3MgKz0gJy5jb2duaXRpdmUtaWZyYW1lIHtoZWlnaHQ6IDEwMCU7d2lkdGg6IDEwMCU7Ym9yZGVyOiAwIG5vbmU7fSc7XG4gICAgICBjc3MgKz0gJ0BtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KXsgLmlmcmFtZS1jb2duaXRpdmUtYXNzaXN0YW50LWNvbnRhaW5lci5hc3Npc3RhbnR7IGJvcmRlci1yYWRpdXM6IDBweDsgaGVpZ2h0OiAxMDAlIDsgdG9wOiAwOyBsZWZ0OiAwOyByaWdodDogMDsgYm90dG9tOiAwOyBtYXgtd2lkdGg6MTAwJTsgfSAnO1xuICAgICAgY3NzICs9ICcuaWZyYW1lLWNvZ25pdGl2ZS1hc3Npc3RhbnQtY29udGFpbmVyLm1pbmltaXplZHttYXgtd2lkdGg6IG5vbmU7IGJvdHRvbTowOyBsZWZ0OjA7IHJpZ2h0OjA7fSB9JztcbiAgICAgIGNzcyArPSAnQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KSBhbmQgKG1heC13aWR0aDogMTIwMHB4KXsgLmlmcmFtZS1jb2duaXRpdmUtYXNzaXN0YW50LWNvbnRhaW5lci5hc3Npc3RhbnR7IHdpZHRoOiA0NSUgfSAgfSc7XG5cbiAgICAgIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuXG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKVxuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuXG4gIH1cbiAgd2luZG93LkNvZ25pdGl2ZUFzc2lzdGFudE1haW4gPSBuZXcgbWFpbkhhbmRsZXJzKCk7XG59KSh3aW5kb3csIGRvY3VtZW50KTtcbiJdfQ==

//# sourceMappingURL=main.js.map
