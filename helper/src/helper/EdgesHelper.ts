/**
 * エッジヘルパー
 */
export default class EdgesHelper extends THREE.Object3D {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    var geometry = new THREE.BoxGeometry( 2, 2, 2, 2, 2, 2 );
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var object = new THREE.Mesh( geometry, material );

    var edges = new THREE.EdgesHelper( object, 0x00ff00 );

    this.add(object);
    this.add(edges);
  }

}
