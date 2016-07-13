/**
 */
export default class BoxHelper extends THREE.Object3D {

  /**
   * コンストラクター
   * constructor
   */
  constructor() {
    super();

    var sphere = new THREE.SphereGeometry(1, 30, 30);
    var sphereMaterial = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
    var object = new THREE.Mesh( sphere, sphereMaterial);
    this.add(object);

    var box = new THREE.BoxHelper( object );
    this.add(box);
  }

}
