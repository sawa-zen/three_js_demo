/**
 * カメラのクラスです。
 */
export default class Camera extends THREE.PerspectiveCamera {

  /** アニメーションに用いる角度の値です。 */
  private _angle:number = 0;
  /** アニメーションの円軌道の半径です。 */
  private _radius:number = 15;

  /**
   * コンストラクターです。
   * @constructor
   */
  constructor() {
    super(45, window.innerWidth / window.innerHeight, 1,  1000);

    this.position.set(this._radius, 4, 0);
  }

  /**
   * 回転させます。
   * @param {string} direction
   */
  public rotate(direction:string) {
    if(direction == "left") {
      this._angle-=3;
    } else if(direction == "right") {
      this._angle+=3;
    }
  }

  /**
   * 毎フレームの更新をかけます。
   */
  public update() {
    let lad = this._angle * Math.PI / 180;
    this.position.x = this._radius * Math.sin(lad);
    this.position.z = this._radius * Math.cos(lad);
    this.lookAt(new THREE.Vector3(0, 1.5, 0));
  }

}
