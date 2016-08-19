/**
 * マグマ球クラスです。
 */
export default class Magma extends THREE.Object3D {

  /** ジオメトリ */
  private _geometry:THREE.SphereGeometry;
  /** カラーマップ */
  private _map:THREE.Texture;
  /** マテリアル */
  private _material:THREE.MeshBasicMaterial;
  /** メッシュ */
  private _mesh:THREE.Mesh;

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // ジオメトリ
    this._geometry = new THREE.SphereGeometry(2, 20, 20);

    // カラーマップ
    this._map = THREE.ImageUtils.loadTexture('./assets/texture/magma.png');
    this._map.wrapS = this._map.wrapT = THREE.RepeatWrapping;

    // マテリアル
    this._material = new THREE.MeshBasicMaterial({
      map: this._map
    });

    // メッシュ
    this._mesh = new THREE.Mesh(
      this._geometry,
      this._material
    );
    this.add(this._mesh);
  }

  /**
   * フレーム毎の更新
   */
  public update() {
    if(this._map) {
      this._map.offset.x += 0.002;
      this._map.offset.y += 0.002;
    }
  }

}
