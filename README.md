# Assistant React
Proyecto que contiene 4 carpetas **"ASSISTANT", "CDN", "FRONT" y "REACT_CHART"**

## URLS
- ASISTENTE : https://asistentedev-duoc.mycognitiva.io/asistente/
- MANTENEDOR : https://asistentedev-duoc.mycognitiva.io/
- CDN : https://asistentedev-duoc.mycognitiva.io/cdn/

## JENKINS 
- ASISTENTE_REACT

## Quick Start
1. Clonar repo
2. Ir a carpeta que quieras levantar
3. ` $ npm install `
4. ` $ npm start ` o ` gulp ` (en CDN y FRONT)

## CDN
El CDN es un proyecto hecho con VanillaJS y GULP. Con el cual se pinta el iframe en la página que se necesite el asistente, además de tener varios métodos **postMessage** que cambian los estilos del iframe.

## FRONT
Es el proyecto del mantenedor del asistente, es igual a todos, pero con mejoras. Desarrollado con pug, Jquery, javascript y sass. Toma los gráficos del proyecto **REACT_CHART**

## REACT_CHART
Tiene sólo los gráficos del mantenedor. Está desarrollado con ReactJS.

## ASISTENTE
El ASISTENTE es un proyecto desarrollado con ReactJS, Redux, Sass. Es el asistente para cualquier nuevo proyecto, está hecho de forma modular para que sirva en todos los clientes. Tiene muchas funcionalidades, las cuales describiré a continuación:

### Conversations
El componente principal del proyecto, es **Conversation**, el cual desplega toda la conversación que tenga el asistente. dependiendo de lo que envíe BE. </br>
Las conversaciones se van guardando en localStorage encriptadas. </br>
Tiene disponible todos estos features para construir la conversación:
`````

      //1 = MSG + Buttons (Valoración)
      //2 = MSG + Buttons (Contactar)
      //3 = MSG + Attach
      //4 = MSG + Select
      //5 = MSG + Multibutton
      //6 = MSG + Datepicker
      //8 = MULTIMSG
      //9 = Like
      // debugger
      
      switch (msg) {
        case 1:
          data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            msg: ["Soy una respuesta", "Te gustaría valorar la respuesta?"],
            buttons: [
              {
                title: "SI",
                value: "siValorar"
              },
              {
                title: "NO",
                value: "noValorar"
              }
            ]
          };
          break;
        case 2:
          data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            msg: ["Contactar?"],
            buttons: [
              {
                title: "SI",
                value: "siContacto"
              },
              {
                title: "NO",
                value: "noContacto"
              }
            ]
          };
          break;
        case 3:
          data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            msg: ["Debes adjuntar tu imagen"],
            attach: {
              types: [
                "image/jpeg",
                "image/gif",
                "image/png",
                "application/pdf",
                "application/word"
              ],
              maxSize: 300000
            }
          };
          break;
        case 4:
          data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            msg: ["Por favor, selecciona una opción: "],
            selects: [
              {
                text: "Seleccione",
                value: "-1"
              },
              {
                text: "Option 1",
                value: "1"
              },
              {
                text: "Option 2",
                value: "2"
              },
              {
                text: "Option 3",
                value: "3"
              },
              {
                text: "Option 4",
                value: "4"
              },
              {
                text: "Option 5",
                value: "5"
              },
              {
                text: "Option 6",
                value: "6"
              }
            ]
          };
          break;
        case 5:
          data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            msg: ["Hola, selecciona uno o varios botones:"],
            multibuttons: [
              { title: "hola", value: "1" },
              { title: "holanda", value: "2" },
              { title: "holiwis", value: "3" },
              { title: "holo", value: "4" },
              { title: "holawa", value: "5" }
            ]
          };
          break;
        case 6:
          data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            msg: ["Hola, seleccione una fecha:"],
            datepicker: [
              { name: "inicial", value: "22/05/1991" },
              { name: "final", value: "22/05/1991" }
            ]
          };
          break;
        // case 7:
        //   data = {
        //     general: {
        //       cid: "SOYELCID",
        //       origen: "Sitio Público",
        //       nodo_id: null,
        //       intent: null,
        //       auth: null,
        //       token: null,
        //       location: null
        //     },
        //     msg: ["Hola, seleccione una fecha:"],
        //     datepicker: [{ name: "", value: "" }, { name: "", value: "" }]
        //   };
        //   break;
        case 8:
          data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            msg: ["lorem ipsum", "lorem ipsum", "lorem ipsum", "lorem ipsum"]
          };
          break;
        case 9:
          data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            like: true
          };
          break;
        default:
          data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            msg: ["Soy una respuesta", "Puedes seguir hablándome"]
          };
        break;
      }
`````

### Formularios
Para desplegar formularios es importante saber que todo viene desde la respuesta de BE, con lo cual el asistente toma todos los parámetros y despliega los inputs necesarios con sus validaciones ya hechas. Éste puede recibir todos los parámetros:


`````
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            send: "from",
            enabled: true,
            liftUp: "form",
            form: {
              header: {
                icon: "fas fa-user-tie",
                textA: "Por favor ingrese sus datos y",
                textStrong:
                  "uno de nuestros ejecutivos le responderá a la brevedad posible",
                textB: "o en horario hábil siguiente",
                closeMsg: "No"
              },
              bajada: "Campos obligatorios (*)",
              url: "",
              fields: [
                {
                  legend: "Nombre*",
                  type: "text",
                  name: "nombre",
                  placeholder: "Ej. Juan",
                  autocomplete: "off",
                  validate: {
                    types: ["required", "text"],
                    rules: { min: 3, max: 10 },
                    error: "Debes completar el nombre (mínimo 3, máximo 10)"
                  }
                },
                {
                  type: "selects-link",
                  parent: {
                    legend: "Select",
                    type: "select",
                    name: "region",
                    options: [
                      { text: "Seleccione", value: -1 },
                      { text: "Region 1", value: "R1" },
                      { text: "Region 2", value: "R2" },
                      { text: "Region 3", value: "R3" }
                    ],
                    validate: {
                      types: ["required", "select"],
                      error: "Debes seleccionar una opción"
                    }
                  },
                  children: {
                    legend: "Select Search",
                    type: "search",
                    name: "cursos",
                    options: [
                      {
                        key: "R1",
                        options: [
                          { text: "Curso 1 R1", value: "COD1" },
                          { text: "Curso 2 R1", value: "COD2" },
                          { text: "Curso 3 R1", value: "COD3" },
                          { text: "Curso 4 R1", value: "COD4" }
                        ]
                      },
                      {
                        key: "R2",
                        options: [
                          { text: "Curso 1 R2", value: "COD1" },
                          { text: "Curso 2 R2", value: "COD2" },
                          { text: "Curso 3 R2", value: "COD3" },
                          { text: "Curso 4 R2", value: "COD4" }
                        ]
                      },
                      {
                        key: "R3",
                        options: [
                          { text: "Curso 1 R3", value: "COD1" },
                          { text: "Curso 2 R3", value: "COD2" },
                          { text: "Curso 3 R3", value: "COD3" },
                          { text: "Curso 4 R3", value: "COD4" }
                        ]
                      },
                      
                    ],
                    validate: {
                      types: ["required", "text"],
                      rules: { min: 3, max: 1000 },
                      error: "Debes seleccionar una opción"
                    }
                  }
                },
                // {
                //   legend: "Select Search",
                //   type: "search",
                //   name: "opciones",
                //   options: [
                //     { text: "Perro" },
                //     { text: "Gato" },
                //     { text: "Cocodrilo" },
                //     { text: "Serpiente" },
                //     { text: "Chancho" },
                //     { text: "Ratón" }
                //   ],
                //   validate: {
                //     types: ["required", "search"],
                //     error: "Debes seleccionar una opción"
                //   }
                // },
                {
                  legend: "Rut*",
                  type: "text",
                  name: "rut",
                  placeholder: "Ej. 11111111-1",
                  autocomplete: "off",
                  validate: {
                    types: ["required", "rut"],
                    error: "Debes ingresar un rut válido"
                  }
                },
                {
                  legend: "Teléfono",
                  type: "tel",
                  name: "telefono",
                  placeholder: "Ej. 912345678",
                  autocomplete: "off",
                  validate: {
                    types: ["tel"],
                    error: "Debes ingresar un teléfono válido"
                  }
                },
                {
                  legend: "Correo electrónico*",
                  type: "email",
                  name: "email",
                  placeholder: "Ej. nombre@micorreo.cl",
                  autocomplete: "off",
                  validate: {
                    types: ["required", "email"],
                    error: "Debes ingresar un correo electrónico válido"
                  }
                },
                {
                  legend: "Switch*",
                  type: "checkbox",
                  name: "switch",
                  validate: {
                    types: ["checkbox"],
                    error: "Debes seleccionar el checkbox"
                  }
                },
                {
                  legend: "Select prueba",
                  type: "select",
                  name: "opciones",
                  options: [
                    { text: "Seleccione", value: -1 },
                    { text: "Opcion #1", value: 1 },
                    { text: "Opcion #2", value: 2 },
                    { text: "Opcion #3", value: 3 }
                  ],
                  validate: {
                    types: ["required", "select"],
                    error: "Debes seleccionar una opción"
                  }
                },
                {
                  legend: "Adjuntar*",
                  type: "file",
                  name: "attach",
                  validate: {
                    types: ["required", "file"],
                    error: "Debes adjuntar",
                    rules: {
                      types: [
                        "image/jpeg",
                        "image/gif",
                        "image/png",
                        "application/pdf",
                        "application/word"
                      ],
                      maxSize: 300000,
                      maxQuantity: 3
                    }
                  }
                },
                {
                  legend: "Comentario",
                  type: "textarea",
                  name: "comentario",
                  placeholder: "Escriba aquí su comentario",
                  autocomplete: "off",
                  rows: 5,
                  validate: {
                    types: ["text"],
                    rules: { min: 3, max: 150 },
                    error: "Debes completar el nombre (mínimo 3, máximo 150)"
                  }
                }
              ]
            }
          };
           data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            send: "from",
            enabled: true,
            liftUp: "form",
            form: {
              header: {
                icon: "fas fa-user-tie",
                textA: "Por favor ingrese sus datos y",
                textStrong:
                  "uno de nuestros ejecutivos le responderá a la brevedad posible",
                textB: "o en horario hábil siguiente",
                closeMsg: "No"
              },
              bajada: "Campos obligatorios (*)",
              url: "",
              fields: [
                {
                  type: "selects-link",
                  parent: {
                    legend: "Select",
                    type: "select",
                    name: "region",
                    options: [
                      { text: "Seleccione", value: -1 },
                      { text: "Region 1", value: "R1" },
                      { text: "Region 2", value: "R2" },
                      { text: "Region 3", value: "R3" }
                    ],
                    validate: {
                      types: ["required", "select"],
                      error: "Debes seleccionar una opción"
                    }
                  },
                  children: {
                    legend: "Select Search",
                    type: "search",
                    name: "cursos",
                    options: [
                      {
                        key: "R1",
                        options: [
                          { text: "Curso 1 R1", value: "COD1" },
                          { text: "Curso 2 R1", value: "COD2" },
                          { text: "Curso 3 R1", value: "COD3" },
                          { text: "Curso 4 R1", value: "COD4" },
                          { text: "Curso 4 R1", value: "COD4" },
                          { text: "Curso 4 R1", value: "COD4" },
                          { text: "Curso 4 R1", value: "COD4" },
                          { text: "Curso 4 R1", value: "COD4" }
                        ]
                      },
                      {
                        key: "R2",
                        options: [
                          { text: "Curso 1 R2", value: "COD1" },
                          { text: "Curso 2 R2", value: "COD2" },
                          { text: "Curso 3 R2", value: "COD3" },
                          { text: "Curso 4 R2", value: "COD4" }
                        ]
                      },
                      {
                        key: "R3",
                        options: [
                          { text: "Curso 1 R3", value: "COD1" },
                          { text: "Curso 2 R3", value: "COD2" },
                          { text: "Curso 3 R3", value: "COD3" },
                          { text: "Curso 4 R3", value: "COD4" }
                        ]
                      },
                      
                    ],
                    validate: {
                      types: ["required", "text"],
                      rules: { min: 3, max: 1000 },
                      error: "Debes seleccionar una opción"
                    }
                  }
                },
                {
                  legend: "Comentario",
                  type: "textarea",
                  name: "comentario",
                  placeholder: "Escriba aquí su comentario",
                  autocomplete: "off",
                  rows: 5,
                  validate: {
                    types: ["text"],
                    rules: { min: 3, max: 150 },
                    error: "Debes completar el nombre (mínimo 3, máximo 150)"
                  }
                }
              ]
            }
          };

`````

### Otros
Además tiene los siguientes componentes para mostrar, **Ayuda(con posición arriba o abajo), Emojis, Voice(sólo para Chrome), Valoración, Launcher**

### Configuración
Para que cada asistente sea distinto, éste toma los parámetros del endpoint **custom_params** que trae toda la configuración para que despliegue lo necesario, este es un ejemplo del custom params:

`````
{
      avatar:  "/static/media/icono-cognitiva-2.9dc78e8e.svg",
      colorHeader: "#6f4aad",
      colorBtn: "#2979ff",
      estado: "1",
      // logo:
      //   "/static/media/icon-assistant-jose.a0612191.svg",
      logo:
        "/static/media/logoH.8c71aadb.svg",
      status: 200,
      subtitulo: "Asistente virtual",
      titulo: "Cognitiva",
      url: "https://example.com",
      userImg:
        "https://yt3.ggpht.com/a-/ACSszfo",
      imgBackHeader: "/static/media/nodos.772747fe.svg",
      settings: {
        keep_conversation: true,
        geolocalization: false,
        help: true,
        attach: false, // no está desarrollado al 100%
        emoji: false,
        voice: true,
        positionHelp: "bottom"
      }
    };

`````
Éstas configuraciones se guardan en localStorage encriptados. 

### Integraciones
Para realizar integraciones BE debe mandar lo que necesite por un parámetro en el endpoint **message** llamado **integracion**, el asistente tiene todo configurado para que toma esa integración y siga el flujo. 

