import PageController from "./controllers/page-controller";
import Cards from "./models/cards";
import API from "./api";

const END_POINT = `https://boiling-refuge-66454.herokuapp.com`;

const api = new API(END_POINT);
const cardsModel = new Cards();

const mainContainer = document.querySelector(`.main`);
const pageController = new PageController(mainContainer, cardsModel, api);

api.getCards()
  .then((cards) => {
    cardsModel.setCards(cards);
    pageController.render();
  })
  .catch(() => {
    pageController.showErrorMessage();
  });
