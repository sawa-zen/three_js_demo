import Cube from './cube.js';

export default class Enemy extends Cube {

  /**
   * 初期化
   */
  init() {
    this.MODE_SHEEK = 'seek';
    this._mode = this.MODE_SHEEK;
  }

  /**
   * コンストラクタ
   */
  constructor() {
    super(0xFF00FF);
  }

  /**
   * 操舵行動
   */
  move() {
    switch(this._mode) {
      case this.MODE_SHEEK:
        break;
    }
  }

  /**
   * 追求行動
   */
  _seek() {

  }

}
