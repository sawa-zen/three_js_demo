/**
 * グリッドヘルパークラスです。
 */
export default class GridHelper extends THREE.Object3D {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    var size = 1.5;
    var step = 0.25;

    var gridHelper = new THREE.GridHelper(size, step);
    this.add(gridHelper);
  }

}
