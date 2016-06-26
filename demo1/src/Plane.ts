/**
 * 地面クラス
 */
export default class Plane extends THREE.Object3D {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // Geometry
    let geometry = new THREE.PlaneGeometry(100, 100, 10, 10);

    // Material
    let texture = THREE.ImageUtils.loadTexture("assets/texture/tile.png");
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 16);
    let material = new THREE.MeshPhongMaterial({
      map: texture
    });

    // Mesh
    let mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -90 * Math.PI / 180;
    //mesh.receiveShadow = true;
    this.add(mesh);
  }

}
