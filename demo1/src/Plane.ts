/**
 * 地面クラス
 */
export default class Plane extends THREE.Object3D {

  private _texture:THREE.Texture;

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // Geometry
    let geometry = new THREE.PlaneGeometry(100, 100, 10, 10);

    // Material
    let loader = new THREE.TextureLoader();
    this._texture = loader.load('assets/texture/tile.png');
    this._texture.wrapS = this._texture.wrapT = THREE.RepeatWrapping;
    this._texture.repeat.set(16, 16);
    let material = new THREE.MeshPhongMaterial({
      map: this._texture
    });

    // Mesh
    let mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -90 * Math.PI / 180;
    mesh.receiveShadow = true;
    this.add(mesh);
  }

  /**
   * 更新します。
   */
  public update() {
    this._texture.offset.y -= 0.006;
  }
}
