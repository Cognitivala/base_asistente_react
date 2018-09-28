var $ = jQuery,
  user = JSON.parse(sessionStorage.getItem("user")),
  getPath = "http://asistente_duoc.mycognitiva.io/",
  // getPath = "http://localhost:3000/",
  getTkn = user !== null ? user.tkn : user,
  getPrf = user !== null ? user.prf : user,
  getSession = "1",
  hasToken = false;

function initMain() {
  if (validateUser()) {
    isToken();
    uri();
    filterUser();
    fillUser();
    showSubMenu();
  } else {
    if (!isPass()) {
      window.location.href = getPath + "login";
    }
  }
}

function uri() {
  var uri = window.location.toString();
  if (uri.indexOf("?") > 0) {
    var clean_uri = uri.substring(0, uri.indexOf("?"));
    window.history.replaceState({}, document.title, clean_uri);
  }
}

function isToken() {
  var getTimeTkn = user.tmtkn,
    getRfTimeTkn = user.rftmtkn,
    getRfTkn = user.rftkn,
    d = new Date(),
    n = d.getTime(),
    getNow = new Date(n),
    convTimeTnk = new Date(getTimeTkn + 120000),
    // sessTimeTkn = new Date(getRfTimeTkn + 1.8e6);
    sessTimeTkn = new Date(getRfTimeTkn);

  if (sessTimeTkn < getNow) {
    if (convTimeTnk < getNow) {
      var settings = {
        async: true,
        crossDomain: true,
        url: getPath + "mant/refresh",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getRfTkn,
          "Cache-Control": "no-cache"
        }
      };
      $.ajax(settings).done(function(response) {
        if (response.status == 200) {
          $("meta[name='_csrf']").attr("content", response.token);
          user.tkn = response.token;
          user.rftkn = response.refresh_token;
          user.tmtkn = n;
          getTkn = user.tkn;
          sessionStorage.setItem("user", JSON.stringify(user));
          setRequest();
          hasToken = true;
          return true;
        } else {
          hasToken = false;
          return false;
        }
      });
    } else {
      hasToken = true;
      return true;
    }
  } else {
    hasToken = true;
    return true;
  }
}

function closeSession() {
  sessionStorage.removeItem("user");
  window.location.href = getPath + "login";
}

function isPass() {
  const href = window.location.href,
    hrefLast = href.substring(href.length - 11, href.length);
  return hrefLast === "contrasena/" ? true : false;
}

function validateUser() {
  if (user === undefined || user === null) {
    return false;
  } else {
    return true;
  }
}

function fillUser() {
  $("#user span").text(user.user);
  $(".content-header .mad-cognitiva h5 span").text(user.empresa);
}

function filterUser() {
  if (user.prf > 0) {
    $(
      "#new-intent, #new-dialog, #save-dialog-btn, #modal-dialog-edit .button-add.edit-button, a.add-intent.delete, #users-list, #admin-users-btn ,#get-code-btn, [role='killswitch']"
    ).remove();
  } 
  
  if (user.prf == 2) {
    $(
      "ul.list-intents>li>ul>li.options, #save-intent, #save-url, #list-dialogs-respond-edit a.delete-dialog, #personalizar-asis-btn, #config-asis-btn"
    ).remove();
  }
}

function showSubMenu() {
  var current = window.location,
    e = document.getElementById("mainmenu"),
    anchor = e.getElementsByTagName("a");

  for (var o = 0; o < anchor.length; o++) {
    anchor[o].href == current && (anchor[o].parentElement.className = "active");
    if (current.href.indexOf("indicadores") > -1) {
      $("ul.sub-menu").slideDown(300);
    }
  }
}

function setRequest() {
  var getMetaTkn = $("meta[name='_csrf']").attr("content");
  $(document).ajaxSend(function(e, xhr, options) {
    xhr.setRequestHeader("X-XSRF-TOKEN", getMetaTkn);
  });
}

function menu() {
  const menuBox = document.getElementById("mainmenu").parentElement,
    active = menuBox.classList.contains("active");
  if (active) menuBox.classList.remove("active");
  else menuBox.classList.add("active");
}

function openScript() {
  var customs = JSON.parse(localStorage.getItem("customParams")),
    getUrl = customs.url;
  if (getUrl != "") {
    var setScript =
      '&lt;script type="text/javascript" src="' +
      getPath +
      'cdn/js/build/main.js"&gt;&lt;/script&gt;\n';
    setScript += "&lt;script&gt;\n";
    setScript += '  window.addEventListener("load", function () {\n';
    setScript +=
      '    window.CognitiveAssistantMain.init("' + getPath + 'asistente");\n';
    setScript += "  });\n";
    setScript += "&lt;/script&gt;";
    $("#myModalScript pre").append(setScript);
    $("#myModalScript").modal("show");
  } else {
    openModal(
      "#myModal",
      "Auch!",
      "Tenemos un problema. Primero debes completar la configuración básica del asistente",
      "error"
    );
  }
}

function openModal(modal, title, body, theclass) {
  $(modal)
    .find("h6")
    .text(title);
  $(modal)
    .find(".modal-body")
    .empty()
    .append(body);
  $(modal).addClass(theclass);
  $(modal).modal({
    backdrop: "static",
    keyboard: false,
    show: true
  });
}

function createCSV(content, nameFile) {
  const rows = content;
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += rows;
  var encodedUri = encodeURI(csvContent);
  var link_2 = document.getElementsByClassName("download-cvs");
  for (var i = 0; i < link_2.length; i++) {
    link_2[i].setAttribute("href", encodedUri);
    link_2[i].setAttribute("download", nameFile + ".csv");
  }
}

function createCSVValoraciones(content, nameFile, idDiv) {
  const rows = content;
  let csvContent = "data:text/plain;charset=UTF-8,";
  csvContent += rows;
  var encodedUri = encodeURI(csvContent);
  var link_2 = document.getElementById(idDiv);
  link_2.setAttribute("href", encodedUri);
  link_2.setAttribute("download", nameFile + ".csv");
}

function createInteractionsCSV(content, nameFile, button) {
  var result = decodeURIComponent(Array.prototype.map.call(atob(content.substring(21)), function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''));
  const rows = result;
  var csvContent = "data:text/csv;charset=utf-8,";
      csvContent += rows;
  var encodedUri = encodeURI(csvContent);

  var link = button.nextElementSibling;
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", nameFile+".csv");
    link.click();
}

$("document").ready(() => {
  initMain();
});
