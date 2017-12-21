import React from 'react';
import classNames from 'classnames';

/**
 * モーダルコンポーネント
 */
export default class Modal extends React.Component {

  /**
   * 描画
   */
  render() {
    let classes = classNames('ModalWrapper', this.props.className);
    return (
      <div className="Modal">
        <div className="ModalBackground"></div>
        <div className={classes}>
          <div className="ModalBody">
            <div className="ModalContent">
              {this.props.children}
            </div>
            <button className="ModalCloseButton" onTouchTap={this._onTouchTapClose.bind(this)}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  /**
   * 閉じるボタン押下時のハンドラーです。
   */
  _onTouchTapClose() {
    // 閉じるボタン押下イベントを発火
    this.props.onTouchTapClose();
  }
}
