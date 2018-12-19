import * as THREE from './three';
import Particles from './Particles';
import Stats from './Stats';

class MtcArt {
  _count = 0;

  get domElement() {
    return this._renderer.domElement;
  }

  constructor() {
    if (MtcArt.instance) {
      return MtcArt.instance;
    }

    // stats
    this._stats = new Stats();

    // レンダラー
    this._renderer = new THREE.WebGLRenderer({ antialias: false });
    this._renderer.setClearColor(0xFFFFFF, 1);
    this._renderer.setPixelRatio(1);

    // カメラ
    this._camera = new THREE.PerspectiveCamera(90);
    this._camera.position.y = 10;
    this._camera.position.z = 40;
    this._camera.rotation.x = -1;

    // シーン
    this._scene = new THREE.Scene();

    // パーティクル群
    this._particles = new Particles();
    this._scene.add(this._particles);

    // 描画開始
    this._render();

    MtcArt.instance = this;
    return this;
  }

  resize(w, h) {
    this._camera.aspect = w / h;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(w, h);
  }

  explosion(explosionNum) {
    this._particles.explosion(explosionNum);
  }

  dispose() {
    cancelAnimationFrame(this._animationFrameId);
    MtcArt.instance = null;
  }

  _render = () => {
    this._stats.begin();
    this._particles.update();
    this._renderer.render(this._scene, this._camera);
    this._stats.end();

    this._animationFrameId = requestAnimationFrame(this._render);
  };
}

export default MtcArt;
