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
    case BOOK.GET_SECOND_CATEGROY_LIST:
      return { ...state, secondCategroy: action.secondCategroy };
    case BOOK.GET_BOOKLIST_BY_CATEGROY:
      return { ...state, bookList: action.bookList };
    case BOOK.GET_BOOKDETAIL_BY_ID:
      return { ...state, bookDetail: action.bookDetail };
    case BOOK.GET_DEMANDDETAIL_BY_ID:
      return { ...state, bookPublish: action.bookPublish }
    case BOOK.UPLOAD_FILE:
      console.log('state.uploadFile', state.uploadFile, action.uploadFile);
      return { ...state, uploadFile: [].concat(state.uploadFile, action.uploadFile) }
    default:
      return state;
  }
};

export default home;
