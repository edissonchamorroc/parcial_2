const baseUrlConsultaPokemon = "https://pokeapi.co/api/v2/pokemon/"
const mensajeError = document.querySelector(".containerError");
const contenidoPokemon = document.querySelector(".containerInfo");
//Elementos de busqueda
const textoABuscar = document.querySelector("#in1");
const botonBusqueda = document.querySelector(".buttonSearch");
//Elementos pokemon
const nombreDePokemon = document.querySelector(".pokemonName")
const imagenPokemon = document.querySelector(".pokemonImg")
const tipoDePokemon = document.querySelector(".pokemonType")
const descripcionDePokemon = document.querySelector(".pokemonDescrition")
const habilidadesDePokemon = document.querySelector(".pokemonAbilities")

//Elementos evolucion
const botonEvolucionar = document.querySelector(".containerEvolution")


async function consultarPokemon(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    //se muestra error y se deshabilita la informacion de la card
    mensajeError.style.display = "block";
    contenidoPokemon.style.display = "none";
  }
}


async function consultaApi(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      //se muestra error y se deshabilita la informacion de la card
      mensajeError.style.display = "block";
      contenidoPokemon.style.display = "none";
    }
  }
async function modificarDOM(url) {
  const datosPokemon = await consultarPokemon(url);


  nombreDePokemon.innerHTML = datosPokemon.name;
  imagenPokemon.src = datosPokemon.sprites.front_default;
  tipoDePokemon.innerHTML = datosPokemon.types[0].type.name;
  //se agregan las habilidades
  const nombresHabilidades = datosPokemon.abilities.map(ability => ability.ability.name);
  const habilidadesTexto = nombresHabilidades.join(', ');
  habilidadesDePokemon.innerHTML = habilidadesTexto;
  const descripcionPokemon = await consultaApi(datosPokemon.species.url)
  descripcionDePokemon.innerHTML = descripcionPokemon.flavor_text_entries[0].flavor_text;
  //se habilita la informacion de la card
  const urlConsultaEvolucion = await consultaApi(descripcionPokemon.evolution_chain.url);

  //Cambiar informacion cuando pokemon tiene evolucion
  if(datosPokemon.name != urlConsultaEvolucion.chain.species.name ){
    const datosEvolucion = urlConsultaEvolucion.chain.evolves_to[0].evolution_details[0]
    botonEvolucionar.style.display = "block";
    nombreDePokemon.innerHTML = urlConsultaEvolucion.chain.species.name;
  }
  mensajeError.style.display = "none";
  contenidoPokemon.style.display = "block";

}


botonBusqueda.addEventListener("click", () => {
  const nombrePokemon = textoABuscar.value;
  const url = `${baseUrlConsultaPokemon}/${nombrePokemon}`;
  modificarDOM(url);
});