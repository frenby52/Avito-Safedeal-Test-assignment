import AbstractComponent from "./abstract-component";
import he from "he";

const formatDate = (date) => {
  let dd = date.getDate();
  if (dd < 10) {
    dd = `0` + dd;
  }

  let mm = date.getMonth() + 1;
  if (mm < 10) {
    mm = `0` + mm;
  }

  const yy = date.getFullYear();

  return dd + `.` + mm + `.` + yy;
};

const createCommentsMarkup = (comments) => comments.map((comment) =>
  `<li class="card-popup__comment">
    <p class="card-popup__comment-date">${formatDate(new Date(comment.date))}</p>
    <p class="card-popup__comment-text">${he.encode(comment.text)}</p>
  </li>`).join(`\n`);

const createCardPopupTemplate = (url, comments) => {
  return (`<section class="card-popup">
               <p class="card-popup__picture">
                 <img class="card-popup__image" src="${url}" alt="Фото пользователя">
               </p>
               <ul class="card-popup__comments-list">${comments ? createCommentsMarkup(comments) : ``}</ul>     
               <form class="card-popup__form" action="" method="get">
                 <div class="card-popup__new-comment">
                   <input class="card-popup__comment-input card-popup__comment-input--name" placeholder="Ваше имя" name="name" type="text">
                   <input class="card-popup__comment-input card-popup__comment-input--comment" placeholder="Ваш комментарий" name="comment" type="text">
                   <button class="card-popup__submit-btn" type="submit">Оставить комментарий</button>
                 </div>
               </form>
               <button class="card-popup__close-btn" type="button">close</button>
           </section>`);
};

export default class CardPopup extends AbstractComponent {
  constructor(data, comments) {
    super();

    this._data = data;
    this._comments = comments;
    this._closeBtnClickHandler = null;
    this._commentSubmitHandler = null;
  }

  getTemplate() {
    return createCardPopupTemplate(this._data, this._comments);
  }

  setCloseBtnClickHandler(handler) {
    this._closeBtnClickHandler = handler;
    this._element.querySelector(`.card-popup__close-btn`).addEventListener(`click`, handler);
  }

  setCommentSubmitHandler(handler) {
    this._commentSubmitHandler = handler;
    this.getElement().querySelector(`.card-popup__form`).addEventListener(`submit`, handler);
  }

  getForm() {
    return this.getElement().querySelector(`.card-popup__form`);
  }

  getFormData() {
    const form = this.getForm();
    return new FormData(form);
  }


  rerender(card, comments) {
    this._data = card;
    this._comments = comments;

    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    this._element = null;
    const newElement = this.getElement();

    if (parent) {
      parent.replaceChild(newElement, oldElement);
    }

    this.recoveryListeners();
  }

  recoveryListeners() {
    this.getElement().querySelector(`.card-popup__close-btn`).addEventListener(`click`, this._closeBtnClickHandler);
    this.getElement().querySelector(`.card-popup__form`).addEventListener(`submit`, this._commentSubmitHandler);
  }
}
