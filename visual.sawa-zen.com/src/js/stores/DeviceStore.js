import EventEmitter from 'eventemitter3';

/**
 * デバイス情報周りのストアクラス
 */
export default class DeviceStore extends EventEmitter {

  /** インスタンス */
  static get instance() {
    return DeviceStore._instance || new DeviceStore();
  }

  /** キャンバスの幅 */
  _canvasW;
  get canvasW() {
    return this._canvasW;
  }

  /**
   * キャンバスの高さ
   */
  _canvasH;
  get canvasH() {
    return this._canvasH;
  }

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    this._onResizeWindow = this._onResizeWindow.bind(this);

    // キャンバスラッパーDOM
    this._wrapper = document.getElementById('MainVisualThree');
    // windowのリサイズを監視
    window.addEventListener('resize', this._onResizeWindow);

    // サイズを更新
    this._canvasW = this._wrapper.clientWidth;
    this._canvasH = this._wrapper.clientHeight;

    DeviceStore._instance = this;
  }

  /**
   * リサイズ時のハンドラーです。
   */
  _onResizeWindow(event) {
    // サイズを更新
    this._canvasW = this._wrapper.clientWidth;
    this._canvasH = this._wrapper.clientHeight;
    // リサイズイベントを発火
    this.emit('resize');
  }
}
