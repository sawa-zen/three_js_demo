import React from 'react';
import classNames from 'classnames';

/**
 * ヘッダークラスです。
 */
export default class Header extends React.Component {

  /**
   * 描画
   */
  render() {
    let classes = classNames('Header', this.props.materialMode == 'wireframe' ? 'wireframe': null);
    return (
      <div className={classes}>
        <div className="HeaderBackground"></div>
        <div className="HeaderContent">
          <img className="HeaderLogo black"
            src="./images/logo_atlshowcase_black.svg"
            alt="ATL SHOWCASE" />
          <img className="HeaderLogo white"
            src="./images/logo_atlshowcase_white.svg"
            alt="ATL SHOWCASE" />
          <button className="HeaderButton" onTouchTap={this.props.onTouchTap}>
            <span className="HeaderButtonText">About</span>
          </button>
        </div>
      </div>
    );
  }
}
