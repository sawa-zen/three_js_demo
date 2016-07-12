/**
 * 矢印ヘルパークラスです。
 */
export default class ArrowHelper extends THREE.Object3D {

  /**
   * コンストラクター
   * constructor
   */
  constructor() {
    super();

    var dir = new THREE.Vector3(1, 0, 0);
    var origin = new THREE.Vector3(-2, 0, 0);
    var length = 4;
    var hex = 0xffff00;

    let arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
    this.add(arrowHelper);
  }

}
