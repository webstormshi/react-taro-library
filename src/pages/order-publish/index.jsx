import Taro, { Component } from "@tarojs/taro";
import { View, Button, Icon } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtInput, AtForm, AtRadio, AtImagePicker, AtSwitch, AtTextarea } from 'taro-ui';

import { add } from "../../store/counter/action";

import URL from '../../constants/urls';
import "./index.scss";

@connect(
  ({ counter }) => ({
    counter
  }),
  dispatch => ({
    add() {
      dispatch(add());
    }
  })
)
class OrderPublish extends Component {
  config = {
    navigationBarTitleText: "请填写发布信息"
  };
  state = {
    files: [{
      url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
    },
    {
      url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
    },
    {
      url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg',
    }]
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  wxlogin = () => {
    Taro.navigateTo({url: URL.LOGIN});
  }

  render() {
    let { files } = this.state;
    return (
      <View className='publish'>
          <Button type='primary' size='small' className='publish-scan'>
            <Icon className='iconfont' />
            扫码快捷录入信息
          </Button>
          <AtForm>
            <AtInput
              name='value1'
              title='文本'
              type='text'
              placeholder='单行文本'
              value={this.state.value1}
              onChange={this.handleChange.bind(this)}
            />
            <AtInput
              name='value2'
              title='数字'
              type='number'
              placeholder='请输入数字'
              value={this.state.value2}
              onChange={this.handleChange.bind(this)}
            />
            <AtInput
              name='value3'
              title='密码'
              type='password'
              placeholder='密码不能少于10位数'
              value={this.state.value3}
              onChange={this.handleChange.bind(this)}
            />
            <AtInput
              name='value5'
              title='小数'
              type='digit'
              placeholder='请输入小数'
              value={this.state.value5}
              onChange={this.handleChange.bind(this)}
            />
            <AtRadio
              options={[
                { label: '单选项一', value: 'option1', desc: '单选项描述' },
                { label: '单选项二', value: 'option2' },
                { label: '单选项三', value: 'option3', desc: '单选项描述' }
              ]}
              value={this.state.value}
              onClick={this.handleChange.bind(this)}
            />
            {/* <AtInputNumber
              min={0}
              max={10}
              step={1}
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            /> */}
            <AtImagePicker
              mode='top'
              files={this.state.files}
              onChange={this.onChange.bind(this)}
              onFail={this.onFail.bind(this)}
              onImageClick={this.onImageClick.bind(this)}
            />
            <AtTextarea
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
              maxLength={200}
              placeholder='你的问题是...'
            />
            <AtSwitch title='开启中' checked={this.state.value} onChange={this.handleChange} />
            <Button type='primary' size='small' className='publish-scan'>
              <Icon className='iconfont' />
              信息录入完成
          </Button>
          </AtForm>
      </View>
    );
  }
}

export default OrderPublish;
