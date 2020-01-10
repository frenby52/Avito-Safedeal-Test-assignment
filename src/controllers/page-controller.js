import {renderComponent} from "../util";
import MainCardsComponent from "../components/main-cards";
import CardController from "./card-controller";

const renderCards = (cards, container, onDataChange, api) => {
  return cards.map((card) => {
    const cardController = new CardController(container, onDataChange, api);
    cardController.render(card);

    return cardController;
  });
};

export default class PageController {
  constructor(container, cardsModel, api) {
    this._container = container;
    this._cardsModel = cardsModel;
    this._cardControllers = [];
    this._api = api;

    this._mainCardsComponent = new MainCardsComponent();
    this._onDataChange = this._onDataChange.bind(this);
  }

  render() {
    const cards = this._cardsModel.getCards();
    this._renderCards(cards);
    renderComponent(this._container, this._mainCardsComponent);
  }

  _renderCards(cards) {
    this._cardControllers = renderCards(cards, this._mainCardsComponent.getContainer(), this._onDataChange, this._api);
  }

  _onDataChange(id, newData) {
    const currentController = this._cardControllers.filter((it) => it.data.id === id);
    currentController[0].rerender(newData);
  }

  showErrorMessage() {
    this._mainCardsComponent.getContainer().innerHTML = `<p class="cards__error">Failed to load data. Please, try again later</p>`;
    this.render();
  }
}
