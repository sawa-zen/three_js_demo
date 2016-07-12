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
    this._material = this._createMaterial();
    // new THREE.MeshBasicMaterial({
    //   map: this._map,
    //   blending: THREE.AdditiveBlending,
    //   transparent: true,
    //   opacity: 0.3,
    //   side: THREE.DoubleSide,
    //   depthWrite: false
    // });

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
        "c": {type: "f", value: 1.0},
        "p": {type: "f", value: 0.9},
        glowColor: {type: "c", value: new THREE.Color(0x96ecff)},
        viewVector: {type: "v3", value: camera.position}
      },
      vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main()
        {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormel = normalize(normalMatrix * viewVector);
          intensity = pow(c - dot(vNormal, vNormel), p);

          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        varying vec2 vUv;
        void main() {
          vec4 tColor;
          tColor = texture2D(map, vUv);
          gl_FragColor = tColor;
        }
      `,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    return material;
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
