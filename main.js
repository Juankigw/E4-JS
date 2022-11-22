
// class pizza{
//   constructor(id, nombre, ingredientes, precio, imagen){
//       this.id=id;
//       this.nombre=nombre, 
//       this.ingredientes=ingredientes;
//       this.precio=precio;
//       this.imagen=imagen;
//   }
// }

// let pizza1= new pizza(1, "Muzzarela", ["Salsa", "muzzarela", "aceitunas"], 550, "./img/mussa.png");
// let pizza2= new pizza(2, "Napolitana", ["Salsa", "muzzarela", "aceitunas", "tomate"], 700, "./img/napo.png");
// let pizza3= new pizza(3, "Calabresa", ["Salsa", "muzzarela", "aceitunas", "salame"], 750, "./img/calabresa.png");
// let pizza4= new pizza(4, "Roquefort", ["Salsa", "muzzarela", "aceitunas", "roquefort"], 800, "./img/roquefort.png");
// let pizza5= new pizza(5, "Fugazeta", ["Salsa", "muzzarela", "aceitunas", "cebolla"], 700, "./img/Fugazzeta.png");
// let pizza6= new pizza(6, "Especial", ["Salsa", "muzzarela", "aceitunas", "jamon", "morron"], 750, "./img/especial.png");


// const arrayPizzas = [];
// arrayPizzas.push(pizza1, pizza2, pizza3, pizza4, pizza5, pizza6);

const input = document.querySelector(".input-number");
const buscarBtn = document.querySelector(".buscar-btn");
const buscarForm = document.querySelector(".buscar-form");
const renderPokemon = document.querySelector(".render-pokemon");

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

let ultimoPokemon = JSON.parse(localStorage.getItem("ultimoPokemon")) || {};

const saveLocalStorage = () => {
  localStorage.setItem("ultimoPokemon", JSON.stringify(ultimoPokemon));
};

const mostrarPokemon = (pokemon) =>{
const { id, name, sprites, height, weight, types } = pokemon;

return `
  <div class="poke">
        <img  src="${sprites.other.home.front_default}"/>
        <h2>${name.toUpperCase()}</h2>
        <div class="tipo-pokemon">
            ${types
              .map((tipo) => {
                return `<span class="pokemon_tipos">${tipo.type.name}</span>`;
              })
              .join("")}
        </div>
        <p class="id-poke">#${id}</p>
        <p class="altura">Altura: ${height / 10}m</p>
        <p class="peso">Peso: ${weight / 10}Kg</p>
    </div>
  `;
};

const renderizarPokemon = (pokemon) => {
  ultimoPokemon=pokemon;
  saveLocalStorage();
  renderPokemon.innerHTML = mostrarPokemon(ultimoPokemon);
};

const mostrarError= (error)=>{
  renderPokemon.innerHTML = `<h3>${error}</h3>`
}

const buscarPokemon = async (e) => {
  e.preventDefault();
  const pokemonId = input.value;
  if (pokemonId.length === 0) {
    mostrarError("Por favor, ingrese una ID");
    return
  }
     const pokemonEncontrado = await fetchPokemon (pokemonId);
     if (pokemonEncontrado === undefined){
      mostrarError(`No existe un pokemon con el Nro ${pokemonId}`)
      input.value=""
      return
     }
     renderizarPokemon(pokemonEncontrado)
      console.log(pokemonEncontrado);
  input.value=""
};

const fetchPokemon = async (pokemonId) => {
 try{
  const res = await fetch(baseURL+pokemonId);
  const data= await res.json();
  return data
}  catch(err){
  console.log( "error "+ err);
  }
};

const init = () => {
  buscarForm.addEventListener("submit", buscarPokemon);
  renderizarPokemon(ultimoPokemon);
};

init();
