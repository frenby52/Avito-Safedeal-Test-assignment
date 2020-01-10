import AbstractComponent from "./abstract-component";

const createCardTemplate = (data) => {
  const {url} = data;
  return (`<article class="cards__card-item card-item">
            <a class="card-item__link" href="#">
              <p class="card-item__picture">
                <img class="card-item__image" src="${url}" alt="Фото пользователя">
               </p>
            </a>
          </article>`);
};

export default class Card extends AbstractComponent {
  constructor(data) {
    super();

    this._data = data;
  }

  getTemplate() {
    return createCardTemplate(this._data);
  }

  setCardClickHandler(handler) {
    this._element.querySelector(`.card-item__image`).addEventListener(`click`, handler);
  }

}


