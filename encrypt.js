//Funcion que suelta la logica
function encrypt() {
  const valueTextarea = document.getElementById("textareaId").value;
  console.log("Texto a encriptar:", valueTextarea);

  const encryptedText = replaceVocales(valueTextarea);
  displayEncryptedText(encryptedText);
  logEncryptedText(encryptedText);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    encrypt();
  }
});

document
  .getElementById("textareaId")
  .addEventListener("input", function (event) {
    const pattern = /^[a-z\s]+$/;
    const textarea = event.target;
    const value = textarea.value;

    const filteredValue = value
      .split("")
      .filter((char) => pattern.test(char))
      .join("");
    textarea.value = filteredValue;
  });

//Patron de codificacion y decodificacion
const vocalesArray = {
  e: "enter",
  i: "imea",
  a: "ai",
  o: "ober",
  u: "ufat",
};

//Funcion con el patron de encriptacion
function replaceVocales(text) {
  let newText = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i].toLowerCase();
    if (vocalesArray.hasOwnProperty(char)) {
      newText += vocalesArray[char];
    } else {
      newText += char;
    }
  }
  return newText;
}

//Pinta el texto en la Etiqueta P
function displayEncryptedText(text) {
  const textActualElement = document.getElementById("text-actual");
  textActualElement.textContent = text;
}

function logEncryptedText(text) {
  console.log("Texto encriptado:", text);
}

//Manejando la copia del texto con una promesa

function copytextEncrypt() {
  const texto = document.getElementById("text-actual").innerText;

  navigator.clipboard
    .writeText(texto)
    .then(() => {
      alert("Texto copiado al portapapeles: " + texto);
    })
    .catch((err) => {
      console.error("Error al copiar el texto: ", err);
    });
}

//Desencriptador funcion
function desencript(text) {
  let decryptedtext = text;
  for (const [key, value] of Object.entries(vocalesArray)) {
    const regex = new RegExp(value, "g");
    decryptedtext = decryptedtext.replace(regex, key);
  }
  return decryptedtext;
}
//Ejecutar Desencriptador
function ejecutadesencriptar() {
  const valueTextarea = document.getElementById("textareaId").value;
  console.log("Texto a deseencriptar:", valueTextarea);
  const textoDesencriptado = desencript(valueTextarea);
  displayEncryptedText(textoDesencriptado);
}
