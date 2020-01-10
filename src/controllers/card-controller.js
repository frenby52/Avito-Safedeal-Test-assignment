import CardComponent from "../components/card";
import CardPopupComponent from "../components/card-popup";
import {isEscEvent, renderComponent} from "../util";
import Comments from '../models/comments.js';

const parseFormData = (formData) => {
  return new Comments({
    'name': formData.get(`name`),
    'comment': formData.get(`comment`),
    'date': Date.now(),
  });
};

export default class CardController {
  constructor(container, onDataChange, api) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._cardComponent = null;
    this._cardPopupComponent = null;
    this.data = {};
    this.popupData = {};
    this._api = api;

    this._onCardEscPress = this._onCardEscPress.bind(this);
    this._closeCardPopup = this._closeCardPopup.bind(this);
    this._onCardClick = this._onCardClick.bind(this);
  }

  render(card) {
    this.data = card;
    this._cardComponent = new CardComponent(card);
    renderComponent(this._container, this._cardComponent);

    this._cardComponent.setCardClickHandler(this._onCardClick);
  }

  rerender(card) {
    const newComment = {};
    newComment.text = card.comment;
    newComment.date = card.date;
    this.popupData.comments.push(newComment);

    this._cardPopupComponent.rerender(this.popupData.url, this.popupData.comments);
  }

  _showOverlay() {
    document.querySelector(`.overlay`).classList.remove(`visually-hidden`);
  }

  _hideOverlay() {
    document.querySelector(`.overlay`).classList.add(`visually-hidden`);
  }

  _closeCardPopup() {
    if (this._cardPopupComponent) {
      this._cardPopupComponent.getElement().remove();
      document.removeEventListener(`keydown`, this._onCardEscPress);
      this._hideOverlay();
    }
  }

  _onCardEscPress(evt) {
    isEscEvent(evt, this._closeCardPopup);
  }

  _onCardClick(e) {
    e.preventDefault();
    this._cardComponent.getElement().classList.remove(`shake`);
    this._api.getCard(this.data.id)
      .then((card) => {
        this.popupData = card;
        this._cardPopupComponent = new CardPopupComponent(card.url, card.comments);
        renderComponent(this._container, this._cardPopupComponent);
        this._setCardPopupHandlers();
        this._showOverlay();
      }).catch(() => this._cardComponent.getElement().classList.add(`shake`));
  }

  _setCardPopupHandlers() {
    this._cardPopupComponent.setCommentSubmitHandler((evt) => {
      evt.preventDefault();
      this._cardPopupComponent.getElement().classList.remove(`shake`);
      const formData = this._cardPopupComponent.getFormData();
      const data = parseFormData(formData);
      const commentInput = this._cardPopupComponent.getElement().querySelector(`.card-popup__comment-input--comment`);
      const nameInput = this._cardPopupComponent.getElement().querySelector(`.card-popup__comment-input--name`);

      if (!data.name) {
        nameInput.setAttribute(`style`, `outline: 2px solid red;`);
        nameInput.addEventListener(`input`, () => {
          nameInput.setAttribute(`style`, `outline: none;`);
        });
      } else if (!data.comment) {
        commentInput.setAttribute(`style`, `outline: 2px solid red;`);
        commentInput.addEventListener(`input`, () => {
          commentInput.setAttribute(`style`, `outline: none;`);
        });
      } else {
        this._api.createComment(this.data.id, data)
          .then(() => {
            this._onDataChange(this.data.id, data);
          })
          .catch(() => {
            this._cardPopupComponent.getElement().classList.add(`shake`);
          });
      }
    });

    this._cardPopupComponent.setCloseBtnClickHandler(this._closeCardPopup);
    document.addEventListener(`keydown`, this._onCardEscPress);
  }
}
