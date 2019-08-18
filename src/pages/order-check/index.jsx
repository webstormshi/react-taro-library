import Taro, { Component } from "@tarojs/taro";
import { View, AtSwitch, Text} from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtInput, AtForm, AtTextarea, ATButton } from 'taro-ui';

import { 
  getBookInfoByCode,
  uploadFile,
  publishProduct
 } from "@store/home/action";
import URL from '../../constants/urls'; 
import "./index.scss";

@connect(
  ({ book }) => ({
    bookPublish: book.bookPublish,
    uploadFile: book.uploadFile
  }),
  {
    dispatchPublishProduct: publishProduct,
    dispatchUploadFile: uploadFile,
    dispatchGetBookInfoByCode: getBookInfoByCode
  }
)
export default class OrderCheck extends Component {
  config = {
    navigationBarTitleText: "订单确认"
  };
  state = {
    files: [],
    publish: {
      productName: '',
      productAuthor: '',
      productImages: [],
      barCode: '',
      productDesc: '',
      productContent: '',
      productOriginalPrice: '',
      productPrice: '',
      productSpecs: 0,
      productPublishInfo: '',
      productLocal: '江财麦庐园宁庐'
    }
  }

  componentWillReceiveProps(nextProps) {
    let { image, productImages, introduction, libraryName, libraryCode, author, publisher } = nextProps.bookPublish;
    let lists = [];
    if(productImages) {
      lists = JSON.parse(productImages)
    }
    if(image) {
      lists.unshift(image)
    }
    if(nextProps.uploadFile.length > 0) {
      lists.push(nextProps.uploadFile)
    }
    var arr = lists.map(item => ({ url: item }));
    this.setState({
      files: arr,
      publish: {
        ...this.state.publish,
        productImages: arr,
        barCode: libraryCode,
        productAuthor: author,
        productContent: introduction,
        productName: libraryName,
        productPublishInfo: publisher,
        productIcon: image ? image : ''
      }
    });
  }

  componentDidShow() {
    let { publish } = this.state;
    Taro.getStorage({
      key: 'category',
      success: res => {
        var data = res.data;
        this.setState({
          publish: {
            ...publish,
            categoryId: data.categoryId,
            categoryName: data.categoryName
          }
        });
      }
    })
  }

  wxlogin = () => {
    Taro.navigateTo({url: URL.LOGIN});
  }

  onImageChange = (files) => {
    this.setState({
      files
    });
    var url = files[files.length-1].url;
    this.props.dispatchUploadFile(url);
  }

  onFail (mes) {
    Taro.showModal({
      content: mes,
      showCancel: false
    });
  }

  onImageClick (index, file) {
    var urls = this.state.files.map(item =>item.url)
    Taro.previewImage({
      current: file,
      urls: urls
    })
  }

  handleTextareaChange(name, e) {
    let { publish } = this.state;
    var value = e.detail.value;
    this.setState({
      publish: {
        ...publish,
        [name]: value
      }
    }, () => {
      console.log('publish', this.state.publish);
    });
  }

  handleChange (value, e) {
    let { publish } = this.state;
    var key = e.target.id;
    var value = e.detail.value;
    this.setState({
      publish: {
        ...publish,
        [key]: value
      }
    }, () => {
      console.log('publish', this.state.publish);
    });
  }

  scanBook = () => {
    let { publish } = this.state;
    Taro.scanCode({
      success: res => {
        var code = res.result;
        if(/\d*/.test(code)) {
          this.setState({
            publish: {
              ...publish,
              barCode: code
            }
          })
          this.props.dispatchGetBookInfoByCode(code);
        } else {
          Taro.showModal({
            content: '条形码格式有误'
          });
        }
      }
    });
  }

  onPickerChange = (e) => {
    var index = Number(e.detail.value);
    let { publish } = this.state;
    var discount = (10 - index) * 0.1;
        this.setState({
          publish: {
            ...publish,
            productSpecs: index,
            productPrice:  publish.productOriginalPrice ? publish.productOriginalPrice * discount * 0.5 : 0
          }
        });
  }

  handleLocation = () => {
    let { publish } = this.state;
    Taro.getLocation({
      type: 'wgs84',
      suuess: res => {
        this.setState({
          publish: {
            ...publish,
            productLocal: JSON.stringify(res)
          }
        });
      }
    });
  }

  handleCategory = () => {
    Taro.navigateTo({
      url: URL.CATEGORY_CHOOSE
    });
  }

  onSubmit = () => {
    let { publish } = this.state;
    Taro.getStorage({
      key: 'user',
      success: user => {
        if(user && user.userPhone) {
          Taro.showModal({
            content: '请确保你填写的信息完整，确定提交吗？',
            success: res => {
              if(res.confirm) {
                this.props.dispatchPublishProduct(publish);
                Taro.showLoading();
              }
            }
          })
        } else {
          Taro.navigateTo({
            url: URL.CHECK_PHONE
          })
        }
      },
      fail: error => {
        console.log('error', error);
        Taro.navigateTo({
          url: URL.LOGIN
        })
      }
    })
  }

  onReset (event) {
    console.log(event)
  }

  render() {
    let { publish } = this.state;
    return (
      <View className='order'>
          {/* <canvas className='canvas' canvas-id='firstCanvas'></canvas> */}
          <AtForm
            onSubmit={this.onSubmit.bind(this)}
            onReset={this.onReset.bind(this)}
          >
            <View className='title'>填写收货人信息</View>
            <AtInput
              name='barCode'
              title='姓名'
              type='text'
              placeholder='请输入收货人'
              value={publish.barCode}
              onChange={this.handleChange.bind(this)}
            />
            <AtInput
              name='productName'
              title='电话'
              type='text'
              placeholder='请输入收货人电话'
              value={publish.productName}
              onChange={this.handleChange.bind(this)}
            />
            <View className='order-title'>收货地址</View>
            <AtTextarea
              name='productContent'
              value={publish.productContent}
              onChange={this.handleTextareaChange.bind(this, 'productContent')}
              maxLength={100}
              placeholder='请填写收货地址'
            />
            <View className='switch-box'>
              <AtSwitch title='匿名买书' checked={this.state.value} onChange={this.handleChange} />
            </View>
            <View className='title'>订单信息确认</View>
            {/* <View className='product-title'>购买商品列表</View> */}
            <View className='product-box'>
              <View className='product-item'>
                <Text className='product-name'>你是那个谁？</Text>
                <Text className='product-price'>¥28.90</Text>
              </View>
              <View className='product-item'>
                <Text className='product-name'>你是那个谁？</Text>
                <Text className='product-price'>¥28.90</Text>
              </View>
              <View className='product-item'>
                <Text className='product-name'>你是那个谁？</Text>
                <Text className='product-price'>¥28.90</Text>
              </View>
            </View>
            <View className='product-box'>
              <View className='product-item'>
                <Text className='product-name'>总价</Text>
                <Text className='product-price'>¥288.90</Text>
              </View>
              <View className='product-item'>
                <Text className='product-name'>运费（包邮商品）</Text>
                <Text className='product-price'>¥0.00</Text>
              </View>
            </View>
            <View className='product-box'>
              <View className='product-order'>
                下单支付：
                <Text className='total'>¥33.10</Text>
              </View>
            </View>
            <ATButton className='order-scan' formType='submit'>
              立即下单
            </ATButton>
          </AtForm>
      </View>
    );
  }
}