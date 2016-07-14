import Magma from './Magma';
import Aura from './Aura';
import InGlow from './InGlow';
import FlareEmitter from './FlareEmitter';
import SparkEmitter from './SparkEmitter';
import OutGlow from './OutGlow';

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
  /** フレアエミッター */
  private _flareEmitter:FlareEmitter;
  /** スパークエミッター */
  private _sparkEmitter:SparkEmitter;
  /** 背景グロー */
  private _outGlow:OutGlow;

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

    // フレア
    this._flareEmitter = new FlareEmitter();
    this.add(this._flareEmitter);

    // スパーク
    this._sparkEmitter = new SparkEmitter();
    this.add(this._sparkEmitter);

    // アウトグロー
    this._outGlow = new OutGlow();
    this.add(this._outGlow);
  }

  /**
   * フレーム毎の更新
   */
  public update() {
    this._magma.update();
    this._aura.update();
    this._flareEmitter.update();
    this._sparkEmitter.update();
  }

}
