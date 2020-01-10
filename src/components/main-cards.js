import AbstractComponent from "./abstract-component";

const createMainCardsTemplate = () =>
  `<section class="main__cards cards">
    <div class="cards__wrapper"></div>
  </section>`;

export default class MainCards extends AbstractComponent {

  getTemplate() {
    return createMainCardsTemplate();
  }

  getContainer() {
    return this.getElement().querySelector(`.cards__wrapper`);
  }
}
