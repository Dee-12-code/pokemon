// Add event listener to the search button
document.getElementById("search-button").addEventListener("click", searchPokemon);

// API URL
const API_URL = "https://pokeapi.co/api/v2/pokemon/";

// Search Pokémon function
async function searchPokemon() {
  const input = document.getElementById("search-input").value.trim().toLowerCase();
  const pokemonInfo = document.getElementById("pokemon-info");

  // Clear previous data
  pokemonInfo.querySelector("#pokemon-name").textContent = "";
  pokemonInfo.querySelector("#pokemon-id").textContent = "";
  pokemonInfo.querySelector("#weight").textContent = "";
  pokemonInfo.querySelector("#height").textContent = "";
  pokemonInfo.querySelector("#types").textContent = "";
  pokemonInfo.querySelector("#hp").textContent = "";
  pokemonInfo.querySelector("#attack").textContent = "";
  pokemonInfo.querySelector("#defense").textContent = "";
  pokemonInfo.querySelector("#special-attack").textContent = "";
  pokemonInfo.querySelector("#special-defense").textContent = "";
  pokemonInfo.querySelector("#speed").textContent = "";
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove();

  // Handle special cases
  if (input === "red") {
    alert("Pokémon not found");
    return;
  }

  try {
    // Fetch Pokémon data
    const response = await fetch(API_URL + input);
    if (!response.ok) throw new Error("Pokémon not found");
    const data = await response.json();

    // Populate Pokémon data
    pokemonInfo.querySelector("#pokemon-name").textContent = data.name.toUpperCase();
    pokemonInfo.querySelector("#pokemon-id").textContent = `#${data.id}`;
    pokemonInfo.querySelector("#weight").textContent = `Weight: ${data.weight}`;
    pokemonInfo.querySelector("#height").textContent = `Height: ${data.height}`;
    
    // Add types
    const typesContainer = pokemonInfo.querySelector("#types");
    typesContainer.innerHTML = ''; // Clear previous types
    data.types.forEach((typeInfo) => {
      const typeElement = document.createElement("span");
      typeElement.textContent = typeInfo.type.name.toUpperCase();
      typesContainer.appendChild(typeElement);
    });

    // Stats
    const stats = data.stats;
    pokemonInfo.querySelector("#hp").textContent = stats[0].base_stat;
    pokemonInfo.querySelector("#attack").textContent = stats[1].base_stat;
    pokemonInfo.querySelector("#defense").textContent = stats[2].base_stat;
    pokemonInfo.querySelector("#special-attack").textContent = stats[3].base_stat;
    pokemonInfo.querySelector("#special-defense").textContent = stats[4].base_stat;
    pokemonInfo.querySelector("#speed").textContent = stats[5].base_stat;

    // Add sprite
    const img = document.createElement("img");
    img.id = "sprite";
    img.src = data.sprites.front_default;
    pokemonInfo.appendChild(img);

    // Show Pokémon info card
    pokemonInfo.style.display = "block";

  } catch (error) {
    alert("Pokémon not found");
  }
}
