/**
 * タイムラインデータクラス
 */
export default class TimelineData {

  /** モード */
  get mode() { return this._mode; }
  /** 時間 */
  get duration() { return this._endTime - this._startTime; }
  /** 開始時間 */
  get startTime() { return this._startTime; }
  /** 終了時間 */
  get endTime() { return this._endTime; }
  /** アニメーションの強さ */
  get force() { return this._force; }

  /**
   * コンストラクター
   * @constructor
   */
  constructor(mode, startTime, endTime, force = 1) {
    this._mode = mode;
    this._startTime = startTime;
    this._endTime = endTime;
    this._force = force;
  }
}
