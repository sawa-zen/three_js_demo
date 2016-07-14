/**
 * 面法線ヘルパークラスです。
 */
export default class FaceNormalsHelper extends THREE.Object3D {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    let geometry = new THREE.BoxGeometry(2, 2, 2, 2, 2, 2);
    let material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true
    });
    let object = new THREE.Mesh(geometry, material);

    let edges = new THREE.FaceNormalsHelper(object, 0.3, 0x00ff00, 1);

    this.add(object);
    this.add(edges);
  }

}
