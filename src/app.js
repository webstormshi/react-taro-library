import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import { Provider, connect } from "@tarojs/redux";
import {
  wxLogin,
  wxRegister
} from "@store/app/action";
import Index from "./pages/index";

import configStore from "./store";

import "./app.scss";
import "./assets/fonts/iconfont.css";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

@connect(
  ({ home }) => ({
    navItems: home.navItems,
  }),
  {
    dispatchWxLogin: wxLogin,
    dispatchWxRegister: wxRegister
  }
)

class App extends Component {
  config = {
    pages: [
      "pages/home/index",
      "pages/success/index",
      "pages/book-detail/index",
      "pages/mine/index",
      "pages/book-store/index",
      "pages/book-record/index",
      "pages/order-check/index",
      "pages/book-cart/index",
      "pages/sell-publish/index",
      "pages/category-list/index",
      "pages/category-choose/index",
      "pages/my-publish/index",
      "pages/my-collections/index",
      "pages/demand-detail/index",
      "pages/book-list/index",
      "pages/search/index",
      "pages/index/index",
      "pages/login/index",
      "pages/order-publish/index",
      "pages/check-phone/index"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#45a485",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "white",
      backgroundColor: "#FAFBFC"
    },
    tabBar: {
      list: [
        {
          pagePath: "pages/home/index",
          text: "首页",
          iconPath: "./assets/tab_home.png",
          selectedIconPath: "./assets/tab_home_f.png"
        },
        {
          pagePath: "pages/category-list/index",
          text: "分类",
          iconPath: "./assets/tab_category.png",
          selectedIconPath: "./assets/tab_category_f.png"
        },
        {
          pagePath: "pages/mine/index",
          text: "我的",
          iconPath: "./assets/tab_mine.png",
          selectedIconPath: "./assets/tab_mine_f.png"
        }
      ],
      color: "#777777",
      selectedColor: "#45a485",
      backgroundColor: "#ffffff",
      borderStyle: "black"
    },
    debug: true,
    permission: {
      "scope.userLocation": {
        desc: "你的位置信息将用于定位效果展示"
      }
    },
  };

  componentDidMount() {
    Taro.login({
      success: res => {
        this.props.dispatchWxLogin({ code: res.code });
      }
    });
  }

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
