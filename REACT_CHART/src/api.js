const backend_host = "https://asistente-duoc.mycognitiva.io/mant/";
var token = "7yJrzfxnbw6BMbbfNDoS";
export function getTotalInteractions(start, end, cb) {
	fetch(backend_host + 'interacciones_totales', {
	  	method: 'POST',
      //mode: 'no-cors',
      body: JSON.stringify({
        "inicio": start,
        "fin": end
      }),
	  	headers: {
	    	'Content-Type': 'application/json',
       // 'token': token
	}})
	.then((response) => { return response.json()})
	.then((responseJson) => {
		if(cb) cb(null, responseJson);
	})
	.catch((error) => {
  	if(cb) cb(error);
  });
};
export function getAverageOperationalTime(start, end, cb) {
  fetch(backend_host + 'tmo', {
      method: 'POST',
      //mode: 'no-cors',
      body: JSON.stringify({
        "inicio": start,
        "fin": end
      }),
      headers: {
        'Content-Type': 'application/json',
        token
   }})
    .then((response) => { return response.json()})
    .then((responseJson) => {
      if(cb) cb(null, responseJson);
    })
    .catch((error) => {
      if(cb) cb(error);
    });
};
export function getValuations(start, end, cb) {
  /*{
    "inicio":"2018-05-01",
    "fin":"2018-05-06"
  }*/
  fetch(backend_host + 'valoraciones', {
      method: 'POST',
      body: JSON.stringify({
        "inicio": start,
        "fin": end
      }),
      headers: {
        'Content-Type': 'application/json',
        token
   }})
    .then((response) => { return response.json()})
    .then((responseJson) => {
      if(cb) cb(null, responseJson);
    })
    .catch((error) => {
      if(cb) cb(error);
    });
};
export function getFAQ(start, end, cb) {
  fetch(backend_host + 'preguntas_frecuentes', {
      method: 'POST',
      body: JSON.stringify({
        "inicio": start,
        "fin": end
      }),
      headers: {
        'Content-Type': 'application/json',
        token
   }})
    .then((response) => { return response.json()})
    .then((responseJson) => {
      if(cb) cb(null, responseJson);
    })
    .catch((error) => {
      if(cb) cb(error);
    });
};
export function getCategories(cb) {
  /*{
    "inicio":"2018-05-01",
    "fin":"2018-05-06"
  }*/
  fetch(backend_host + 'categorias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token
   }})
    .then((response) => { return response.json()})
    .then((responseJson) => {
      if(cb) cb(null, responseJson);
    })
    .catch((error) => {
      if(cb) cb(error);
    });
};
export function getAssertiveness(start, end, cb) {
  /*{
    "inicio":"2018-05-01",
    "fin":"2018-05-06"
  }*/
  fetch(backend_host + 'asertividad', {
      method: 'POST',
      body: JSON.stringify({
        "inicio": start,
        "fin": end
      }),
      headers: {
        'Content-Type': 'application/json',
        token
   }})
    .then((response) => { return response.json()})
    .then((responseJson) => {
      if(cb) cb(null, responseJson);
    })
    .catch((error) => {
      if(cb) cb(error);
    });
};
export function getDetailInteractions(start, end, cb) {
	fetch(backend_host + 'detalle_interacciones', {
	  	method: 'POST',
      //mode: 'no-cors',
      body: JSON.stringify({
        "inicio": start,
        "fin": end
      }),
	  	headers: {
	    	'Content-Type': 'application/json',
       // 'token': token
	}})
	.then((response) => { return response.json()})
	.then((responseJson) => {
		if(cb) cb(null, responseJson);
	})
	.catch((error) => {
  	if(cb) cb(error);
  });
};
export function getDetailSesiones(start, end, cb) {
	fetch(backend_host + 'detalle_sesiones', {
	  	method: 'POST',
      //mode: 'no-cors',
      body: JSON.stringify({
        "inicio": start,
        "fin": end
      }),
	  	headers: {
	    	'Content-Type': 'application/json',
       // 'token': token
	}})
	.then((response) => { return response.json()})
	.then((responseJson) => {
		if(cb) cb(null, responseJson);
	})
	.catch((error) => {
  	if(cb) cb(error);
  });
};