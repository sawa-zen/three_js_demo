/** テキストの便利ツール群 */

/**
 * 文字列のドット情報を作成します。
 * @returns {Array}
 */
export function getStringDotData(string = '', option = {}) {
  // ドットデータ
  let dotDataList = [];

  // 文字列分ドットデータを生成
  let length = string.length;
  for (let index = 0; index <= length; index++) {
    dotDataList.push(getCharacterDotData(string.charAt(index)));
  }

  return dotDataList;
}

/**
 * 一文字分のドット情報を取得します。
 * @returns {Array}
 */
export function getCharacterDotData(character, option = {}) {
  // 解像度
  const SIZE_W = 24;
  const SIZE_H = 36;

  // キャンバスを生成
  let canvas  = document.createElement('canvas');
  canvas.width  = SIZE_W;
  canvas.height = SIZE_H;

  // キャンバスへ数字を描画
  let ctx = canvas.getContext('2d');
  ctx.font = '32px Arial Black';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(character.toString(), SIZE_W / 2, SIZE_H / 2);

  // キャンバスの画像情報を取得
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // 縦横の画像ドットをbooleanで格納
  let dotData = [];
  for (let y = 0; y < imgData.height; y++) {
    dotData[y] = [];
    for (let x = 0; x < imgData.width; x++) {
      // アルファ成分
      let a = imgData.data[3 + x * 4 + y * imgData.width * 4];
      // 真偽値で保存 (透過していない部分は true )
      dotData[y][x] = (a !== 0);
    }
  }


  // -----------------------------
  // デバッグ用コード
  // -----------------------------
  let str = '';
  dotData.map((imageArr1, x) => {
    imageArr1.map((value, y) => {
      if (value === true) {
        str += '🌠';
      } else {
        str += '✨';
      }
    });
    str += '\n';
  });

  // デバッグ出力
  console.log(str);

  return dotData;
}
