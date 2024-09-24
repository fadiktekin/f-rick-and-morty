import { createCharacterCard } from "./components/card/card.js";
import { createButton } from "./components/nav-button/nav-button.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const navigation = document.querySelector('[data-js="navigation"]');

const searchBar = createSearchBar(onSearchBarSubmit);
searchBarContainer.append(searchBar);

const pagination = createPagination();
const prevButton = createButton("prev", onPrevClick);
const nextButton = createButton("next", onNextClick);

navigation.append(prevButton);
navigation.append(pagination);
navigation.append(nextButton);

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

function onSearchBarSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  searchQuery = data.query;
  page = 1;

  fetchCharacters();
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

function updatePagination() {
  pagination.textContent = `${page} / ${maxPage}`;
}

function createCards(allCards) {
  allCards &&
    allCards.forEach((card) => {
      cardContainer.append(createCharacterCard(card));
    });
}

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

fetchCharacters();
