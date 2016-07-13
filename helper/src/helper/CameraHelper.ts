import Camera from '../Camera';

/**
 * カメラヘルパークラスです。
 */
export default class CameraHelper extends THREE.Object3D {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    let camera = new THREE.PerspectiveCamera(20, 16 / 9, 1, 3);
    let cameraHelper = new THREE.CameraHelper(camera);
    this.add(cameraHelper);
  }

}
