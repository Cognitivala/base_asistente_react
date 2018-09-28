###Instalación

Para general el proyecto se debe tener instaladas las siguientes herramientas:

  * Node + npm
  * Yarn (instalado con npm install yarn -g)

una vez instaladas estas herramientas, ejecutar:

```yarn install```

y luego

```yarn build```

con esto se generará una carpera llamada "build"

Para incluir este proyecto react en el sistema ya existente se deben incluir los archivos css y js que están disponibles en la carpeta "build" generada previamente. 
Además se debe tener en el HTML en el lugar que se quiere mostrar el dashboard.

```<div id="root"></div>```

también buscará los recursos que estan en las carpeta "font" e "img" en /font e /img del mapa del sitio.