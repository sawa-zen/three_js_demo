/**
 * フレアクラスです。
 */
export default class Flare extends THREE.Object3D {

  /** ジオメトリ */
  private _geometry:THREE.TorusGeometry;
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
    this._geometry = new THREE.TorusGeometry(2, 2, 2, 200);

    // カラーマップ
    this._map = THREE.ImageUtils.loadTexture('./assets/texture/aura3_type2.png');
    this._map.wrapS = this._map.wrapT = THREE.RepeatWrapping;
    this._map.offset.y = Math.random() * 10;

    // マテリアル
    this._material = new THREE.MeshBasicMaterial({
      map: this._map,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.2,
      depthWrite: false
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
      this._map.offset.y += 0.015;
    }
  }

}
