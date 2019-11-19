(function (window, document, $, undefined) {
  "use strict";
  var $window = $(window),
      editor = '',
      editorNew = '',
      $document = $(document),
      estado = '',
      userAES = sessionStorage.getItem("user"),
      userBytes  = CryptoJS.AES.decrypt(userAES, KEY_ENCRYPT),
      user = JSON.parse(userBytes.toString(CryptoJS.enc.Utf8)),
      getTkn = user!==null?user.tkn:null;
  
  window.handler = function(){};

  window.handler.prototype = {
    initMad: function(){
      if(hasToken){
        this.onReadySetup();
        this.clearParams();
      }else{
        setTimeout(() => {
          this.initMad();
        }, 300);
      }
    },
    onReadySetup: function(){
      var self = this;
      self.$body = $('body');
      self.apiUrl = getPath;
      self.params = this.params = this.getQueryParams(document.location.search);
      self.session = "1";
      window.dataConditions = [];

      if (self.$body.hasClass('home')) {
        
        this.getAllIntents();
        this.getEntities();
        this.getDialogs();
        this.getSwitch();

        $(document).ajaxStop(function() {
          $('.spinner').remove();
        });
      } else if(self.$body.hasClass('valoraciones')){
        this.getFiltros();
      }

      this.eventsHandler( $('[data-func]') );

      $('form[data-validate]').on('submit', function(event){
        self.validateForms(event);
      });
      $('form[data-validate]').find('[required]').on('blur keyup change', function(event){
        self.validateForms(event);
      });
    },
    onLoadSetup: function(){},
    onScrollSetup: function(){},
    onResizeSetup: function(){},
    validateForms : function(event){
      event.preventDefault();
      var self = this;
      var $form = event.type == 'submit' ? $(event.currentTarget) : $(event.currentTarget).parents('form');//Se almacena el objeto del formulario, en caso de submit y en caso de otros eventos
      var $inputs = event.type == 'submit' ? $form.find('[required]') : $(event.currentTarget); //Se almacenan todos los elementos requeridos
      var isValid = true; //Flag para saber si el formulario finalmente es válido o no, al comienzo siempre es válido
      var emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //Regex para comprobar email
      var numerosRegEx = /^\d+(?:\.\d{1,2})?$/; //Regex para comprobar números
      var letrasyNumerosRegEx = /^[0-9a-zA-Z]+$/ //Regex para numeros y letras;
      //Función que setea un input inválido
      var setToFalse = function($input){
          var customMessage = $input.data('custom-message'); //Mensaje customizado
          var $parentHolder = $input.parent(); //Elemento padre
          var type = $input.attr('type'); //Tipo de input
          isValid = false; //flag

          if(type == 'hidden'){return false;} //Si el tipo de input es hidden no hace nada

          $input.addClass('invalid-input').removeClass('valid-input'); //Agrega la clase de inválido y quita la clase de válido

          if(!$input.next().is('.error-message') && event.type == 'submit' && customMessage){
              $input.after('<p class="error-message">'+ customMessage +'</p>'); //Agrega mensaje de error si es que este no existe
          }

          if(type == 'radio' || type == 'checkbox'){return false;} //Si es un checkbox o un radio no hace nada
      }
      //Función que setea un input válido
      var setToTrue = function($input){
          var $parentHolder = $input.parent();
          var type = $input.attr('type');

          if(type == 'hidden' || type == 'radio' || type == 'checkbox'){return false;}

          $input.addClass('valid-input').removeClass('invalid-input'); //Agrega la clase valdia al input

          if($input.data('disable-img-error')){return false;}
      }
      //Función que valida radio buttons, comprobando si uno está marcado o no
      var validateRadio = function($element){
          var $radioPack = $('input[name="'+ $element.attr('name') +'"]');
          var isValidRadio = false;
          $.each($radioPack, function(index, element){
              var $e = $(element);
              if($e.prop('checked') == true){
                  isValidRadio = true;
              }
          });

          if(isValidRadio == false){
              setToFalse($element);
          }
      }

      //Se elimina la clase de error a los inputs y la clase de input válido
      $inputs.removeClass('invalid-input');
      $('[name="'+ $inputs.attr('name') +'"]').removeClass('invalid-input');
      $inputs.removeClass('valid-input');

      //Si no es click, elimina el mensaje de error
      if(event.type != 'submit'){
          var $currentItem = $(event.currentTarget);
          if($currentItem.next().is('.error-message')){
              $currentItem.next().remove();
          }
      }

      $.each($inputs, function(index, element){
          var $element = $(element);
          var tagName = $(element).prop('tagName').toLowerCase();
          var limit = $element.data('limit') ? $element.data('limit') : 5;
          var elementValue = tagName == 'input' || tagName == 'textarea' ? $element.val() : $element.find('option:selected').val();

          if($element.attr('data-validate-on-show') == 'false' || $element.attr('readonly')){
              return true;
          }

          //Select vacío
          if(tagName == 'select' && elementValue == ""){
              setToFalse($element);
          }else if(tagName == 'select' && elementValue != ""){
              setToTrue($element);
          }

          //Input vacío
          if((tagName == 'input' || tagName == 'textarea') && elementValue == ""){
              setToFalse($element);
          }else if((tagName == 'input' || tagName == 'textarea') && elementValue != "" && $element.attr('type') != 'radio'){
              setToTrue($element);
          }

          //Radio buttons
          if(tagName == 'input' && $element.attr('type') == 'radio' && event.type == 'submit'){
              validateRadio($element);
          }

          //Email
          if(tagName == 'input' && $element.attr('type') == 'email' && emailRegEx.test(elementValue) == false){
              setToFalse($element);
          }

          //RUT
          if(tagName == 'input' && $element.hasClass('rut-input') && $.Rut.validar(elementValue) == false){
              setToFalse($element);
          }

          //Sólo números
          if(tagName == 'input' && $element.hasClass('number-validation') && elementValue != "" && numerosRegEx.test(elementValue) == false){
              setToFalse($element);
          }

          //minimo y maximo de caracteres
          if(tagName == 'input' && ((elementValue.length < $element.data('min')) || (elementValue.length > $element.data('max')))){
              setToFalse($element);
          }

          //minimo y maximo
          if(tagName == 'input' && ((elementValue.split('.').join("") < $element.data('min-value')) || (elementValue.split('.').join("") > $element.data('max-value')))){
              setToFalse($element);
          }

          //Solo letras y numeros
          if(tagName == 'input' && $element.hasClass('numeros-letras')&& letrasyNumerosRegEx.test(elementValue) == false){
              setToFalse($element);
          }

          //Confirmar clave
          if(tagName == 'input' && $element.hasClass('same-validation') && elementValue != "" && (elementValue != $('[name="clave-nueva"]').val())){
              setToFalse($element);
          }

      });

      if(isValid && event.type == 'submit' && $form.data('validate') == 'async'){
          this[$form.data('func-validate')]($form);
      }
      else if(isValid && event.type == 'submit'){
          $form.off('submit');
          $form.submit();
      }else if(!isValid && !$form.data('no-scroll') && event.type == 'submit'){
          $('html, body').animate({
              scrollTop: $(".invalid-input").offset().top - 120
          }, 300);
      }
    },
    eventsHandler: function( $elements ){
      if( ! $elements.length ){ return; }
      $.each( $elements, ( index, elem ) => {
        const $item = $(elem),
          func = $item.data('func'),
          events = $item.data('event') ? $item.data('event') : 'click.handler';
        if( func && typeof( this[func] ) === 'function' ){
          $item.on( events, $.proxy( this[ func ], this ) );
          $item.data('delegated', true);
        } 
      });
    },
    getQueryParams(qs) {
      qs = qs.split('+').join(' ');
      var params = {},
          tokens,
          re = /[?&]?([^=]+)=([^&]*)/g;
      while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
      }
      return params;
    },
    getAllIntents: function () {
      var self = this;
      var $container = $('#list-intents');
      var promise = $.ajax({
        async: true,
        crossDomain: true,
        type: 'POST',
        url: getPath + 'mant/list_intents',
        headers: {
          contentType: 'application/json',
          Authorization: 'Bearer '+getTkn
        },
        data: JSON.stringify({
          id_cliente: self.session
        }),
        processData: false,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'
      });

      promise.done(function(response){
        
        if (response.status == '200') {
          var intents = response.intents;
          var html = '';
          
          for (var i = 0; i < intents.length; i++){

            if(!window.dataConditions.includes('#'+ intents[i].intent))
              window.dataConditions.push('#' + intents[i].intent);
            
            html += '<li>';
            html += ' <div>';
            html += '   <a href="#" data-func="openIntent" data-intent="'+ intents[i].intent +'">';
            html += '     <i class="fa fa-angle-right" aria-hidden="true"></i>';
            html += '     <h5>#'+intents[i].intent+'</h5>';
            html += '   </a>';
            // html += '<a href="#" data-func="deleteIntent"><i class="fa fa-trash"></i></a>';
            html += ' </div>';
            html += ' <ul class="examples-list">';
            html += '   <div class="spinner"><div class="loader"></div></div>'
            html += ' </ul>';
            html += '</li>';
          }

          $container.html(html);
          self.eventsHandler($container.find('[data-func]'));
          $container.next('.spinner').remove();
          
        } else{
          // console.log('error list_intents');
        }

      });

      return promise;
    },
    getEntities: function () {
      var self = this;
      var $container = $('#list-entities');
      var promise = $.ajax({
        type: 'POST',
        url: getPath + 'mant/list_entities',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+getTkn
        },
        data:  JSON.stringify( {id_cliente: self.session}),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'
      });

      promise.done(function(response){
        if(response.status == '200'){
          var intents = response.intents;
          var html = '';
          for(var i = 0; i < intents.length; i++){
            if(!window.dataConditions.includes('@'+ intents[i].entity))
              window.dataConditions.push('@'+ intents[i].entity);
            html += '<li>';
            html += '<div>';
            html += '<a href="#" data-func="openEntitie" data-entity="'+ intents[i].entity +'">';
            html += '<i class="fa fa-angle-right" aria-hidden="true"></i>';
            html += '<h5>@'+intents[i].entity+'</h5>';
            html += '</a>';
            // html += '<a href="#" data-func="deleteEntity" ><i class="fa fa-trash"></i></a>';
            html += '</div>';
            html += '<ul class="examples-list">';
            html += '<div class="spinner"><div class="loader"></div></div>'
            html += '</ul>';
            html += '</li>';
          }
        
          $container.html(html);  
          self.eventsHandler($container.find('[data-func]'));
          $container.next('.spinner').remove();
        }else{
          // console.log('error list_entities');
        }
      });

      return promise;
    },
    listDialogs: function (data, parent, where) {

      var self = this,
          htmlResponse = '',
          buttonAddDialog = '',
          html = '',
          buttonReplace = '',
          $container = '';
      
        buttonAddDialog = '<li class="response">';
        buttonAddDialog += '  <button button="button" button-mini="button-mini" secondary="secondary" data-func="newDialogW">Añadir respuesta <i class="fa fa-plus"></i></button>';
        buttonAddDialog += '</li>';
      
      for (var i = 0; i < data.length; i++){

        // console.log(data[i]);

        if (data[i].output != null) {
          if (data[i].output.hasOwnProperty('text')) {
            if (data[i].output.text.hasOwnProperty('values') == true) {
              if (data[i].output.text.values.length == 0) {
                htmlResponse = '';
              } else {
                htmlResponse = '';
                for (var j = 0; j < data[i].output.text.values.length; j++){
                  if (data[i].output.text.values[j] == undefined) {
                    htmlResponse = '';
                    buttonAddDialog = '';
                  } else {
  
                    buttonReplace = data[i].output.text.values[j].substring(data[i].output.text.values[j].indexOf("%"), data[i].output.text.values[j].lastIndexOf("%") + 1);
                    // buttonReplace = '<span class="ocultar-botones">' + buttonReplace + '<span>';
  
                    htmlResponse += '<li class="response">';
                    htmlResponse += '  <div class="data-response">';
                    htmlResponse +=      data[i].output.text.values[j].replace(/%.*%/, '')+' '+buttonReplace;
                    htmlResponse += '  </div>';
                    htmlResponse += '  <ul class="menu-response">';
                    htmlResponse += '    <li><a class="dialog-edit" href="#;" data-func="editDialogW"><i class="fa fa-pencil"></i></a></li>';
                    htmlResponse += '    <li><a class="dialog-delete" href="#;" data-func="removeDialogW"><i class="fa fa-trash"></i></a></li>';
                    htmlResponse += '  </ul>';
                    htmlResponse += '</li>';
                    buttonAddDialog = '<li class="response">';
                    buttonAddDialog += '  <button button="button" button-mini="button-mini" secondary="secondary" data-func="newDialogW">Añadir respuesta <i class="fa fa-plus"></i></button>';
                    buttonAddDialog += '</li>';
                  }
                }
              }
            }
          }   
        }

        if (data[i].title != null ) {
          if (data[i].title.substring(0, 1) == "*") {
            html += '';
          } else if (data[i].title.substring(0, 1) == "+") {
            
            console.log('data[i]', data[i]);

            html += '<li class="parent" data-dialognode="'+ data[i].dialog_node +'">';
            html += ' <a class="title" href="#;" data-func="toggleAcc">';
            html += '   '+ data[i].title.substring(1) +' <i class="fa fa-angle-right" aria-hidden="true"></i>';
            html += ' </a>';
            html += ' <div class="dialog-content">';
            html += '   <ul class="dialogs">';
            html += '   </ul>';
            html += ' </div>';
            html += '</li>';
          } else {
            html += '<li class="parent" data-dialognode="'+ data[i].dialog_node +'">';
            html += ' <a class="title" href="#;" data-func="toggleAcc">';
            html += '   '+ data[i].title +' <i class="fa fa-angle-right" aria-hidden="true"></i>';
            html += ' </a>';
            html += ' <div class="dialog-content">';
            html += '   <ul class="dialogs">';
            html +=       htmlResponse;
            html +=       buttonAddDialog;
            html += '   </ul>';
            html += ' </div>';
            html += '</li>';
            htmlResponse = '';
          }
        } else {
          html += '<li class="parent" data-dialognode="'+ data[i].dialog_node +'">';
          html += ' <a class="title" href="#;" data-func="toggleAcc">';
          html += '   SIN TÍTULO DESDE CONVERSATION <i class="fa fa-angle-right" aria-hidden="true"></i>';
          html += ' </a>';
          html += ' <div class="dialog-content">';
          html += '   <ul class="dialogs">';
          html +=       htmlResponse;
          html +=       buttonAddDialog;
          html += '   </ul>';
          html += ' </div>';
          html += '</li>';
          htmlResponse = '';
        }
      }

      if (parent == null) {
        $container = where;
        $container.html(html);
        $container.next('.spinner').remove();
        self.eventsHandler($container.find('[data-func]'));
      } else {
        $container = where.parent();
        if (html != '') {
          $container.find('.dialog-content').append('<ul class="list-dialogs">' + html + '</ul>');
          self.eventsHandler($container.find('[data-func]'));
        }
      }

    },
    getDialogs: function () {
      var self = this;
      var promise = $.ajax({
        type: 'POST',
        url: self.apiUrl + 'mant/list_dialog',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+getTkn
        },
        data: JSON.stringify({
          id_cliente: self.session,
          parent: null
        }),
        dataType: 'json',
        processData: false,
        contentType: 'application/json; charset=utf-8'
      });
      
      promise.done(function (response) {
        if (response.status == '200') {
          Main.listDialogs(response.data, null, $('#list-dialogs'));
        } else {
          console.log('error getting dialogs');
        }
      });

      return promise;
    },
    clearParams: function () {
      var uri = window.location.toString();
      if (uri.indexOf("?") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
      }
    },

    getSwitch: function () {
      var args = {
        'id_cliente': '1'
      }
      var promise = $.ajax({
        type: 'POST',
        //descomente la linea de abajo
        url: getPath + 'mad/customize_param',
        crossDomain: true,
        data: JSON.stringify(args),
        contentType: 'application/json',
        dataType: 'json'
      });
      promise.done((response) => {
        if (response.estado == "1") {
          $('#form-switch label input[type=checkbox]').attr('checked', 'checked');
        } else {
          $('#form-switch label input[type=checkbox]').removeAttr('checked');
        }
      });
    },

    saveSwitch: function () {
      
      $('#form-switch').append('<div class="spinner"><div class="loader"></div></div>');

      if ($('#form-switch label input[type=checkbox]').is(':checked')) {
        estado = "1";
      } else {
        estado = "0";
      }

      var args = {
        'estado': estado,
        'id_cliente': '1'
      }
      var promise = $.ajax({
        type: 'POST',
        url: getPath + 'mant/kill_switch',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+getTkn
        },
        data: JSON.stringify(args),
        contentType: 'application/json',
        dataType: 'json'
      });
      promise.done((response) => {
        $('#form-switch').find('.spinner').remove();
        if (response.status == 200) {
          openModal('#myModal', 'Genial!', 'El estado del asistente se ha actualizado con éxito', 'success');
        } else {
          openModal('#myModal', 'Auch!', 'Tenemos un problema, favor intenta nuevamente', 'error');
        }
      });

    },

    ///////////////////////////// HANDLERS
    
    saveIntent: function ($form) {
      var self = this,
          $exampleIntents = $form.find('.example-intent'),
          exampleList = [],
          intentName = $form.find('#name-intent').val();

      $.each($exampleIntents, function(index, element) {
        exampleList.push({text: $(element).val()});
      });
      
      $form.append('<div class="spinner"><div class="loader"></div></div>');

      var promise = $.ajax({
        type: 'POST',
        url: getPath + 'mant/create_intent',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+getTkn
        },
        data:  JSON.stringify(
          { 
            intent: intentName,
            examples: JSON.stringify(exampleList),
            id_cliente: '1'
          }
        ),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'
      });

      promise.done(function(response){
        if(response.status == '200'){
          self.getAllIntents().done(function(response){
            $form.find('.spinner').remove();
            clearIntent('#name-intent', '#modal-intent'); 
            closeCustomModal('#modal-intent');
            openModal('#myModal', 'Genial!', 'La intención se ha agregado con éxito', 'success');
          });
        }else if(response.status == '400'){
          $form.find('.spinner').remove();
          openModal('#myModal', 'Auch!', 'Ya existe una intención con ese nombre', 'error');
        }else{
          $form.find('.spinner').remove();
          openModal('#myModal', 'Auch!', 'Tenemos un problema, favor intenta nuevamente', 'error');
        }
      });
    },
    saveEntitie: function($form){
      var self = this,
          $exampleIntents = $form.find('.example-intent'),
          exampleList = [],
          intentName = $form.find('#name-entity').val();

      $.each($exampleIntents, function(index, element) {
        exampleList.push({value: $(element).val()});
      });

      $form.append('<div class="spinner"><div class="loader"></div></div>');

      var promise = $.ajax({
        type: 'POST',
        url: getPath + 'mant/create_entity',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+getTkn
        },
        data:  JSON.stringify(
          { 
            entity: intentName,
            values: JSON.stringify(exampleList),
            id_cliente: self.session,
            id_cliente: '1'
          }
        ),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'
      });

      promise.done(function(response){
        if(response.status == '200'){
          self.getEntities().done(function(response){
            $form.find('.spinner').remove();
            clearIntent('#name-entity', '#modal-entity'); 
            closeCustomModal('#modal-entity');
            openModal('#myModal', 'Genial!', 'La entidad se ha agregado con éxito', 'success');
          });
        }else if(response.status == '400'){
          $form.find('.spinner').remove();
          openModal('#myModal', 'Auch!', 'Ya existe una entidad con ese nombre', 'error');
        }else{
          $form.find('.spinner').remove();
          openModal('#myModal', 'Auch!', 'Tenemos un problema, favor intenta nuevamente', 'error');
        }
      })
    },
    saveDialog: function($form){
      var self = this,
          responds = $('#list-dialogs-respond').find('textarea'),
          values = [];
      $.each(responds, function(index, element){
        values.push($(element).val());
      });
      $form.append('<div class="spinner"><div class="loader"></div></div>');
      var args = {
        id_cliente: self.session,
        title: $('#name-dialog').val(),
        conditions: $('#condition').val(),
        texto: JSON.stringify({
          values: values,
          selection_policy: 'random'
        })
      }
      var promise = $.ajax({
        type: 'POST',
        url: getPath + 'mant/create_dialog',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+getTkn
        },
        data: JSON.stringify(args),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'
      }).done(function(response){
        if(response.status == '200'){
          if(response.data.code == 400){
            $form.find('.spinner').remove();
            openModal('#myModal', 'Auch!', 'Ya existe un diálogo con ese nombre', 'error');
            return;
          }
          self.getDialogs().done(function(response){
            $form.find('.spinner').remove();
            clearIntent('#name-dialog', '#modal-dialog'); 
            closeCustomModal('#modal-dialog');
            openModal('#myModal', 'Genial!', 'El diálogo se ha agregado con éxito', 'success');
          });
        }else{
          $form.find('.spinner').remove();
          openModal('#myModal', 'Auch!', 'Tenemos un problema, favor intenta nuevamente', 'error');
        }
      })
    },
    editIntent: function($form){
      var self = this,
        $exampleIntents = $form.find('.example-intent'),
        exampleList = [],
        intentName = $form.find('#name-intent-edit').val();
      if(intentName !== ""){
        console.log("gfds");
        $.each($exampleIntents, function(index, element) {
          exampleList.push({text: $(element).val()});
        });
      }
      $form.append('<div class="spinner"><div class="loader"></div></div>');
      var promise = $.ajax({
        type: 'POST',
        url: getPath + 'mant/edit_intent',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+getTkn
        },
        data:  JSON.stringify(
          { 
            intent: intentName,
            examples: JSON.stringify(exampleList),
            id_cliente: '1'
          }
        ),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'
      });
      promise.done(function(response){
        if(response.status == '200'){
          self.getAllIntents().done(function(response){
            $form.find('.spinner').remove();
            clearIntent('#name-entity-edit', '#modal-entities-edit'); 
            closeCustomModal('#modal-entities-edit');
            openModal('#myModal', 'Genial!', 'La intención se se ha editado con éxito', 'success');
          })
        }else{
          $form.find('.spinner').remove();
          openModal('#myModal', 'Auch!', 'Tenemos un problema, favor intenta nuevamente', 'error');
        }
      });
    },
    editEntity: function($form){
      var self = this,
          $exampleIntents = $form.find('.example-intent'),
          exampleList = [],
          intentName = $form.find('#name-entity-edit').val();
      $.each($exampleIntents, function(index, element) {
        exampleList.push({value: $(element).val()});
      });
      $form.append('<div class="spinner"><div class="loader"></div></div>');
      var promise = $.ajax({
        type: 'POST',
        url: getPath + 'mant/edit_entity',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+getTkn
        },
        data:  JSON.stringify(
          { 
            entity: intentName,
            values: JSON.stringify(exampleList),
            id_cliente: self.session
          }
        ),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'
      });
      promise.done(function(response){
        if(response.status == '200'){
          self.getEntities().done(function(response){
            $form.find('.spinner').remove();
            clearIntent('#name-intent', '#modal-intent'); 
            closeCustomModal('#modal-intent');
            openModal('#myModal', 'Genial!', 'La entidad se se ha editado con éxito', 'success');
          });
        }else{
          $form.find('.spinner').remove();
          openModal('#myModal', 'Auch!', 'Tenemos un problema, favor intenta nuevamente', 'error');
        }
      })
    },
    editDialog: function ($form) {
      var self = this,
        responds = $('.dialogs.add-response .response').find('.data-response'),
        getParentND = $('.dialogs.add-response').parents('.parent').data('dialognode'),
        userName = user.user,
        values = [];
      for (var i = 0; i < responds.length; i++) {
        var getHtml = responds[i].innerHTML;
            getHtml = getHtml.replace(/"/g, "'");
        values.push(getHtml);
      }
      var args = {
        id_cliente: self.session,
        id_dialog: getParentND,
        nombre_usuario: userName,
        // title: $('#name-dialog-edit').val(),
        // conditions: $('#condition-edit').val(),
        texto: JSON.stringify({
          text: {
            values: values,
            selection_policy: 'random'
          }
        })
      }
      /// TEST ///
      var promise = $.ajax({
        type: 'POST',
        url: getPath + 'mant/edit_dialog',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+getTkn
        },
        data: JSON.stringify(args),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'
      }).done(function (response) {
        openModal('#myModal', 'Genial!', 'Tus respuestas han sido actualizadas', 'success');
        // console.log('todo bien');
      })
    },
    openIntent: function(event){
      event.preventDefault();
      var self = this,
          $item = $(event.currentTarget),
          intent = $item.data('intent'),
          $parentContainer = $item.parent().parent(),
          $container = $item.parent().parent().find('.examples-list'),
          html = '';
      $container.toggleClass('active');
      if(!$parentContainer.data('delegated')){
        $container.html('<div class="spinner"><div class="loader"></div></div>');
        $parentContainer.data('delegated', true);
        $parentContainer.css({
          'pointer-events': 'none'
        });
        var promise = $.ajax({
          type: 'POST',
          url: getPath + 'mant/list_examples',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+getTkn
          },
          data:  JSON.stringify(
            { 
              id_cliente: self.session,
              intent: intent
            }
          ),
          dataType: 'json',
          contentType: 'application/json; charset=utf-8'
        });
        promise.done((function(response){
          if (response.status == '200') {
            var examples = response.examples,
              htmlInner = '';
            
            console.log("ejemplos", examples);
            for(var i = 0; i < examples.length; i++){
              htmlInner += '<li>';
              htmlInner += '<label>';
              // htmlInner += '<div class="checkbox hide"><input type="checkbox"/><span></span></div>';
              // htmlInner += '<div class="checkbox"><input type="checkbox"/><span></span></div>';
              htmlInner += '<span>'+ examples[i].text + '</span>';
              htmlInner += '</label>';
              htmlInner += '</li>';
            }
            html += '<li class="options">';
            html += '<button data-func="openIntentEdition" button="button" button-mini="button-mini" secondary="secondary">Editar / Añadir ejemplo<i class="fa fa-plus-circle" aria-hidden="true"></i></button>';
            // html += '<a href="#;" onclick=""><i class="fa fa-trash"></i></a>';
            html += '</li>';
            html += htmlInner;
            $parentContainer.find('.examples-list').html( html );
            self.eventsHandler( $parentContainer.find('.examples-list').find('[data-func]') );
            $parentContainer.css({
              'pointer-events': 'auto'
            });
          }else{
            // console.log('error getting examples');
          }
        }))
      }
    },
    openEntitie: function(event){
      event.preventDefault();
      var self = this,
          $item = $(event.currentTarget),
          intent = $item.data('entity'),
          $parentContainer = $item.parent().parent(),
          $container = $item.parent().parent().find('.examples-list'),
          html = '';
      $container.toggleClass('active');
      if(!$parentContainer.data('delegated')){
        $container.html('<div class="spinner"><div class="loader"></div></div>');
        $parentContainer.data('delegated', true);
        $parentContainer.css({
          'pointer-events': 'none'
        });
        var promise = $.ajax({
          type: 'POST',
          url: getPath + 'mant/list_values',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+getTkn
          },
          data:  JSON.stringify(
            { 
              id_cliente: self.session,
              entity: intent
            }
          ),
          dataType: 'json',
          contentType: 'application/json; charset=utf-8'
        });

        promise.done((function(response){
          if(response.status == '200'){
            var values = response.values,
                htmlInner = '';
                
            for(var i = 0; i < values.length; i++){
              htmlInner += '<li>';
              htmlInner += '<label>';
              // htmlInner += '<div class="checkbox hide"><input type="checkbox"/><span></span></div>';
              // htmlInner += '<div class="checkbox"><input type="checkbox"/><span></span></div>';
              htmlInner += '<span>'+ values[i].value + '</span>';
              htmlInner += '</label>';
              htmlInner += '</li>';
            }
            
            html += '<li class="options">';
            html += '<button data-func="openEntityEdition" button="button" button-mini="button-mini" secondary="secondary">Editar / Añadir ejemplo<i class="fa fa-plus-circle" aria-hidden="true"></i></button>';
            // html += '<a href="#;" onclick=""><i class="fa fa-trash"></i></a>';
            html += '</li>';
            html += htmlInner;

            $parentContainer.find('.examples-list').html( html );
            self.eventsHandler( $parentContainer.find('.examples-list').find('[data-func]') );
            
            $parentContainer.css({
              'pointer-events': 'auto'
            });
          }else{
            // console.log('error getting examples');
          }
        }))
      }
    },
    openIntentEdition: function(event){
      getIntent(event.currentTarget, '#modal-intent-edit', '#name-intent-edit', 'fieldset-intent-edit')
      openCustomModal(event.currentTarget,'#modal-intent-edit', true, 'edit_intent')
    },
    openEntityEdition: function(event){
      getIntent(event.currentTarget, '#modal-entities-edit', '#name-entity-edit', 'fieldset-entity-edit')
      openCustomModal(event.currentTarget,'#modal-entities-edit', true, 'edit_entity')
    },
    openDialogEdition: function(event){
      openCustomModal(this, '#modal-dialog-edit', false, 'edit_dialog');
      editDialog(event.currentTarget);
    },
    deleteIntent: function(event){
      event.preventDefault();
      var $item = $(event.currentTarget);
      $('[data-todelete]').removeAttr('data-todelete');
      $item.parent().parent().attr('data-todelete', '1');
      openModal('#myModalChoice', 'Advertencia', '¿Estás seguro que deseas remover este item?', '');
    },
    deleteEntity: function(event){
      event.preventDefault();
      var $item = $(event.currentTarget);
      $('[data-todelete]').removeAttr('data-todelete');
      $item.parent().parent().attr('data-todelete', '1');
      openModal('#myModalChoiceEntity', 'Advertencia', '¿Estás seguro que deseas remover este item?', '');
    },
    deleteDialog: function(event){
      event.preventDefault();
      var $item = $(event.currentTarget);
      $('[data-todelete]').removeAttr('data-todelete');
      $item.parent().parent().attr('data-todelete', '1');
      openModal('#myModalChoiceDialog', 'Advertencia', '¿Estás seguro que deseas remover este diálogo?', '');
    },
    confirmDeleteIntent: function(){
      var self = this;
      var promise = $.ajax({
        type: 'POST',
        url: getPath + 'mant/delete_intent',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+getTkn
        },
        data:  JSON.stringify(
          { 
            intent: $('[data-todelete] h5').text().substring(1),
            id_cliente: '1'
          }
        ),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'
      });
      promise.done(function(response){
        if(response.status == '200'){
          openModal('#myModal', 'Genial!', 'La intención se ha eliminado con éxito', 'success');
          var indexCondition = window.dataConditions.indexOf($('[data-todelete]').find('h5').text());
          if (indexCondition > -1) {
            window.dataConditions.splice(indexCondition, 1);
          }
          $('[data-todelete]').remove();
        }else{
          openModal('#myModal', 'Auch!', 'Tenemos un problema, favor intenta nuevamente', 'error');
        }
      })
    },
    confirmDeleteEntity: function(){
      var self = this;
      var promise = $.ajax({
        type: 'POST',
        url: getPath + 'mant/delete_entity',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+getTkn
        },
        data:  JSON.stringify(
          { 
            entity: $('[data-todelete] h5').text().substring(1),
            id_cliente: self.session
          }
        ),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'
      });
      promise.done(function(response){
        if(response.status == '200'){
          openModal('#myModal', 'Genial!', 'La intención se ha eliminado con éxito', 'success');
          var indexCondition = window.dataConditions.indexOf($('[data-todelete]').find('h5').text());
          if (indexCondition > -1) {
            window.dataConditions.splice(indexCondition, 1);
          }
          $('[data-todelete]').remove();
        }else{
          openModal('#myModal', 'Auch!', 'Tenemos un problema, favor intenta nuevamente', 'error');
        }
      })
    },  
    confirmDeleteDialog: function(){
      var self = this;
      var promise = $.ajax({
        type: 'POST',
        url: getPath + 'mant/delete_dialogs',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+getTkn
        },
        data:  JSON.stringify(
          { 
            id_dialog: $('[data-todelete] h5').data('dialog-node'),
            id_cliente: self.session
          }
        ),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8'
      }).done(function(response){
        if(response.status == '200'){
          openModal('#myModal', 'Genial!', 'La intención se ha eliminado con éxito', 'success');
          $('[data-todelete]').remove();
        }else{
          openModal('#myModal', 'Auch!', 'Tenemos un problema, favor intenta nuevamente', 'error');
        }
      })
    },
    toggleTabs: function(event){
      event.preventDefault();
      var self = this,
          $item = $(event.currentTarget),
          $targetElement = $('[data-tab-target="'+ $item.data('index') +'"]'),
          callback = $targetElement.data('call');
      if(callback)
        self[callback]();
      $targetElement.addClass('in active').siblings().removeClass('in active');
    },
    toggleAcc: function (event) {
      event.preventDefault();
      var self           = this,
          $item          = $(event.currentTarget),
          $dialogContent = $item.parent().find('.dialog-content:first'),
          $dialogNode    = $item.parent().data('dialognode'),
          $getLi         = $item.parent();
      $dialogContent.toggleClass('open');
      $item.toggleClass('open');
      if ($getLi.hasClass('no-request') == false) {
        var promise = $.ajax({
          type: 'POST',
          url: getPath + 'mant/list_dialog',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+getTkn
          },
          data: JSON.stringify({
            id_cliente: self.session,
            parent: $dialogNode
          }),
          dataType: 'json',
          processData: false,
          contentType: 'application/json; charset=utf-8'
        });
        promise.done(function (response) {
          if (response.status == 200) {
            Main.listDialogs(response.data, $dialogNode, $item);
          }
        });
        $getLi.addClass('no-request');
      }
    },
    newDialogW: function (event) {
      event.preventDefault();
      var self     = this,
          $item    = $(event.currentTarget);
      $item.parents('ul.dialogs').addClass('add-response');
      if (!editorNew) {
        editorNew = new wysihtml5.Editor('textareaNew', {
          toolbar     : 'toolbar-new',
          stylesheets : 'assets/css/main.css',
          parserRules : wysihtml5ParserRules
        });
      }
      editorNew.textareaElement.innerHTML = '';
      editorNew.composer.iframe.contentDocument.body.innerHTML = '';
      $('#myModalWysiwygNew').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      });
    },
    editDialogW: function (event) {
      event.preventDefault();
      var self     = this,
          $item    = $(event.currentTarget);
      var getValue = $item.parents('li.response').find('.data-response').html();
      var editResponse = $item.parents('li.response').find('.data-response').addClass('active');
      $item.parents('.dialogs').addClass('add-response');
      if (!editor) {
        editor = new wysihtml5.Editor('textarea', {
          toolbar     : 'toolbar',
          stylesheets : 'assets/css/main.css',
          parserRules : wysihtml5ParserRules
        });
      }
      editor.textareaElement.innerHTML = getValue;
      editor.composer.iframe.contentDocument.body.innerHTML = getValue;
      $('#myModalWysiwyg').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      });
    },
    closeDialogW: function (event) {
      event.preventDefault();
      $('.data-response').removeClass('active');
      editor.textareaElement.innerHTML = '';
      editor.composer.iframe.contentDocument.body.innerHTML = '';
    },
    saveDialogW: function (event) {
      event.preventDefault();
      var getChanges = editor.composer.iframe.contentDocument.body.innerHTML;
      $('.data-response.active').empty().append(getChanges);
      $('.data-response.active').removeClass('active');
      Main.editDialog();
      $('.dialogs').removeClass('add-response');
    },
    removeDialogW: function (event) {
      event.preventDefault();
      var self     = this,
          $item    = $(event.currentTarget);
      $item.parents('.response').addClass('to-remove');
      $item.parents('.dialogs').addClass('add-response');
      $('#myModalDeleteDialog').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      });
    },
    confirmRemoveDialogW: function (event) {
      event.preventDefault();
      $('li.response.to-remove').remove();
      Main.editDialog();
      $('.dialogs.add-response').removeClass('add-response');
    },
    removeConfirmDW: function (event) {
      event.preventDefault();
      $('li.response.to-remove').removeClass('to-remove');
    },
    closeNewDialogW: function (event) {
      event.preventDefault();
      $('.dialogs.add-response').removeClass('add-response');
    },
    saveNewDialogW: function (event) {
      event.preventDefault();
      var self = this,
        $item = $(event.currentTarget);
      var getNewResponse = editorNew.composer.iframe.contentDocument.body.innerHTML;
      if (getNewResponse == '') {
        // console.log('vacío');
      } else {
        var html = '';
        html += '<li class="response">';
        html += ' <div class="data-response">';
        html +=     getNewResponse;
        html += ' </div>';
        html += ' <ul class="menu-response">';
        html += '   <li><a class="dialog-edit" href="#;" data-func="editDialogW"><i class="fa fa-pencil"></i></a></li>';
        html += '   <li><a class="dialog-delete" href="#;" data-func="removeDialogW"><i class="fa fa-trash"></i></a></li>';
        html += ' </ul>';
        html += '</li>';
        $('.dialogs.add-response').prepend(html);
        Main.editDialog();
        self.eventsHandler($('[data-func]'));
        self.eventsHandler($('[data-func]'));
        $('.dialogs.add-response').removeClass('add-response');
      }    
    }
  }
  
  var Main = new window.handler(); 
  $document.ready(function () {
    Main.initMad();
  });

  $window.load(function () {
    Main.onLoadSetup();
  });

  $window.on({
    'scroll': function () {
      Main.onScrollSetup();
    },
    'resize': function () {
      Main.onResizeSetup();
    }
  });

}(this, document, jQuery));