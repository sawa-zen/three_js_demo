import * as SHREE from 'shree';
import Particles from './Particles';
import Stats from './Stats';

class Points {
  _count = 0;

  get domElement() {
    return this._renderer.domElement;
  }

  constructor() {
    // stats
    this._stats = new Stats();

    // レンダラー
    this._renderer = new SHREE.Renderer({ antialias: false });
    this._renderer.clearColor = [1.0, 1.0, 1.0, 1.0];
    this._renderer.pixelRatio = 1;

    // カメラ
    this._camera = new SHREE.Camera();
    this._camera.position.y = 10;
    this._camera.position.z = 40;
    this._camera.rotation.x = -1;

    // シーン
    this._scene = new SHREE.Scene();

    // パーティクル群
    this._particles = new Particles();
    this._scene.add(this._particles);

    // 描画開始
    this._render();
  }

  resize(w, h) {
    this._renderer.setSize(w, h);
  }

  _render = () => {
    this._stats.begin();
    this._particles.update();
    this._renderer.render(this._scene, this._camera);
    this._stats.end();

    requestAnimationFrame(this._render);
  };
}

export default Points;
