import Spark from './Spark';

/**
 * スパークのエミッタークラス
 */
export default class SparkEmitter extends THREE.Object3D {

  /** スパークの数 */
  private sparkNum:number = 40;

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();
  }

}
