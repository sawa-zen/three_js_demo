/**
 * 3Dモデルクラスです。
 */
export default class Model extends THREE.Object3D {

  /** Mesh */
  private _mesh:THREE.Mesh;

  /**
   * コンストラクター
   * @constructor
   */
  constructor(geometry:THREE.Geometry, materials:Array<THREE.Material>) {
    super();

    let scale = 1.5;
    let material = new THREE.MultiMaterial(materials);
    this._mesh = new THREE.Mesh(geometry, material);
    this._mesh.scale.set(scale, scale, scale);
    this.add(this._mesh);
  }

}
