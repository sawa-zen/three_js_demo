/**
 * スパーククラス
 */
export default class Spark extends THREE.Object3D {

  /** ジオメトリ */
  private _geometry:THREE.PlaneGeometry;
  /** カラーマップ */
  private _map:THREE.Texture;
  /** マテリアル */
  private _material:THREE.Material;
  /** メッシュ */
  private _mesh:THREE.Mesh;

  /** スピード */
  private _speed:number = Math.random() * 0.1 + 0.2;

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // ジオメトリ
    this._geometry = new THREE.PlaneGeometry(0.15, 2.5, 2);

    // カラーマップ
    this._map = THREE.ImageUtils.loadTexture('./assets/texture/Burst01.png');
    this._map.wrapS = this._map.wrapT = THREE.RepeatWrapping;

    // マテリアル
    this._material = new THREE.MeshBasicMaterial({
      map: this._map,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });

    // メッシュ
    this._mesh = new THREE.Mesh(
      this._geometry,
      this._material
    );
    this._mesh.position.y = Math.random() * 5;
    this.add(this._mesh);
  }

  /**
   * フレーム毎の更新
   */
  public update() {
    this._mesh.position.y -= this._speed;
    this._mesh.material.opacity -= 0.1;
    if(this._mesh.position.y < 0) {
      this._mesh.position.y = 5;
      this._mesh.material.opacity = 1;
    }
  }

}
