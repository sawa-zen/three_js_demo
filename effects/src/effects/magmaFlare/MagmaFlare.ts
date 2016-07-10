import Magma from './Magma';
import Aura from './Aura';
import InGlow from './InGlow';

/**
 * マグマフレアクラスです。
 */
export default class MagmaFlare extends THREE.Object3D {

  /** マグマ */
  private _magma:Magma;
  /** オーラ球 */
  private _aura:Aura;
  /** イングロー */
  private _inGlow:InGlow;

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // マグマ
    this._magma = new Magma();
    this.add(this._magma);

    // オーラ
    this._aura = new Aura();
    this.add(this._aura);

    // イングロー
    this._inGlow = new InGlow();
    this.add(this._inGlow);
  }

  /**
   * フレーム毎の更新
   */
  public update() {
    this._magma.update();
    this._aura.update();
  }

}
