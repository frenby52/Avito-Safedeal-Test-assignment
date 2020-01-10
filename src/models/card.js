export default class Card {
  constructor(data) {

    this.id = data[`id`] || ``;
    this.url = data[`url`] || ``;
    this.comments = data[`comments`] || [];
  }

  toRAW() {
    return {
      'id': this.id,
      'url': this.url,
      'comments': this.comments
    };
  }

  static parseCard(data) {
    return new Card(data);
  }

  static parseCards(data) {
    return data.map(Card.parseCard);
  }
}
