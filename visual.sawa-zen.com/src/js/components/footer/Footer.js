import React from 'react';

/**
 * フッタークラスです。
 */
export default class Footer extends React.Component {

  /**
   * 描画
   */
  render() {
    let url = encodeURIComponent('http://atl.recruit-tech.co.jp/showcase/');
    let twitterMessage = encodeURIComponent('VR,IoT,モーキャプ等の作品が7/15公開予定');
    let twitterHashtag = encodeURIComponent('ATL広尾,ATLショーケース');
    let lineMesssage = `${encodeURIComponent('VRやIoT等の機器を活用した作品紹介予定')} ${url}`;

    return (
      <div className="Footer">
        <div className="FooterCorp">
          <img src="images/rtech_logo_white.png" width="238" height="28" alt="Recruit Technologies Co.,Ltd."/>
        </div>
        <ul className="share">
          <li className="twitter">
            <a href={`https://twitter.com/share?url=${url}&text=${twitterMessage}&hashtags=${twitterHashtag}`} target="_blank">
              <img src="images/share/twitter_logo.png" width="30" height="30" alt="Twitterでシェア"/>
            </a>
          </li>
          <li className="facebook">
            <a href={`https://www.facebook.com/share.php?u=${url}`} target="_blank">
              <img src="images/share/facebook_logo.png" width="30" height="30" alt="facebookでシェア"/>
            </a>
          </li>
          <li className="hatena">
            <a href={`http://b.hatena.ne.jp/entry/${url}`} className="hatena-bookmark-button" data-hatena-bookmark-layout="simple" target="_blank">
              <img src="images/share/hatena_logo.png" width="30" height="30" alt="はてブに追加"/>
            </a>
            <script type="text/javascript" src="https://b.st-hatena.com/js/bookmark_button.js" charSet="utf-8" async="async"></script>
          </li>
          <li className="line">
            <a href={`http://line.me/R/msg/text/?${lineMesssage}`} target="_blank">
              <img src="images/share/line_logo.png" width="30" height="30"  alt="LINEでシェア"/>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

