import React from 'react';
import MainVisual from './mainVisual/MainVisual';
import Header from './header/Header';
import Footer from './footer/Footer';
import AboutModal from './modal/AboutModal';
import AnimationStore from '../stores/AnimationStore';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/**
 * アプリクラスです。
 */
export default class App extends React.Component {

  /**
   * コンストラクター
   * @constructor
   */
  constructor(props) {
    super(props);

    this._onChangeMaterialMode = this._onChangeMaterialMode.bind(this);

    this.state = {
      modal: null,
      materialMode: AnimationStore.instance.materialMode
    };

    // GAトラッキング
    (function(i,s,o,g,r,a,m){
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function(){
        (i[r].q = i[r].q || []).push(arguments);
      },
        i[r].l=1*new Date();
      a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];
      a.async=1;
      a.src=g;
      m.parentNode.insertBefore(a,m);
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-35176364-1', 'auto');
    ga('send', 'pageview');
  }

  /**
   * コンポーネントがマウントされた際のハンドラーです。
   */
  componentDidMount() {
    // マテリアルモードの変更を監視
    AnimationStore.instance.on('changeMaterialMode', this._onChangeMaterialMode);
  }

  /**
   * 描画
   */
  render() {
    return (
      <div className="App">
        <MainVisual materialMode={this.state.materialMode}/>
      </div>
    );
  }

  _onTouchTap() {
    this.setState({
      modal: 'about'
    });
  }

  /**
   * モーダルを生成して返却します。
   */
  _getModal() {
    let modal;

    switch(this.state.modal) {
      case 'about': return (<AboutModal onTouchTapClose={this._onTouchTapClose.bind(this)}/>);
    }

    return null;
  }

  /**
   * モーダルの閉じるボタン押下時のハンドラーです。
   */
  _onTouchTapClose() {
    this.setState({
      modal: null
    });
  }

  /**
   * マテリアルモード変更時のハンドラーです。
   */
  _onChangeMaterialMode() {
    this.setState({
      materialMode: AnimationStore.instance.materialMode
    });
  }
}
