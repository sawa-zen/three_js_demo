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
      uniforms: {
        glowColor: {type: "c", value: new THREE.Color(0x96ecff)},
        viewVector: {type: "v3", value: camera.position}
      },
      vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main()
        {
          vec3 vNormal = normalize(normal);
          vec3 vNormel = normalize(viewVector);
          intensity = 1.0 - dot(vNormal, vNormel);

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

    // メッシュ
    this._mesh = new THREE.Mesh(
      this._geometry,
      this._material
    );
    this.add(this._mesh);
  }

}
