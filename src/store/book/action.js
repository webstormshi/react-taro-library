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

// 获取二级分类
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

// 根据分类获取图书列表
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

// 发布商品信息
export const publishProduct = (data) => {
  // 返回函数，异步dispatch
  return async dispatch => {
    let user = await Taro.getStorageSync('user');
    let { productImages } = data; 
    if(!user.userId) {
      Taro.navigateTo({ url: URL.LOGIN });
    }
    let result = await API.post(
      `/product/user/${user.userId}`, {
      ...data,
      productImages: JSON.stringify(productImages)
      
    });
    if(result) {
      Taro.showToast({
        title: '添加成功'
      })
      setTimeout(() => {
        Taro.redirectTo({
          url: URL.SUCCESS_PAGE
        });
      }, 1500);
    } else {
      Taro.showModal({
        content: '添加失败，请检查无误再发布',
        showCancel: false
      });
    }
  };
};

// 根据id获取图书详细信息
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

// 上传图书图片接口
export const uploadFile = (url) => {
  // 返回函数，异步dispatch
  return async dispatch => {
    Taro.uploadFile({
      url: 'https://reunion.kioye.cn/file/image/uploadToTencentCos',
      header: {
        "Authorization": "Bearer " + Taro.getStorageSync("token"),
        "Content-Type": "multipart/form-data"
      },
      filePath: url,
      name: 'image',
      success: function (result) {
        console.log('上传成功', result)
        var data = JSON.parse(result.data);
        console.log('UPLOAD_FILE', data);
        dispatch({
          type: BOOK.UPLOAD_FILE,
          uploadFile: data.data
        });
      }
    })
  }
}