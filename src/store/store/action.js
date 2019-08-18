import Taro from "@tarojs/taro";
import * as BOOK from "./action-type";
import API from "../../service/api";
import URL from '../../constants/urls';

// 获取一级分类
export const getFirstCategroy = () => {
  // 返回函数，异步dispatch
  return async dispatch => {
    let result = await API.get("/category/categoryLevel/0/list");
    let list = result.data.list;
    list.forEach(element => {
      element.title = element.categoryName
    });
    dispatch({
      type: BOOK.GET_FIRST_CATEGROY_LIST,
      firstCategroy: list
    });
  };
};

// 获取店铺基本信息
export const getSecondCategroy = (first_categroy) => {
  // 返回函数，异步dispatch
  return async dispatch => {
    let result = await API.get(`/category/parent/${first_categroy}/list`);
    dispatch({
      type: BOOK.GET_SECOND_CATEGROY_LIST,
      secondCategroy: result.data.list
    });
  };
};

  /** 
   * /store/{storeId}
   * 通过店铺ID获取店铺信息
   */
export const getBookListByCategroy = (categroy) => {
  // 返回函数，异步dispatch
  return async dispatch => {
    let result = await API.get(`/category/${categroy}/product/list/preview`);
    dispatch({
      type: BOOK.GET_BOOKLIST_BY_CATEGROY,
      bookList: result.data.list
    });
  };
};


/** 
 * /store/{storeId}/listProdct/preview
 * 通过店铺ID获取商品预览列表
 * 
*/
export const getBookDetail = (id) => {
  // 返回函数，异步dispatch
  return async dispatch => {
    let result = await API.get(`/product/${id}/detail`);
    dispatch({
      type: BOOK.GET_BOOKDETAIL_BY_ID,
      bookDetail: result.data
    });
  };
};

//获取求购商品详情
export const getDemandDetail = (id) => {
  // 返回函数，异步dispatch
  return async dispatch => {
    let result = await API.get(`/demand/${id}/detail`);
    dispatch({
      type: BOOK.GET_DEMANDDETAIL_BY_ID,
      bookDetail: result.data
    });
  };
};

// 根据条形码获取图书信息
export const getBookInfoByCode = (code) => {
  // 返回函数，异步dispatch
  return async dispatch => {
    let result = await API.get(`/library/barCode/${code}`);
    dispatch({
      type: BOOK.GET_DEMANDDETAIL_BY_ID,
      bookPublish: result.data
    });
  };
}