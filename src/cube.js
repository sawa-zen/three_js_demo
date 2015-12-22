import Vector2D from './vector2d.js';

export default class Cube extends THREE.Mesh {

  /*
   * コンストラクタ
   * @param color {string}  cubeの色
   */
  constructor(color) {
    var cubeSize = 50;
    var geometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);
    var material = new THREE.MeshLambertMaterial({
      color: color
    });
    super(geometry, material);

    this.castShadow = true;
    this.position.set(0, 200, 0);

    // 初期化
    this.WRAP = 'wrap';
    this.BOUNCE = 'bounce';
    this._mass = 1.0;
    this._maxSpeed = 10;
    this._position = new Vector2D();
    this._velocity = new Vector2D(0, 0);
    this._edgeBehavior = this.BOUNCE;

  }


  update() {

    // 速度は最高スピード以内に収めること
    this._velocity.truncate(this._maxSpeed);

    // 速度を位置に足す
    this._position = this._position.add(this._velocity);

    // 画面の端での処理をする
    if(this._edgeBehavior == this.WRAP) {
      this.wrap();
    } else if (this._edgeBehavior == this.BOUNCE) {
      this.bounce();
    }

    // Spriteの位置を更新する
    this.x = this._position.x;
    this.y = this._position.y;


    // 向きを速度に合わせる
    // ラジアンを土に変換する：度 = ラジアン * 180 / π
    this.rotation.y = this._velocity.angle * 180 / Math.PI;
  }


  /**
   * ステージの端にきたら、跳ね返るようにする
   */
  bounce() {
    if(this._position.x > 400) {
      this._position.x = 400;
      this._velocity.x *= -1;
    } else if (this._position.x < -400) {
      this._position.x = -400;
      this._velocity.x *= -1;
    }

    if(this._position.y > 400) {
      this._position.y = 400;
      this._velocity.y *= -1;
    } else if (this._position.y < -400) {
      this._position.y = -400;
      this._velocity.y *= -1;
    }
  }


  /**
   * ステージの端にきたら、反対側に出現するようにする
   */
  wrap() {
    if(this._position.x > 800) {
      this._position.x = 0;
    }
    if(this._position.x < 0) {
      this._position.x = 800;
    }
    if(this._position.y > 500) {
      this._position.y = 0;
    }
    if(this._position.y < 0) {
      this._position.y = 500;
    }
  }


  /**
   * ステージの端での挙動を設定/取得する
   */
  set edgeBehavior(value) {
    this._edgeBehavior = value;
  }
  get edgeBehavior() {
    return this._edgeBehavior;
  }


  /**
   * 質量を設定/取得する
   */
  set mass(value) {
    this._mass = value;
  }
  get mass() {
    return this._mass;
  }


  /**
   * 最大スピードを設定/取得する
   */
  set maxSpeed(value) {
    this._maxSpeed = value;
  }
  get maxSpeed() {
    return this._maxSpeed;
  }


  /**
   * Vector2Dを使って位置を設定/取得する
   */
  set pos(value) {
    this._position = value;
    this.x = this._position.x;
    this.y = this._position.y;
  }
  get pos() {
    return this._position;
  }


  /**
   * Vector2Dを使って速度を設定/取得する
   */
  set velocity(value) {
    this._velocity = value;
  }
  get velocity() {
    return this._velocity;
  }


  /**
   * x座標を設定する
   */
  set x(value) {
    this._position.x = value;
    // 3Dは上から見た時はyが横となる
    this.position.x = this._position.x;
  }


  /**
   * y座標を設定する
   */
  set y(value) {
    this._position.y = value;
    // 3Dは上から見た時はyが横となる
    this.position.z = this._position.y;
  }


  /**
   * 回転アニメーションさせる
   */
  rotate() {
    this.rotation.x += Math.PI / 180;
    //this.rotation.y += Math.PI / 180;
    //this.rotation.z += Math.PI / 180;
  }


}
