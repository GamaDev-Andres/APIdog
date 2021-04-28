const formulario = document.querySelector("#buscador");
const buscador = formulario.search;
const divResultados = document.querySelector(".resultados");
const contenedor = document.querySelector(".contenedor");
// const erSearch = /[[a-zá-üñ]{4,}$/gi;
const erSearch = /\w\D$/gi;
let razas = [];
const urlRazas = "https://dog.ceo/api/breeds/list/all";
let imgRazas = [];

document.addEventListener("DOMContentLoaded", () => {
  consultaRazas();
  formulario.addEventListener("submit", validarSearch);
});
function consultaRazas() {
  fetch(urlRazas)
    .then((resultado) => resultado.json())
    .then((entradas) => {
      for (const nombre in entradas.message) {
        razas = [...razas, nombre];
      }
    });
}
function validarSearch(e) {
  e.preventDefault();
  if (razas.some((nombre) => nombre === buscador.value)) {
    consultaAPI();
  } else {
    alert("NO EXISTE ESA RAZA");
  }

  //   formulario.reset();
}
function consultaAPI() {
  const urlImgRaza = `https://dog.ceo/api/breed/${buscador.value}/images/random/9`;

  fetch(urlImgRaza)
    .then((resultados) => resultados.json())
    .then((entradas) => {
      mostrarImagenes(entradas);
    });
}
function mostrarImagenes(entradas) {
  limpiezaHTML();
  let arrayImg = entradas.message;
  const titulo = document.querySelector(".titulo");
  titulo.textContent = "Resultados de tu busqueda";
  contenedor.insertBefore(titulo, divResultados);
  arrayImg.forEach((imagen) => {
    const div = document.createElement("div");
    div.classList.add("div-razas");
    div.innerHTML += `
      <img class="img-raza" loading="lazy" src=${imagen} >
      <h3>${buscador.value}</h3>
      <p><strong>Mi historia: </strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dictum quam magna, a ornare nulla molestie ut. Proin placerat laoreet gravida. Nullam sagittis leo quis ex porta tempus</p>
      <a href=${imagen} target="_blank">Ver Imagen Completa</a>
      `;
    divResultados.appendChild(div);
  });
  formulario.reset();
}
function limpiezaHTML() {
  divResultados.innerHTML = "";
}
