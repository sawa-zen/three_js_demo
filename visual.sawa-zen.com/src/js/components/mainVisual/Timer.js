import React from 'react';
import AnimationStore from '../../stores/AnimationStore';

/**
 * タイマークラスです。
 */
export default class Timer extends React.Component {

  /**
   * コンストラクター
   * @constructor
   */
  constructor(props) {
    super();

    this._onIntervalTime = this._onIntervalTime.bind(this);

    this.state = {
      remaining: AnimationStore.instance.remaining
    };
  }

  /**
   * コンポーネントがマウントされた際のハンドラーです。
   */
  componentDidMount() {
    AnimationStore.instance.on('interval', this._onIntervalTime);
  }

  /**
   * コンポーネントが破棄された際のハンドラーです。
   */
  componentWillUnmount() {
    AnimationStore.instance.off('interval', this._onIntervalTime);
  }

  /**
   * 描画
   */
  render() {
    let remaining = this.state.remaining;

    let days         = Math.floor(remaining.asDays());
    let hours        = ('00' + remaining.hours()).substr(-2, 2);
    let minutes      = ('00' + remaining.minutes()).substr(-2, 2);
    let seconds      = ('00' + remaining.seconds()).substr(-2, 2);
    let milliseconds = ('000' + remaining.milliseconds().toString()).substr(-3, 3);

    return (
      <div className="Timer">
        <div className="TimerTitle">
          ATL<br/>SHOWCASE
        </div>
        <div className="TimerOpen">
          7.15<span className="TimerOpenUnit">, Open</span>
        </div>
        <div className="TimerRemain">
          <div className="TimerRemainDay">
            <div className="TimerRemainNumber">{days}</div>
            <div className="TimerRemainUnit">Days</div>
          </div>

          <div className="TimerRemainHour">
            <div className="TimerRemainNumber">.{hours}</div>
            <div className="TimerRemainUnit">Hours</div>
          </div>

          <div className="TimerRemainMin">
            <div className="TimerRemainNumber">.{minutes}</div>
            <div className="TimerRemainUnit">Min</div>
          </div>


          <div className="TimerRemainSec">
            <div className="TimerRemainNumber">.{seconds}</div>
            <div className="TimerRemainUnit">Sec</div>
          </div>

          <div className="TimerRemainMsec">
            <div className="TimerRemainNumber">.{milliseconds}</div>
            <div className="TimerRemainUnit">MSec</div>
          </div>

        </div>
      </div>
    );
  }

  /**
   * インターバル時のハンドラーです。
   */
  _onIntervalTime() {
    this.setState({
      remaining: AnimationStore.instance.remaining
    });
  }
}
