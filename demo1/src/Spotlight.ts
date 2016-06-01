/**
 * スポットライトクラス
 */
export default class SpotLight extends THREE.SpotLight {

  private static _instance:SpotLight = null;

  public static getInstance():SpotLight {
    return SpotLight._instance || new SpotLight();
  }

  /** アニメーションに用いる角度の値です。 */
  private _angle:number = 0;
  /** アニメーションの円軌道の半径です。 */
  private _radius:number = 50;

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super(0xffffff);
    this.position.set( 10, 40, 30 );
    this.castShadow = true;
    this.shadow.mapSize.width = 512;
    this.shadow.mapSize.height = 512;

    SpotLight._instance = this;
  }

  /**
   * 毎フレームの更新をかけます。
   */
  public update() {
    this._angle++;
    let lad = this._angle * Math.PI / 180;
    this.position.x = this._radius * Math.sin(lad);
    this.position.z = this._radius * Math.cos(lad);
    this.lookAt(new THREE.Vector3(0, 15, 0));
  }

}
