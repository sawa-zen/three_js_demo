import * as THREE from 'three';
import SkyDome from '../object/SkyDome';
import ParticleEmitter from '../object/ParticleEmitter';
import Light from '../object/Light';

/**
 * メインシーンクラス
 */
export default class MainScene extends THREE.Scene {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // ライト
    this._light = new Light();
    this.add(this._light);

    // スカイドーム
    this._skyDome = new SkyDome();
    this.add(this._skyDome);

    // パーティクルエミッター
    this._particleEmitter = new ParticleEmitter();
    this.add(this._particleEmitter);
  }

  /**
   * 更新
   */
  update() {
    // パーティクルエミッターを更新
    this._particleEmitter.update();
    // ライトを更新
    this._light.update();
  }
}
