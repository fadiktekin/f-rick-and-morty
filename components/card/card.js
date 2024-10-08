export function createCharacterCard(cardData) {
  const { image, name, status, type, episode } = cardData;
  const occurrences = episode.length;
  const cardContainer = document.querySelector('[data-js="card-container"]');
  const listElement = document.createElement("li");
  listElement.innerHTML = `
    <li class="card">
          <div class="card__image-container">
            <img
              class="card__image"
              src=${image}
              alt=${name}
            />
            <div class="card__image-gradient"></div>
          </div>
          <div class="card__content">
            <h2 class="card__title">${name}</h2>
            <dl class="card__info">
              <dt class="card__info-title">Status</dt>
              <dd class="card__info-description">${status}</dd>
              <dt class="card__info-title">Type</dt>
              <dd class="card__info-description">${type}</dd>
              <dt class="card__info-title">Occurrences</dt>
              <dd class="card__info-description">${occurrences}</dd>
            </dl>
          </div>
        </li>
    `;
  return listElement;
}
