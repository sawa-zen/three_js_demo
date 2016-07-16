/**
 * ワイヤーフレームヘルパークラスです。
 */
export default class WireframeHelper extends THREE.Object3D {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    let geometry = new THREE.BoxGeometry(2, 2, 2, 2, 2, 2);
    let material = new THREE.MeshBasicMaterial({color: 0xff0000});
    let object = new THREE.Mesh(geometry, material);

    let wireframe = new THREE.WireframeHelper(object, 0x00ff00);

    this.add(object);
    this.add(wireframe);
  }

}
