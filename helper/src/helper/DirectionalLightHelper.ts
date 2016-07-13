/**
 * 平行光源ヘルパークラスです。
 */
export default class DirectionalLightHelper extends THREE.Object3D {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // 平行光源
    let directionalLight = new THREE.DirectionalLight(0xffff00, 0.5);
    directionalLight.position.set(1, 1, 0);
    this.add(directionalLight);

    // 平行光源ヘルパー
    let directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
    directionalLight.position.set(0, 0, 0);
    this.add(directionalLightHelper);
  }

}
