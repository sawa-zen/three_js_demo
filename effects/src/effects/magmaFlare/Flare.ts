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
  /** 上面の半径 */
  private _topRadius:number;
  /** 下面の半径 */
  private _bottomRadius:number;

  /** ランダム係数 */
  private _randomRatio:number = Math.random() + 1;

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    this._speed = Math.random() * 0.05 + 0.01;

    // ジオメトリ
    this._topRadius = 6;
    this._bottomRadius = 2;
    this._geometry = new THREE.CylinderGeometry(this._topRadius, this._bottomRadius, 0, 30, 3, true);

    // カラーマップ
    this._map = THREE.ImageUtils.loadTexture('./assets/texture/aura3_type2.png');
    this._map.wrapS = this._map.wrapT = THREE.RepeatWrapping;
    this._map.repeat.set(10, 10);

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
          value: 0.15
        },
        topRadius: {
          type: 'f',
          value: this._topRadius
        },
        bottomRadius: {
          type: 'f',
          value: this._bottomRadius
        }
      },
      vertexShader: `
        varying vec2 vUv;
        varying float radius;
        uniform vec2 offset;
        void main()
        {
          vUv = uv + offset;
          radius = length(position);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        uniform float opacity;
        uniform float topRadius;
        uniform float bottomRadius;
        varying vec2 vUv;
        varying float radius;

        void main() {
          vec4 tColor;
          tColor = texture2D(map, vUv);
          float width = topRadius - bottomRadius;
          float rad = 3.14 * (radius - bottomRadius) / width;
          float o = opacity * sin(rad);
          gl_FragColor = (tColor + vec4(0.0, 0.0, 0.3, 1.0)) * vec4(1.0, 1.0, 1.0, o);
        }
      `,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true
    });
    return material;
  }

  /**
   * フレーム毎の更新
   */
  public update() {
    this._offset.x += 0.004 * this._randomRatio;
    this._offset.y -= 0.015 * this._randomRatio;
  }

}
