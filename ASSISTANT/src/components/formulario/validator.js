export function required(input, validates, required) {
  //Verificar tipo de input
  switch (input.tagName) {
    case "INPUT":
      if(input.type==="checkbox"){
        return !input.value == "off";
      }else{
        return !input.value.length == 0;
      }
    case "DIV"://Select
      if(input.classList.contains("options")){
        return select(input, validates, required);
      }else{
        break;
      }
    case "TEXTAREA":
      return !input.value.length == 0;
    default:
      break;
  }
}

export function checkbox(input, validates, required){
  if (required) {
    return !input.value == "off";
  }
  return true;
}

export function email(input, validates, required) {
  if (required) {
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegEx.test(input.value);
  } else if (input.value.length > 0) {
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegEx.test(input.value);
  }
  return true;
}

export function tel(input, validates, required) {
  //Si es requerido, debe pasar si o si
  // si no que evalúe el lenght
  if (required) {
    const telRegEx = /^[0-9]+$/;
    if (
      telRegEx.test(input.value) &&
      input.value.length >= 9 &&
      input.value.length <= 9
    ) {
      return true;
    } else {
      return false;
    }
  } else if (input.value.length > 0) {
    const telRegEx = /^[0-9]+$/;
    if (
      telRegEx.test(input.value) &&
      input.value.length >= 9 &&
      input.value.length <= 9
    ) {
      return true;
    } else {
      return false;
    }
  }
  return true;
}

export function text(input, validator, required) {
  if (required) {
    if (input.value === "") return false;
    const min = validator.getIn(["rules", "min"]),
      max = validator.getIn(["rules", "max"]);
    let validate = false;
    if (input.value.length >= min && input.value.length <= max) validate = true;
    return validate;
  } else if (input.value.length > 0) {
    if (input.value === "") return false;
    const min = validator.getIn(["rules", "min"]),
      max = validator.getIn(["rules", "max"]);
    let validate = false;
    if (input.value.length >= min && input.value.length <= max) validate = true;
    return validate;
  }
  return true;
}

export function cleanRut(rut) {
  return typeof rut === "string"
    ? rut.replace(/^0+|[^0-9kK]+/g, "").toUpperCase()
    : "";
}

export function rut(rut, validates, required) {
  rut = rut.value;
  if (required) {
    if (typeof rut !== "string") {
      return false;
    }
    if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut)) {
      return false;
    }

    rut = cleanRut(rut);

    if (rut.length > 9 || rut.length < 8) return false;

    var t = parseInt(rut.slice(0, -1), 10);
    var m = 0;
    var s = 1;

    while (t > 0) {
      s = (s + (t % 10) * (9 - (m++ % 6))) % 11;
      t = Math.floor(t / 10);
    }

    var v = s > 0 ? "" + (s - 1) : "K";
    return v === rut.slice(-1);
  } else if (rut.length > 0) {
    if (typeof rut !== "string") {
      return false;
    }
    if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut)) {
      return false;
    }

    rut = cleanRut(rut);

    if (rut.length > 9 || rut.length < 8) return false;

    var t = parseInt(rut.slice(0, -1), 10);
    var m = 0;
    var s = 1;

    while (t > 0) {
      s = (s + (t % 10) * (9 - (m++ % 6))) % 11;
      t = Math.floor(t / 10);
    }

    var v = s > 0 ? "" + (s - 1) : "K";
    return v === rut.slice(-1);
  }
  return true;
}

export function formatRut(rut) {
  rut = rut.value;
  rut = cleanRut(rut);

  var result = rut.slice(-4, -1) + "-" + rut.substr(rut.length - 1);
  for (var i = 4; i < rut.length; i += 3) {
    result = rut.slice(-3 - i, -i) + "." + result;
  }

  return result;
}

export function select(value, validates, required) {
  let optionSelected = value.dataset.valor===undefined?-1:value.dataset.valor;
  if (required) {
    return optionSelected != -1;
  } else if (optionSelected != -1) {
    return optionSelected != -1;
  }
  return true;
}
