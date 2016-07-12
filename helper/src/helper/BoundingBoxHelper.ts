/**
 * 境界エリアヘルパークラスです。
 */
export default class BoundingBoxHelper extends THREE.Object3D {

  /**
   * コンストラクター
   * constructor
   */
  constructor() {
    super();

    var hex  = 0xff0000;

    var sphereMaterial = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
    var sphere = new THREE.Mesh(new THREE.SphereGeometry( 1, 20, 20), sphereMaterial);
    this.add(sphere);

    var bbox = new THREE.BoundingBoxHelper( sphere, hex );
    bbox.update();
    this.add(bbox);
  }

}
