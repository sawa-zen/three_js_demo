import * as THREE from '../three';
const vertexShader = require('../shader/vertex.glsl');
const fragmentShader = require('../shader/fragment.glsl');

class Particles extends THREE.Object3D {

  constructor() {
    super();

    this._material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: {
          type: 'f',
          value: 0,
        }
      },
      transparent: true
    });

    const geometry = new THREE.BufferGeometry();
    const position = [];
    const seed = [];
    const absolute = 90;
    for (let z = -absolute; z < absolute; z++) {
      for (let x = -absolute; x < absolute; x++) {
        position.push(x); // x
        position.push(0); // y
        position.push(z); // z
        seed.push(z + x);
      }
    }
    geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(position), 3));
    geometry.addAttribute('seed', new THREE.BufferAttribute(new Float32Array(seed), 1));

    this._points = new THREE.Points(geometry, this._material);
    this.add(this._points);
  }

  update() {
    this._points.rotation.y += 0.003;
    this._material.uniforms.time.value += 0.5;
  }
}

export default Particles;
