/**
 * ポイントライトヘルパークラスです。
 */
export default class PointLightHelper extends THREE.Object3D {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    var pointLight = new THREE.PointLight(0xff0000, 1, 100);
    pointLight.rotation.x = -1;
    this.add(pointLight);

    var sphereSize = 1;
    var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
    this.add(pointLightHelper);
  }

}
