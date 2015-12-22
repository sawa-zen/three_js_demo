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

    this._mass = 1.0;
    this._maxSpeed = 10;

    this._position = new Vector2D();
    this._velocity = new Vector2D();

    this.castShadow = true;
    this.position.set(0, 200, 0);
  }


  update() {

    // 速度は最高スピード以内に収めること
    this._velocity.truncate(this._maxSpeed);

    // 速度を位置に足す
    this._position = this._position.add(this._velocity);

  }


  /**
   * 回転アニメーションさせる
   */
  rotate() {
    this.rotation.x += Math.PI / 180;
    this.rotation.y += Math.PI / 180;
    this.rotation.z += Math.PI / 180;
  }


}
