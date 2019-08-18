import * as SEARCH from "./action-type";
import API from "../../service/api";

/** 
 * /search/hot/list
 * 获取搜索热词列表
 * 
*/
export const getHotWordList = () => {
  // 返回函数，异步dispatch
  return async dispatch => {
    let result = await API.get("/search/hot/list");
    dispatch({
      type: SEARCH.GET_NEW_BOOK,
      books: result
    });
  };
};

/** 
 * /search/recommend/list
 * 获取搜索推荐列表
 * 
*/
export const getRecomendList = () => {
  // 返回函数，异步dispatch
  return async dispatch => {
    let result = await API.get("/search/recommend/list");
    dispatch({
      type: SEARCH.GET_HOT_BOOK,
      books: result
    });
  };
};

/** 
 * /search/product/{key}/list/preview
 * 搜索商品
 * 
*/
export const searchProdctList = (params) => {
  // 返回函数，异步dispatch
  return async dispatch => {
    let result = await API.get(`/search/product/${params.key}/list/preview`);
    dispatch({
      type: SEARCH.GET_RECOMMEND_BOOK,
      books: result
    });
  };
};

/** 
 * /search/barCode/{barCode}
 * 通过条形码号搜索产品
 * 
*/
export const searchProdctByScanCode = (params) => {
  // 返回函数，异步dispatch
  return async dispatch => {
    let result = await API.get(`/search/barCode/${params.barCode}`);
    dispatch({
      type: SEARCH.GET_RECOMMEND_BOOK,
      books: result
    });
  };
};