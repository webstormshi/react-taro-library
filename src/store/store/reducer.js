import * as BOOK from "./action-type";

const defaultState = {
  firstCategroy: [],
  secondCategroy: [],
  bookList: [],
  bookDetail: [],
  bookPublish: {},
  uploadFile: []
};

const home = (state = defaultState, action) => {
  switch (action.type) {
    case BOOK.GET_FIRST_CATEGROY_LIST:
      return { ...state, firstCategroy: action.firstCategroy };
    default:
      return state;
  }
};

export default home;
