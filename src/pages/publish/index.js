import Taro, { Component } from "@tarojs/taro";
import { View, Button, Icon , Picker, Text} from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtInput, AtForm, AtImagePicker,  AtTextarea, ATButton } from 'taro-ui';

import { getBookInfoByCode, uploadFile, publishProduct } from "../../store/book/action";
import URL from '../../constants/urls';
import "./index.scss";

// 店铺
// 订单
// 下订单的页面
// 我的发布
// 我的喜欢
// 我的收藏
// 我的消息
// 我的通知

const DISCOUNT_LIST = [ '全新', '9成新', '8成新', '7成新' ];
@connect(
  ({ book, app }) => ({
    bookPublish: book.bookPublish,
    uploadFile: book.uploadFile,
    user: app.user
  }),
  {
    dispatchPublishProduct: publishProduct,
    dispatchUploadFile: uploadFile,
    dispatchGetBookInfoByCode: getBookInfoByCode
  }
)
class SellPublish extends Component {
  config = {
    navigationBarTitleText: "请填写发布信息"
  };
  state = {
    files: [],
    category: {},
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
        productImages: lists,
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
    Taro.getStorage({
      key: 'category',
      success: res => {
        var data = res.data;
        this.setState({
          category: data
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

  onSubmit = (e) => {
    const { user } = this.props;
    const { publish, category } = this.state;
    if(user && user.userPhone) {
      Taro.showModal({
        content: '请确保你填写的信息完整，确定提交吗？',
        success: res => {
          if(res.confirm) {
            this.props.dispatchPublishProduct({
              ...publish,
              categoryId: category.categoryId
            });
          }
        }
      })
    } else {
      Taro.navigateTo({
        url: URL.CHECK_PHONE
      })
    }
  }

  onReset (event) {
    console.log(event)
  }

  render() {
    let { publish, files, category } = this.state;
    return (
      <View className='publish'>
          {/* <canvas className='canvas' canvas-id='firstCanvas'></canvas> */}
          <Button 
            type='primary' 
            size='small' 
            className='publish-scan'
            onClick={this.scanBook}
          >
            <Icon className='iconfont' />
            扫码快捷录入信息
          </Button>
          <AtForm
            onSubmit={this.onSubmit.bind(this)}
            onReset={this.onReset.bind(this)}
          >
            <View className='title'>物品基本信息</View>
            <AtInput
              name='barCode'
              title='图书ISBN'
              type='text'
              placeholder='请输入图书ISBN'
              value={publish.barCode}
              onChange={this.handleChange.bind(this)}
            />
            <AtInput
              name='productName'
              title='图书名称'
              type='text'
              placeholder='请输入物品名称'
              value={publish.productName}
              onChange={this.handleChange.bind(this)}
            />
            <AtInput
              name='productAuthor'
              title='作者'
              type='text'
              placeholder='请输入图书名称'
              value={publish.productAuthor}
              onChange={this.handleChange.bind(this)}
            />
            <AtInput
              name='productPublishInfo'
              title='出版社'
              type='text'
              placeholder='请输入出版社名称'
              value={publish.productPublishInfo}
              onChange={this.handleChange.bind(this)}
            />
            <AtImagePicker
              mode='scaleToFill'
              files={files}
              onChange={this.onImageChange.bind(this)}
              onFail={this.onFail.bind(this)}
              onImageClick={this.onImageClick.bind(this)}
            />
            <AtTextarea
              name='productContent'
              value={publish.productContent}
              onChange={this.handleTextareaChange.bind(this, 'productContent')}
              maxLength={500}
              placeholder='物品简介...'
            />
            <View className='title'>设置物品信息</View>
            <AtInput
              name='productOriginalPrice'
              title='物品原价'
              type='number'
              placeholder='请输入原价'
              value={publish.productOriginalPrice}
              onChange={this.handleChange.bind(this)}
            />
            <View className='page-section'>
              <View>
                <Picker 
                  mode='selector' 
                  range={DISCOUNT_LIST} 
                  onChange={this.onPickerChange}
                >
                  <View className='picker'>
                  <Text className='label'>新旧程度</Text>
                  {DISCOUNT_LIST[publish.productSpecs]}
                  </View>
                </Picker>
              </View>
            </View>
            <AtInput
              name='productPrice'
              title='设置价格'
              type='text'
              placeholder='请输入价格'
              value={publish.productPrice}
              onChange={this.handleChange.bind(this)}
            />
            <AtInput
              name='productLocal'
              title='当前位置'
              type='text'
              placeholder='请输入位置信息'
              value={publish.productLocal}
              onChange={this.handleChange.bind(this)}
            />
            <AtInput
              name='categoryName'
              title='设置分类'
              type='text'
              placeholder='请输入分类信息'
              value={category.categoryName}
              onFocus={this.handleCategory.bind(this)}
            />
            <AtTextarea
              data-name='productDesc'
              value={publish.productDesc}
              onChange={this.handleTextareaChange.bind(this, 'productDesc')}
              maxLength={200}
              placeholder='发布备注...'
            />
            {/* <AtSwitch title='线下交易' checked={this.state.value} onChange={this.handleChange} /> */}
            <ATButton className='publish-scan' formType='submit'>
              信息录入完成
            </ATButton>
            <ATButton className='publish-reset' formType='reset'>
              重新输入
            </ATButton>
          </AtForm>
      </View>
    );
  }
}

export default SellPublish;
