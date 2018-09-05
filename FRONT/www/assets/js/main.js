var $ = jQuery;

var uri = window.location.toString();
if (uri.indexOf("?") > 0) {
  var clean_uri = uri.substring(0, uri.indexOf("?"));
  window.history.replaceState({}, document.title, clean_uri);
}

if (sessionStorage.getItem('prf') > 0) {
  $('#new-intent, #new-dialog, #save-dialog-btn, #modal-dialog-edit .button-add.edit-button, a.add-intent.delete').remove();
  if (sessionStorage.getItem('prf') == 2) {
    $('ul.list-intents>li>ul>li.options, #save-intent, #save-url, #admin-users-btn, #list-dialogs-respond-edit a.delete-dialog').remove();
  }
}

var getPath = "https://dev-coopeuch.mycognitiva.io/";
// var getPath = "http://localhost:3000/";

var getTimeTkn = parseInt(sessionStorage.getItem('tmtkn')),
    getRfTimeTkn = parseInt(sessionStorage.getItem('rftmtkn')),
    getRfTkn = sessionStorage.getItem('rftkn'),
    d = new Date(),
    n = d.getTime(),
    getNow = new Date(n),
    convTimeTnk = new Date(getTimeTkn + 120000);
    sessTimeTkn = new Date(getRfTimeTkn + (1.8e+6))

function setRequest() {
  var getMetaTkn = $("meta[name='_csrf']").attr("content");
  $(document).ajaxSend(function(e, xhr, options) {
    xhr.setRequestHeader("X-XSRF-TOKEN", getMetaTkn);
  });
}

if (sessTimeTkn > getNow) {
  if (convTimeTnk < getNow) {
    var settings = {
      async: true,
      crossDomain: true,
      url: getPath+"mant/refresh",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+getRfTkn,
        "Cache-Control": "no-cache"
      },
    }
    $.ajax(settings).done(function (response) {
      // console.log(response);
      if (response.status == 200) {
        $("meta[name='_csrf']").attr("content", response.token);
        sessionStorage.setItem('tkn', response.token);
        sessionStorage.setItem('rftkn', response.refresh_token);
        sessionStorage.setItem('tmtkn', n);
        setRequest();
      }
    });
  }
} else {
  closeSession();
}

addEventListener('click', function (ev) {
  if (ev.target.hash == '#;' || ev.target.hash == '#') {
    ev.preventDefault();
  }
});

if (!sessionStorage.getItem('user_id')) {
  window.location.href = getPath + 'login/';
  // window.location.href = 'http://localhost:3000/login/';
} else {

}

if (sessionStorage.getItem('user')) {
  $('#user span').text(sessionStorage.getItem('user'));
  $('.content-header .mad-cognitiva h5 span').text(sessionStorage.getItem('empresa'));
}

function closeSession() {
  sessionStorage.removeItem('empresa');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('user_id');
  sessionStorage.removeItem('usp');
  sessionStorage.removeItem('usr');
  sessionStorage.removeItem('uws');
  sessionStorage.removeItem('prf');
  sessionStorage.removeItem('tkn');
  sessionStorage.removeItem('rftkn');
  sessionStorage.removeItem('tmtkn');
  sessionStorage.removeItem('rftmtkn');
  
  localStorage.removeItem('avatarAssistant');
  localStorage.removeItem('colorBubble');
  localStorage.removeItem('colorButtons');
  localStorage.removeItem('colorHeader');
  localStorage.removeItem('logoAssistant');
  localStorage.removeItem('subTitleAssistant');
  localStorage.removeItem('titleAssistant');
  localStorage.removeItem('urlAssistant');



  window.location.href = getPath+"login/";
  // window.location.href = 'http://localhost:3000/login/';
}

var current = window.location,
    e       = document.getElementById("mainmenu"),
    anchor  = e.getElementsByTagName("a");

for (var o = 0; o < anchor.length; o++) {
  anchor[o].href == current && (anchor[o].parentElement.className = "active");
  if (current.href.indexOf('indicadores') > -1) {
    $('ul.sub-menu').slideDown(300);
  }
}

function openScript() {
  var getUrl = localStorage.getItem('urlAssistant'),
    getIntents = document.getElementsByClassName('list-intents');
  if (getUrl != '') {
    var setScript = '&lt;script type="text/javascript" src="' + getPath + 'cdn/js/build/main.js"&gt;&lt;/script&gt;\n'
    setScript += '&lt;script&gt;\n';
    setScript += '  window.addEventListener("load", function () {\n';
    setScript += '    window.CognitiveAssistantMain.init("' + getPath + 'asistente");\n';
    setScript += '  });\n';
    setScript += '&lt;/script&gt;';
    $('#myModalScript pre').append(setScript);
    $('#myModalScript').modal('show');
  } else {
    openModal('#myModal', 'Auch!', 'Tenemos un problema. Primero debes completar la configuración básica del asistente', 'error');
  }
}

function openModal(modal, title, body, theclass) {
  $(modal).find('h6').text(title);
  $(modal).find('.modal-body').empty().append(body);
  $(modal).addClass(theclass);
  $(modal).modal({
    backdrop: 'static',
    keyboard: false,
    show: true
  });
}

function createCSV(content, nameFile){
  const rows = content;
  let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += rows;
  var encodedUri = encodeURI(csvContent);
  var link_2 = document.getElementsByClassName('download-cvs');
  for (var i = 0; i < link_2.length; i++){
    link_2[i].setAttribute("href", encodedUri);
    link_2[i].setAttribute("download", nameFile+".csv");
  }
}