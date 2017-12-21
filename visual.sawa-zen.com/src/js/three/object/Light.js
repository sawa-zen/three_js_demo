import * as THREE from 'three';

/**
 * ライトクラス
 */
export default class Light extends THREE.Object3D {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // 環境光
    this.add(new THREE.AmbientLight(0xffffff, 0.1));

    // ピラミッド型のジオメトリ
    let geo = new THREE.TetrahedronGeometry(5, 0);

    // ライト
    var dLight = new THREE.DirectionalLight(0x3498db, 1.0);
    dLight.position.copy(geo.vertices[0]);
    this.add(dLight);

    // ライト
    var dLight = new THREE.DirectionalLight(0x2ecc71, 1.0);
    dLight.position.copy(geo.vertices[1]);
    this.add(dLight);

    // ライト
    var dLight = new THREE.DirectionalLight(0xf1c40f, 1.0);
    dLight.position.copy(geo.vertices[2]);
    this.add(dLight);

    // ライト
    var dLight = new THREE.DirectionalLight(0xe74c3c, 1.0);
    dLight.position.copy(geo.vertices[3]);
    this.add(dLight);
  }

  /**
   * 更新
   */
  update() {
    // this.rotation.x += 0.01;
    // this.rotation.y += 0.03;
    // this.rotation.z += 0.01;
  }
}
