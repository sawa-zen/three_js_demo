import React from 'react';
import Modal from '../common/Modal';

/**
 * アバウトのモーダルクラス
 */
export default class AboutModal extends React.Component {

  /**
   * 描画
   */
  render() {
    return (
      <Modal className="AboutModal" {...this.props}>
        <h2>About</h2>
        <div className="AboutModalBody">
          <p>「ATL SHOWCASE」は毎回テーマを設定し、クリエイター様に作品を公開してもらうショーケースです。7月15日にはプロローグとして数点の作品を公開し、同時に第１回テーマを発表、皆様の応募作品を募集開始いたします。制作・開発にあたっては「<a className="AboutModalLink" href="http://atl.recruit-tech.co.jp/blog/4319/" target="_blank">ATL</a>」の環境や機材をふるってご活用ください。作品を通じて技術や知見が集い、触発や交流が産まれることを願っています。</p>
          <img src="./images/hiro_o_1.jpg" alt="ATL SHOWCASE 写真１" />
          <img src="./images/hiro_o_2.jpg" alt="ATL SHOWCASE 写真２" />
        </div>
      </Modal>
    );
  }
}
