import Card from './models/card.js';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(endPoint) {
    this._endPoint = endPoint;
  }

  getCards() {
    return this._load({url: `images`})
      .then((response) => response.json())
      .then(Card.parseCards);
  }

  getCard(id) {
    return this._load({url: `images/${id}`})
      .then((response) => response.json())
      .then(Card.parseCard);
  }

  createComment(id, comment) {
    return this._load({
      url: `images/${id}/comments`,
      method: Method.POST,
      body: JSON.stringify(comment.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
