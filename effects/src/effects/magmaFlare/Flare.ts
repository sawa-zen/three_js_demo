/**
 * フレアクラスです。
 */
export default class Flare extends THREE.Object3D {

  /** ジオメトリ */
  private _geometry:THREE.CylinderGeometry;
  /** カラーマップ */
  private _map:THREE.Texture;
  /** マテリアル */
  private _material:THREE.MeshBasicMaterial;
  /** メッシュ */
  private _mesh:THREE.Mesh;
  /** スピード */
  private _speed:number;

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    this._speed = Math.random() * 0.05 + 0.01;

    // ジオメトリ
    this._geometry = new THREE.CylinderGeometry(2, 4, 0, 30, 3, true);

    // カラーマップ
    this._map = THREE.ImageUtils.loadTexture('./assets/texture/aura3_type2.png');
    this._map.wrapS = this._map.wrapT = THREE.RepeatWrapping;
    this._map.offset.x = Math.random() * 10;
    this._map.offset.y = Math.random() * 10;

    // マテリアル
    this._material = new THREE.MeshBasicMaterial({
      map: this._map,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
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
      this._map.offset.x += 0.005;
      this._map.offset.y += 0.02;
    }
  }

}
