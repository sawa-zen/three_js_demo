import * as THREE from 'three';
import AnimationStore from '../../stores/AnimationStore';

/**
 * スカイドームクラス
 */
export default class SkyDome extends THREE.Mesh {

  /** ジオメトリ */
  static GEOMETRY = new THREE.IcosahedronGeometry(300, 4);

  /** フォンシェーディングマテリアル */
  static PHONG_MATERIAL = new THREE.MeshPhongMaterial({
    color: 0xf5f5f5,
    side: THREE.BackSide
  });

  /** ベーシックマテリアル */
  static BASIC_MATERIAL = new THREE.MeshBasicMaterial({
    color: 0xcccccc,
    wireframe: true,
    side: THREE.BackSide
  });

  /** モード */
  _mode = 'phong';

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super(SkyDome.GEOMETRY, SkyDome.PHONG_MATERIAL);

    // フラットシェーディング
    this.geometry.computeFlatVertexNormals();

    // マテリアルモードの変更を監視
    this._onChangeMaterialMode = this._onChangeMaterialMode.bind(this);
    AnimationStore.instance.on('changeMaterialMode', this._onChangeMaterialMode);
  }

  /**
   * マテリアルをスイッチ時のハンドラーです。
   */
  _onChangeMaterialMode() {
    if(AnimationStore.instance.materialMode == 'normal') {
      this.material = SkyDome.PHONG_MATERIAL;
    } else {
      this.material = SkyDome.BASIC_MATERIAL;
    }
  }
}
