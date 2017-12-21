import * as THREE from 'three';
import _ from 'lodash';
import Particle from './Particle';
import Target from './Target';
import AnimationStore from '../../stores/AnimationStore';
import * as StringUtil from '../../utils/StringUtil';

/**
 * パーティクルエミッタークラス
 */
export default class ParticleEmitter extends THREE.Object3D {

  /** パーティクルの数 */
  static PARTICLE_NUM = 256;
  /** 中心点 */
  static CENTER_POINT = new THREE.Vector3();

  /** ターゲット */
  _target;
  /** パーティクル群 */
  _particles = [];
  /** シェーダーへ渡す値 */
  _uniforms = {
    uColor: { value: new THREE.Color(0xffffff) }
  };

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // ターゲット
    this._target = Target.instance;

    this._geometry = new THREE.Geometry();

    // // ATLの文字
    // this._atlStringData = StringUtil.getStringDotData('ATL');

    // パーティクルを数分生成
    _.times(ParticleEmitter.PARTICLE_NUM, (index) => {
      let particle = new Particle();
      particle.maxSpeed = index * 0.0005 + 1.6;
      particle.position.x = Math.random() * 100 - 50;
      particle.position.y = Math.random() * 100 - 50;
      particle.position.z = Math.random() * 100 - 50;
      let vertexIndex = index * 3;
      Array.prototype.push.apply(this._geometry.vertices, particle.getVertices());
      this._geometry.faces.push(new THREE.Face3(vertexIndex, vertexIndex+1, vertexIndex+2));
      this._particles.push(particle);
    });

    // メッシュを生成
    this._mesh = new THREE.Mesh(
      this._geometry,
      new THREE.RawShaderMaterial({
        vertexShader: `
          attribute vec3 position;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          precision mediump float;
          uniform vec3 uColor;
          void main() {
            gl_FragColor = vec4(uColor, 1.0);
          }
        `,
        uniforms: this._uniforms,
        wireframe: false,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading
      })
    );
    this.add(this._mesh);

    // マテリアルモードの変更を監視
    this._onChangeMaterialMode = this._onChangeMaterialMode.bind(this);
    AnimationStore.instance.on('changeMaterialMode', this._onChangeMaterialMode);
  }

  /**
   * 更新
   */
  update() {
    // ターゲットを更新
    this._target.update();

    // 各頂点を更新
    let length = this._particles.length;
    for(let index = 0; index < length; index++) {
      let particle = this._particles[index];
      this._animate(particle, index);
      let vertices = particle.getVertices();
      let vertexIndex = index * 3;
      this._geometry.vertices[vertexIndex].copy(vertices[0]);
      this._geometry.vertices[vertexIndex+1].copy(vertices[1]);
      this._geometry.vertices[vertexIndex+2].copy(vertices[2]);
    };
    this._geometry.verticesNeedUpdate = true;
  }

  /**
   * マテリアルをスイッチ時のハンドラーです。
   */
  _onChangeMaterialMode() {
    if(AnimationStore.instance.materialMode == 'normal') {
      this._mesh.material.wireframe = false;
      this._uniforms.uColor.value = new THREE.Color(1, 1, 1);
    } else {
      this._mesh.material.wireframe = true;
      this._uniforms.uColor.value = new THREE.Color(1, 0, 0);
    }
  }

  /**
   * アニメーション
   */
  _animate(particle, index) {
    _.each(AnimationStore.instance.playingTimelines, (timeline) => {
      switch(timeline.mode) {
        case 'flock': this._flock(particle, index); break;
        case 'rope': this._rope(particle, index); break;
        case 'center': this._center(particle, index); break;
        case 'brust': this._brust(particle, index); break;
        case 'plane': this._plane(particle, index); break;
      }
    });
    if(AnimationStore.instance.playingTimelines.length > 0) {
      particle.update();
    }
  }

  /**
   * 群体
   */
  _flock(particle, index) {
    particle.seek(this._target.position);
    particle.flock(this._particles);
  }

  /**
   * ロープ
   */
  _rope(particle, index) {
    let i = index - 1 >= 0 ? index - 1 : this._particles.length - 1;
    particle.seek(this._particles[i].position);
  }

  /**
   * センターに集合
   */
  _center(particle, index) {
    particle.seek(ParticleEmitter.CENTER_POINT);
    particle.arrive(ParticleEmitter.CENTER_POINT);
  }

  /**
   * プレートに集合
   */
  _plane(particle, index) {
    let point = new THREE.Vector3();
    let sqrt = Math.sqrt(this._particles.length);
    let half = Math.floor(sqrt / 2);
    point.x = (Math.floor(index / sqrt) - half) * 3;
    point.z = ((index % sqrt) - half) * 3;
    particle.arrive(point);
  }

  /**
   * 爆発
   */
  _brust(particle, index) {
    particle.flee(ParticleEmitter.CENTER_POINT);
  }
}
