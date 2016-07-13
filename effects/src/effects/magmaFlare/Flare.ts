import Camera from "../../Camera";

/**
 * フレアクラスです。
 */
export default class Flare extends THREE.Object3D {

  /** ジオメトリ */
  private _geometry:THREE.CylinderGeometry;
  /** カラーマップ */
  private _map:THREE.Texture;
  /** マテリアル */
  private _material:THREE.ShaderMaterial;
  /** メッシュ */
  private _mesh:THREE.Mesh;
  /** スピード */
  private _speed:number;
  /** オフセット */
  private _offset:THREE.Vector2 = new THREE.Vector2();

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

    // マテリアル
    this._material = this._createMaterial();

    // メッシュ
    this._mesh = new THREE.Mesh(
      this._geometry,
      this._material
    );
    this.add(this._mesh);
  }

  /**
   * マテリアルを生成します。
   * @return THREE.ShaderMaterial
   */
  private _createMaterial():THREE.ShaderMaterial {
    let camera = Camera.getInstance();
    let material = new THREE.ShaderMaterial({
      uniforms: {
        map: {
          type: 't',
          value: this._map
        },
        offset: {
          type: 'v2',
          value: this._offset
        },
        opacity: {
          type: 'f',
          value: 0.3
        }
      },
      vertexShader: `
        varying vec2 vUv;
        uniform vec2 offset;
        void main()
        {
          vUv = uv + offset;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        uniform float opacity;
        varying vec2 vUv;
        void main() {
          vec4 tColor;
          tColor = texture2D(map, vUv);
          gl_FragColor = tColor * vec4(1.0, 1.0, 1.0, opacity);
        }
      `,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true
    });
    return material;
  }

  /**
   * フレーム毎の更新
   */
  public update() {
    this._offset.x += 0.005;
    this._offset.y += 0.01;
  }

}
