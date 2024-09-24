import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

async function fetchCharacters() {
  cardContainer.innerHTML = "";

  const FETCH_URL = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
  try {
    const response = await fetch(FETCH_URL);

    if (!response.ok) {
      console.log("API Error:", response.status);
      return;
    }

    const data = await response.json();
    maxPage = data.info.pages;
    createCards(data.results);
    updatePagination();
  } catch (error) {
    console.log("Error occured when fetching all characters", error);
  }
}

function updatePagination() {
  pagination.textContent = `${page} / ${maxPage}`;
}
function createCards(allCards) {
  allCards &&
    allCards.forEach((card) => {
      cardContainer.append(createCharacterCard(card));
    });
}

function onNextClick() {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
}

function onPrevClick() {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
}

function onSearchBarSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  searchQuery = data.query;
  page = 1;

  fetchCharacters();
}

prevButton.addEventListener("click", onPrevClick);
nextButton.addEventListener("click", onNextClick);
searchBar.addEventListener("submit", onSearchBarSubmit);

fetchCharacters();
