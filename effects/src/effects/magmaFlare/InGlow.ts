import Camera from '../../Camera';

/**
 * イングロークラスです。
 */
export default class InGlow extends THREE.Object3D {

  /** ジオメトリ */
  private _geometry:THREE.SphereGeometry;
  /** マテリアル */
  private _material:THREE.ShaderMaterial;
  /** メッシュ */
  private _mesh:THREE.Mesh;

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // ジオメトリ
    this._geometry = new THREE.SphereGeometry(2.07, 20, 20);

    // カメラ
    let camera = Camera.getInstance();

    // マテリアル
    this._material = new THREE.ShaderMaterial({
      uniforms:
        {
        "c": {type: "f", value: 1.2},
        "p": {type: "f", value: 0.9},
        glowColor: {type: "c", value: new THREE.Color(0xffffff)},
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
        uniform vec3 glowColor;
        varying float intensity;
        void main()
        {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4(glow, 1.0);
        }
      `,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    // カスタムシェーダー
    var customMaterial = new THREE.ShaderMaterial(
                                                 );

    // メッシュ
    this._mesh = new THREE.Mesh(
      this._geometry,
      this._material
    );
    this.add(this._mesh);
  }

}
