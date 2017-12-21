import _ from 'lodash';
import * as THREE from 'three';
import AnimationStore from '../../stores/AnimationStore';
import Camera from '../camera/Camera';
import Target from '../object/Target';

/**
 * カメラ管理クラス
 */
export default class CameraManager {

  /** カメラリスト */
  _cameras = [];
  /** カレント */
  _current;
  get current() {
    return this._current;
  }

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {

    this._onInterval = this._onInterval.bind(this);

    // 1カメ
    var camera = new Camera();
    camera.position.z = 25;
    this.regist(camera);

    // 2カメ
    var camera = new Camera();
    camera.position.x = 25;
    camera.position.z = 25;
    this.regist(camera);

    // 3カメ
    var camera = new Camera();
    camera.position.x = -25;
    camera.position.z = -25;
    this.regist(camera);

    // インターバルを監視
    AnimationStore.instance.on('interval', this._onInterval);
  }

  /**
   * カメラを登録します。
   */
  regist(camera) {
    // カメラを追加
    this._cameras.push(camera);
    // カレントカメラが無ければ設定する
    if(!this._current) {
      this._current = camera;
    }
  }

  /**
   * 更新します。
   */
  update() {
    // 各カメラを更新
    this._current.update();
  }

  /**
   * インターバル時のハンドラーです。
   */
  _onInterval() {
    if(AnimationStore.instance.diff % 6000 < 2000) {
      this._current = this._cameras[0];
    } else if(AnimationStore.instance.diff % 6000 < 4000){
      this._current = this._cameras[1];
    } else {
      this._current = this._cameras[2];
    }
  }
}
