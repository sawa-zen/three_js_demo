/**
 * スポットライトクラス
 */
export default class SpotLight extends THREE.SpotLight {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super(0xffffff);
    this.position.set( 10, 50, 30 );
    this.castShadow = true;
    this.shadow.mapSize.width = 1024;
    this.shadow.mapSize.height = 1024;
  }

}
