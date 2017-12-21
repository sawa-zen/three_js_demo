import React from 'react';
import _ from 'lodash';
import AnimationStore from '../../stores/AnimationStore';
import ThreeMain from '../../three/ThreeMain';
import Timer from './Timer';

/**
 * メインビジュアルクラス
 */
export default class MainVisual extends React.Component {

  /**
   * コンストラクター
   * @constructor
   */
  constructor(props) {
    super(props);

    this._tick = this._tick.bind(this);
  }

  /**
   * コンポーネントがマウントされた際のハンドラーです。
   */
  componentDidMount() {
    // three.jsのオブジェクトを生成
    this._threeMain = new ThreeMain();
    // tick処理を開始
    this._tick();
  }

  /**
   * 描画
   */
  render() {
    return (
      <div className="MainVisual">
        <div className="MainVisualThree"
          id="MainVisualThree"
          onTouchTap={this._onTouchTap.bind(this)}>
        </div>
      </div>
    );
  }

  /**
   * タップ時のハンドラーです。
   */
  _onTouchTap() {
    _.defer(() => {
      // マテリアルモードの切替え
      AnimationStore.instance.switchMaterial();
    }, 300);
  }

  /**
   * フレーム毎の処理です。
   */
  _tick() {
    requestAnimationFrame(this._tick);

    // three.js部分を更新
    this._threeMain.update();

    // AnimationStoreを更新
    AnimationStore.instance.update();
  }
}
