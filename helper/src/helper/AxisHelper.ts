/**
 * 三軸ヘルパークラスです。
 */
export default class AxisHelper extends THREE.Object3D {

  /**
   * コンストラクター
   * constructor
   */
  constructor() {
    super();

    var axisHelper = new THREE.AxisHelper(2);
    this.add(axisHelper);
  }

}
