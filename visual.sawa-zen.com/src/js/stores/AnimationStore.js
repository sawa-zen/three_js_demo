import EventEmitter from 'eventemitter3';
import _ from 'lodash';
import moment from 'moment';
require('moment/locale/ja');
import Config from '../Config';
import TimelineData from '../data/TimelineData';

/**
 * アニメーションストアクラスです。
 */
export default class AnimationStore extends EventEmitter {

  /** リミット */
  static LIMIT = moment(Config.LIMIT_DATE);

  /** インスタンス */
  static get instance(){
    return AnimationStore._instance || new AnimationStore();
  }

  /** 差分のタイムスタンプ */
  _diff;
  get diff() { return this._diff; }
  /** 残り時間 */
  _remaining;
  get remaining() { return this._remaining; }
  /** 再生中のタイムライン */
  _playingTimelines = [];
  get playingTimelines() { return this._playingTimelines; }
  /** カレント */
  _currentTime = 0;
  /** アニメーションタイムラインリスト */
  _timelines = [
    new TimelineData('center', 0, 2300),
    new TimelineData('brust', 2300, 2900),
    new TimelineData('flock', 2700, 12000),
    new TimelineData('brust', 12000, 12500),
    new TimelineData('center', 12500, 14000),
    new TimelineData('rope', 14000, 17000),
    new TimelineData('plane', 21000, 28000),
    // new TimelineData('string', 30000, 34000)
  ];
  /** トータル時間 */
  _totalTime = 0;
  /** マテリアルモード */
  _materialMode = 'normal';
  get materialMode() { return this._materialMode; }

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // 最後のタイムラインを取得
    let lastTimeline = _.maxBy(this._timelines, (timeline) => {
      return timeline.endTime;
    });
    this._totalTime = lastTimeline.endTime;

    // 初回の更新
    this.update();

    AnimationStore._instance = this;
  }

  /**
   * インターバル時のハンドラーです。
   */
  update() {
    // カウントをインクリメント
    this._currentTime += 16;

    // 二回に一回
    if(this._currentTime / 16 % 2 == 0) {
      return;
    }

    // 差分のタイムスタンプ
    this._diff = AnimationStore.LIMIT.diff(moment());
    // タイムスタンプらからdurationオブジェクトへ変換
    this._remaining = moment.duration(this._diff);

    // タイムライン情報の更新
    this._playingTimelines = [];
    _.each(this._timelines, (timeline) => {
      if(
        timeline.startTime <= this._currentTime &&
        timeline.endTime >= this._currentTime
      ) {
        this._playingTimelines.push(timeline);
      }
    });

    // カレントタイムがトータルを超えていたら戻す
    if(this._totalTime < this._currentTime) {
      let diff = this._currentTime - this._totalTime;
      this._currentTime = diff;
    }

    // インターバルイベントを発火
    this.emit('interval');
  }

  /**
   * マテリアルを切替えします。
   */
  switchMaterial() {
    // マテリアルモードを切り替える
    if(this._materialMode == 'normal') {
      this._materialMode = 'wireframe';
    } else {
      this._materialMode = 'normal';
    }

    // マテリアルモード切替えイベントを発火
    this.emit('changeMaterialMode');
  }
}
