const form = document.querySelector("form");
const searchInput = form.querySelector("input");
const filterButton = form.querySelector(".filterbtn");
const typeSelect = document.querySelector("#typeSelect");
const typeAPI = " https://pokeapi.co/api/v2/type/";
let types;
// const select = document.querySelector("select");
const resetBtn = document.querySelector(".reset");

let finalData = [];
const pokemonDiv = document.querySelector(".pokemonDiv");


async function getPokemons() {
    let arr = [];
    try {
        for (let i = 1; i <= 151; i++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const result = await response.json();
            arr.push(result);

        }
        // displayPokemons(arr);
        finalData = await Promise.all(arr);
        displayPokemons(finalData);

    } catch (error) {
        console.log("Error:", error);
    }
}
async function getTypes() {
    const response = await fetch(typeAPI);
    const result = await response.json();
    // console.log(result.results);
    createOptions(result.results);

}
function createOptions(types) {
    types.forEach((obj) => {
        const option = document.createElement("option");
        option.value = obj.name;
        option.innerText = obj.name;
        typeSelect.append(option);
    });
}


searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue.length === 0) {
        displayPokemons(finalData);
    }
    else {
        if (searchValue.length > 3) {
            const searchedpokemons = finalData.filter((obj) => {
                obj.name.toLowerCase().includes(searchValue);
            });
            if (searchedpokemons.length === 0) {
                pokemonDiv.innerHTML = "";
                pokemonDiv.innerHTML = "<h1>No Pokemon Found</h1>";
            }
            else {
                displayPokemons(searchedpokemons);
            }
        }
    }
})
// console.log(filterButton);

filterButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (typeSelect.value === "Types") {
        displayPokemons(finalData);
    } else {
        displayPokemons(filterByType(typeSelect.value));
    }
})

//call type function & getPokemon function
getTypes();
getPokemons();
resetBtn.addEventListener("click", reset);

function filterByType(type) {
    console.log(type);
    console.log(finalData);

    const filteredData = finalData.filter((pokemon) => {
        return pokemon.types.some((t) => t.type.name === type)
    });
    // console.log(filteredData);
    return filteredData;
}


function reset() {
    pokemonDiv.innerHTML = "";
    searchInput.value = "";
    select.value = "Types";
    displayPokemons(finalData);
}


function displayPokemons(Arrdata) {
    pokemonDiv.innerHTML = "";
    const fragment = document.createDocumentFragment();

    Arrdata.forEach((data) => {

        const Cardparent = document.createElement("div");
        Cardparent.classList.add("Card-parent");


        const Cardparent_inner = document.createElement("div");
        Cardparent_inner.classList.add("Card-parent-inner");
        // console.log(data.types[0].type.name);

        const Cardfront = document.createElement("div");
        Cardfront.classList.add("Card-front");

        const Cardback = document.createElement("div");
        Cardback.classList.add("Card-back");

        const typeColor = data.types[0].type.name;

        switch (typeColor) {
            case "grass": Cardfront.style.backgroundColor = "#9bcc50";
                Cardback.style.backgroundColor = "#9bcc50";
                break;
            case "fire": Cardfront.style.backgroundColor = "#fd7d24";
                Cardback.style.backgroundColor = "#fd7d24";
                break;
            case "water": Cardfront.style.backgroundColor = "#4592c4";
                Cardback.style.backgroundColor = "#4592c4";
                break;
            case "electric": Cardfront.style.backgroundColor = "#eed535";
                Cardback.style.backgroundColor = "#eed535";
                break;
            case "normal": Cardfront.style.backgroundColor = "grey";
                Cardback.style.backgroundColor = "grey";
                break;
            case "poison": Cardfront.style.backgroundColor = "rgb(138,66,138)";
                Cardback.style.backgroundColor = "rgb(138,66,138)";
                break;
            case "bug": Cardfront.style.backgroundColor = "#466b10";
                Cardback.style.backgroundColor = "#466b10";
                break;
            case "fairy": Cardfront.style.backgroundColor = "rgb(253,178,230)";
                Cardback.style.backgroundColor = "rgb(253,178,230)";
                break;
            case "fighting": Cardfront.style.backgroundColor = "orangered";
                Cardback.style.backgroundColor = "orangered";
                break;
            case "psychic": Cardfront.style.backgroundColor = "#f764d0";
                Cardback.style.backgroundColor = "#f764d0";
                break;
            case "rock": Cardfront.style.backgroundColor = "saddlebrown";
                Cardback.style.backgroundColor = "saddlebrown";
                break;
            case "ghost": Cardfront.style.backgroundColor = "darkslateblue";
                Cardback.style.backgroundColor = "darkslateblue";
                break;
            case "ice": Cardfront.style.backgroundColor = "rgb(142,288,241)";
                Cardback.style.backgroundColor = "rgb(142,288,241)";
                break;
            case "dragon": Cardfront.style.backgroundColor = "darkorange";
                Cardback.style.backgroundColor = "darkorange";
                break;
            case "ground": Cardfront.style.backgroundColor = "#eed535";
                Cardback.style.backgroundColor = "#eed535";
                break;
        }

        const abilities = document.createElement("p");
        abilities.classList.add("abilities");
        abilities.innerText = `Abilities: ${data.abilities[0]?.ability?.name},  ${data.abilities[1]?.ability?.name}`;


        const id = document.createElement("p");
        id.classList.add("card-id");
        id.innerText = "#" + data.id;

        const imageFront = document.createElement("img");
        imageFront.classList.add("image-front");

        imageFront.src = data.sprites?.other?.dream_world?.front_default || data.sprites?.front_default;

        const nameFront = document.createElement("p");
        nameFront.classList.add("name-front");

        nameFront.innerText = data.forms[0]?.name;

        const type = document.createElement("p");
        type.classList.add("type");
        type.innerText = data.types[0]?.type.name;

        const imageBack = document.createElement("img");
        imageBack.classList.add("image-back");
        imageBack.src = data.sprites?.other?.dream_world?.front_default || data.sprites?.front_default;

        const nameBack = document.createElement("p");
        nameBack.classList.add("name-back");
        nameBack.innerText = data.forms[0]?.name;

        const idBack = document.createElement("p");
        idBack.classList.add("card-id-back");
        idBack.innerText = "#" + data.id;

        Cardfront.append(id, imageFront, nameFront,  type);
        Cardback.append(idBack , imageBack, nameBack, abilities);
        Cardparent_inner.append(Cardfront, Cardback);
        Cardparent.append(Cardparent_inner);

        fragment.append(Cardparent);


    });
    pokemonDiv.append(fragment);
}




