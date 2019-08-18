import * as HOME from "./action-type";

const defaultState = {
  newBooks: [],
  hotBooks: [],
  recommendBooks: [],
  swiperImages: []
};

const home = (state = defaultState, action) => {
  switch (action.type) {
    case HOME.GET_NEW_BOOK:
      return { ...state, newBooks: state.newBooks.concat(action.books) };
    case HOME.GET_HOT_BOOK:
      return { ...state, hotBooks: state.hotBooks.concat(action.books) };
    case HOME.GET_SWIPER_IMAGES:
      return { ...state, swiperImages: action.images }
    default:
      return state;
  }
};

export default home;
