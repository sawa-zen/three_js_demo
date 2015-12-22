export default class Vector2D {

  /**
   * コンストラクタ
   */
  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }


  /**
   * ベクトルのコピー
   */
  clone() {
    return new Vector2D(this.x, this.y);
  }


  /**
   * ベクトルを0にする
   */
  zero() {
    this._x = 0;
    this._y = 0;
    return this;
  }


  /**
   * ベクトルが0かどうか判別する
   */
  isZero() {
    return this._x === 0 && this._y === 0;
  }


  /**
   * ベクトルの大きさを設定/取得する
   */
  set length(value) {
    var a = this.angle;
    this._x = Math.cos(a) * value;
    this._y = Math.sin(a) * value;
  }

  get length() {
    return Math.sqrt(this.lengthSQ);
  }


  /**
   * ベクトルの大きさの2乗を求める
   */
  get lengthSQ() {
    return this._x * this._x + this._y * this._y;
  }


  /**
   * ベクトルの角度を設定/取得
   */
  set angle(value) {
    var len = this.length;
    this._x = Math.cos(value) * len;
    this._y = Math.sin(value) * len;
  }

  get angle() {
    return Math.atan2(this._y, this._x);
  }


  /**
   * ベクトルを正規化(大きさを1)にする
   */
  normalize() {
    if (this.length === 0) {
      this._x = 1;
      return this;
    }

    var len = this.length;
    this._x /= len;
    this._y /= len;

    return this;
  }


  /**
   * ベクトルの大きさを指定した値以下にする
   */
  truncate(max) {
    this.length = Math.min(max, length);
    return this;
  }


  /**
   * ベクトルの方向を反転する
   */
  reverse() {
    this._x = -this._x;
    this._y = -this._y;
  }


  /**
   * このベクトルが正規化されているかどうか
   */
  isNormailzed() {
    return length === 1.0;
  }


  /**
   * このベクトルと与えられたベクトルの内積を計算
   */
  dotProd(v2) {
    return this._x * v2.x + this._y * v2.y;
  }


  /**
   * 2つのベクトルの角度を計算する
   */
  angleBetween(v1, v2) {
    if (!v1.isNormailzed()) { v1 = v1.clone().normalize(); }
    if (!v2.isNormailzed()) { v2 = v2.clone().normalize(); }
    return Math.acos(v1.dotProd(v2));
  }


  /**
   * 与えられたベクトルが、このベクトルの右側にあるか
   * 左側にあるかを判別する
   * @return int 左側なら-1, 右側なら+1
   */
  sign(v2) {
    return this.perp.dotProd(v2) < 0 ? -1 : 1;
  }


  /**
   * このベクトルに垂直なベクトルを返す
   */
  get perp() {
    return new Vector2D(-this.y, this.x);
  }


  /**
   * このベクトルと与えられたベクトルの間の距離を計算する
   */
  dist(v2) {
    return Math.sqrt(this.distSQ(v2));
  }


  /**
   * このベクトルと与えられたベクトルの間の距離の2乗を計算する
   */
  distSQ(v2) {
    var dx = v2.x - this.x;
    var dy = v2.y - this.y;
    return dx * dx + dy * dy;
  }


  /**
   * このベクトルに、あるベクトルを足して、その結果を
   * 格納した新しいVector2Dインスタンスを生成する
   */
  add(v2) {
    return new Vector2D(this._x + v2.x, this._y + v2.y);
  }


  /**
   * このベクトルに、あるベクトルを引いて、その結果を
   * 格納した新しいVector2Dインスタンスを生成する
   */
  subtract(v2) {
    return new Vector2D(this._x - v2.x, this._y - v2.y);
  }


  /**
   * このベクトルに、ある値を掛けて、その結果を
   * 格納した新しいVector2Dインスタンスを生成する
   */
  multiply(value) {
    return new Vector2D(this._x * value, this._y * value);
  }


  /**
   * このベクトルをある値で割って、その結果を
   * 格納した新しいVector2Dインスタンスを生成する
   */
  divide(value) {
    return new Vector2D(this._x / value, this._y / value);
  }


  /**
   * このベクトルと、与えられたベクトルが等しいか
   * どうか判別する
   */
  equals(v2) {
    return this._x === v2.x && this._y === v2.y;
  }


  /**
   * ベクトルのx成分の値を設定/取得する
   */
  set x(value) {
    this._x = value;
  }
  get x() {
    return this._x;
  }


  /**
   * ベクトルのy成分の値を設定/取得する
   */
  set y(value) {
    this._y = value;
  }
  get y() {
    return this._y;
  }


  /**
   * このベクトルの文字列表現を生成する
   */
  toString() {
    return "[Vector2D (x:" + this._x + " , y:" + this._y + ")]";
  }

}
