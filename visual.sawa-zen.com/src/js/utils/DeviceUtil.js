import * as THREE from 'three';
import MobileDetect from 'mobile-detect';

// UserAgent情報
const MD = new MobileDetect(window.navigator.userAgent);

/**
 * PCかどうかの真偽値を返します。
 */
export function isPC() {
  return !MD.mobile();
}

/**
 * SPかどうかの真偽値を返します。
 */
export function isSP() {
  return !!MD.mobile();
}

/**
 * 処理が重い端末かのどうかの真偽値を返します。
 */
export function isLasyDevice() {
  let pixelRatio = window.devicePixelRatio;

  if(isPC() && pixelRatio >= 2) {
    return true;
  }

  return false;
}

/**
 * PixelRatioを取得します。
 */
export function getPixelRatio() {
  let pixelRatio = Math.min(window.devicePixelRatio, 2);

  if(isLasyDevice()) {
    pixelRatio = 1;
  }

  return pixelRatio;
}

/**
 * WebGLが有効かどうかの真偽値を返却します。
 */
export function isWebGLEnabled() {
  try {
    let canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}
