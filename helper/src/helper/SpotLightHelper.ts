/**
 * スポットライトヘルパーです。
 */
export default class SpotLightHelper extends THREE.Object3D {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.distance = 2.5;
    spotLight.angle = 0.4;
    spotLight.position.y = 1.5;
    this.add(spotLight);

    var spotLightHelper = new THREE.SpotLightHelper(spotLight, 2, 1);
    this.add(spotLightHelper);
  }

}
