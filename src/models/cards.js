export default class Cards {
  constructor() {
    this._cards = [];
  }

  getCards() {
    return this._cards;
  }

  setCards(cards) {
    this._cards = cards;
  }
}
