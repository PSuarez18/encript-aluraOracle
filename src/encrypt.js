//Funcion que suelta la logica
function encrypt() {
  const valueTextarea = document.getElementById("textareaId").value;

  const encryptedText = replaceVocales(valueTextarea);
  displayEncryptedText(encryptedText);

  const containerRight = document.getElementById("containerRight");
  containerRight.classList.remove("myAnim"); // Asegura que se reinicie la animación al hacer clic nuevamente
  void containerRight.offsetWidth; // Trigger reflow para reiniciar la animación
  containerRight.classList.add("myAnim"); // Agrega la clase de animación
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    encrypt();
  }
});

//Permite que no se introduzca caracteres especiales
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
  i: "imes",
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
  if (text === "" || text === " ") {
    textActualElement.textContent =
      "Ningun mensaje fue encontrado, ingrese el texto que desees encriptar o desencriptar";
    return;
  }
  textActualElement.textContent = text;
}

//Manejando la copia del texto con una promesa

function copytextEncrypt() {
  const texto = document.getElementById("text-actual").innerText;
  const copyNotification = document.getElementById("copyNotification");

  navigator.clipboard
    .writeText(texto)
    .then(() => {
      // Mostrar la notificación de copia
      copyNotification.style.display = "block";

      // Ocultar la notificación después de 2 segundos
      setTimeout(() => {
        copyNotification.style.display = "none";
      }, 3000);
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

  const textoDesencriptado = desencript(valueTextarea);
  displayEncryptedText(textoDesencriptado);

  const containerRight = document.getElementById("containerRight");
  containerRight.classList.remove("myAnim"); // Asegura que se reinicie la animación al hacer clic nuevamente
  void containerRight.offsetWidth; // Trigger reflow para reiniciar la animación
  containerRight.classList.add("myAnim"); // Agrega la clase de animación
}

//Previene que se repita y que se peque espacios en blanco
function validateTextarea() {
  const textareaDom = document.getElementById("textareaId");

  textareaDom.addEventListener("keydown", (evento) => {
    var code = evento.keyCode || evento.which;
    if (code === 32 && evento.repeat) {
      evento.preventDefault();
    }
  });

  textareaDom.addEventListener("input", (ev) => {
    var text = textareaDom.value;
    textareaDom.value = text.replace(/\s{2,}/g, " ");
  });
}
