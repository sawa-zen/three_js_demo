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
    let planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);

    // Material
    let planeTexture = THREE.ImageUtils.loadTexture("assets/texture/tile.png");
    planeTexture.wrapS = planeTexture.wrapT = THREE.RepeatWrapping;
    planeTexture.repeat.set(16, 16);
    let planeMaterial = new THREE.MeshPhongMaterial({
      map: planeTexture,
      bumpMap: planeTexture,
      bumpScale: 0.2,
      shininess: 3,
      specularMap: planeTexture,
      side: THREE.DoubleSide
    });

    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = 90 * Math.PI / 180;
    plane.receiveShadow = true;
    this.add(plane);
  }

}
