import * as SHREE from 'shree';
const vertexShader = require('../shader/vertex.glsl');
const fragmentShader = require('../shader/fragment.glsl');

class Particles extends SHREE.Object3D {

  constructor() {
    super();

    this._material = new SHREE.Material({
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

    const geometry = new SHREE.Geometry();
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
    geometry.addAttribute('position', 3, position);
    geometry.addAttribute('seed', 1, seed);

    this._points = new SHREE.Points(geometry, this._material);
    this.add(this._points);
  }

  update() {
    this._points.rotation.y += 0.003;
    this._material.uniforms.time.value += 0.5;
  }
}

export default Particles;
