import * as HOME from "./action-type";
import API from "../../service/api";

// 不感兴趣
export const disfavorBookById = (id, bookType) => {
  return {
    type: HOME.DISFAVOR,
    id,
    bookType
  };
};

// 获取转手信息列表
export const getSellList = () => {
  // 返回函数，异步dispatch
  return async dispatch => {
    let result = await API.get("/product/list/preview");
    console.log('/product/list/preview', result);
    dispatch({
      type: HOME.GET_NEW_BOOK,
      books: result.data.list
    });
  };
};

// 获取求购信息列表
export const getHuntList = () => {
  // 返回函数，异步dispatch
  return async dispatch => {
    let result = await API.get("/demand/list/preview");
    dispatch({
      type: HOME.GET_HOT_BOOK,
      books: result.data.list
    });
  };
};

// 推荐图书
export const getRecommendBooks = () => {
  // 返回函数，异步dispatch
  return async dispatch => {
    let result = await API.get("/books/recommend");
    dispatch({
      type: HOME.GET_RECOMMEND_BOOK,
      books: result
    });
  };
};

// 获取轮播图列表
export const getSwiperImages = () => {
  // 返回函数，异步dispatch
  return async dispatch => {
    let result = await API.get('/poster/list');
    dispatch({
      type: HOME.GET_SWIPER_IMAGES,
      images: result.data.list
    });
  }
}

// 获取导航菜单信息
export const getNavItems = () => {
  // 返回函数，异步dispatch
  return async dispatch => {
    let result = await API.get('/nav/list');
    var data = result.data;
    dispatch({
      type: HOME.GET_NAV_ITEMS,
      navItems: data && data.list?data.list:[] 
    });
  }
}
