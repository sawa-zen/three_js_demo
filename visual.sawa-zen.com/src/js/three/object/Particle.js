import * as THREE from 'three';
import Viecle from './Viecle';
import _ from 'lodash';

/**
 * パーティクルクラス
 */
export default class Particle extends Viecle {

  /** 大きさ */
  _size = Math.random() * 0.3 + 0.5;
  /** ジオメトリ */
  _geometry = new THREE.Geometry();

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // パーティクルとの距離
    this._tooCloseDist = 5;
    // 視界の奥行き
    this._inSightDist = 20;
    // 回転スピード
    this._rotateSpeed = Math.random() * 0.1 + 0.05;
    // 最高スピード
    this._maxSpeed = 1.5;

    // 三角ポリゴンジオメトリ
    this._geometry.vertices.push(
      new THREE.Vector3(-this._size, -this._size, 0),
      new THREE.Vector3( this._size, -this._size, 0),
      new THREE.Vector3( this._size,  this._size, 0)
    );
  }

  /**
   * 弾けます
   */
  brust() {
    // 中心点から離します
    this.flee(Viecle.ZERO_VECTOR);
  }

  /**
   * 群行動
   */
  flock(particles) {
    let averageVelocity = this._velocity.clone();
    let averagePosition = new THREE.Vector3();
    let inSightCount = 0;

    // パーティクルの数分行う
    let length = particles.length;
    for(let index = 0; index < length; index++) {
      let particle = particles[index];
      // 自分以外の視野内のparticleであれば計算する
      if(this != particle && this.inSight(particle)) {
        averageVelocity.add(particle.velocity);
        averagePosition.add(particle.position);
        // 近づき過ぎていれば遠ざける
        if(this.tooClose(particle)) { this.flee(particle.position) }
        inSightCount++;
      }
    }

    if(inSightCount > 0) {
      averageVelocity.divideScalar(inSightCount);
      averagePosition.divideScalar(inSightCount);
      this.seek(averagePosition);
      this._steeringForce.add(averageVelocity.sub(this._velocity));
    }
  }

  /**
   * 渡されたパーティクルが視界に入っているかの真偽値を返します。
   */
  inSight(particle) {
    if(this._position.distanceTo(particle.position) > this._inSightDist) {
      return false;
    }
    let difference = particle.position.clone().sub(this._position);
    let dotProd = difference.dot(this._velocity);
    if(dotProd < 0) {
      return false;
    }
    return true;
  }

  /**
   * 渡されたパーティクルが範囲内に入っているかの真偽値を返します。
   */
  tooClose(particle) {
    return this._position.distanceTo(particle.position) < this._tooCloseDist;
  }

  /**
   * 更新
   */
  update() {
    super.update();

    this._geometry.rotateX(Math.PI / 20 * Math.random());
    this._geometry.rotateZ(Math.PI / 20 * Math.random());
  }

  /**
   * ジオメトリの頂点配列を取得します。
   */
  getVertices() {
    return [
      this._geometry.vertices[0].clone().add(this.position),
      this._geometry.vertices[1].clone().add(this.position),
      this._geometry.vertices[2].clone().add(this.position)
    ];
  }
}
