import SpotLight from './SpotLight';

/**
 * 3Dモデルクラスです。
 */
export default class Model extends THREE.Object3D {

  /** Mesh */
  private _mesh:THREE.Mesh;
  /** 縁線Mesh */
  private _edgeMesh:THREE.Mesh;

  /**
   * コンストラクター
   * @constructor
   */
  constructor(geometry:THREE.Geometry, materials:Array<THREE.MeshBasicMaterial>) {
    super();

    // 本体
    this._mesh = new THREE.Mesh(geometry, this._createBodyMaterial(materials));
    this._mesh.castShadow = true;
    this._mesh.receiveShadow = true;
    this.add(this._mesh);

    // エッジ
    this._edgeMesh = new THREE.Mesh(geometry, this._createEdgeMaterial());
    this._edgeMesh.castShadow = true;
    this._edgeMesh.receiveShadow = true;
    this.add(this._edgeMesh);
  }

  /**
   * 本体用マテリアルを生成します。
   * @return THREE.ShaderMaterial
   */
  private _createBodyMaterial(materials:Array<THREE.MeshBasicMaterial>):THREE.MultiMaterial {
    let fixMaterials:Array<THREE.ShaderMaterial> = [];
    for (let i=0; i < materials.length; i++) {
      fixMaterials.push(this._createFaceMaterial(materials[i]));
    }
    return new THREE.MultiMaterial(fixMaterials);
  }

  /**
   * エッジ用マテリアルを生成します。
   * @return THREE.ShaderMaterial
   */
  private _createEdgeMaterial():THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      vertexShader: `
        void main(void) {
            vec3 pos = position;
            pos += normal * 0.05;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform vec4 edgeColor;
        void main(void) {
            gl_FragColor = edgeColor;
        }
      `,
      uniforms: {
        edgeColor: {
          type: 'v4',
          value: new THREE.Vector4(0, 0, 0, 0)
        },
      },
      side: THREE.BackSide
    });
  }

  /**
   * 表面マテリアルを生成します。
   * @return THREE.ShaderMaterial
   */
  private _createFaceMaterial(material:THREE.MeshBasicMaterial):THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec2 vUv;

        void main(void) {
          vec3 pos = position;
          vNormal = normal;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 lightDirection;
        uniform sampler2D map;
        uniform int mapEnable;
        uniform sampler2D toonTexture;
        uniform vec4 meshColor;

        varying vec3 vNormal;
        varying vec2 vUv;

        void main(void) {
          vec4 tColor;
          if(mapEnable == 1) {
            tColor = texture2D(map, vUv);
          } else {
            tColor = vec4(1.0, 1.0, 1.0, 1.0);
          }
          float diffuse = clamp(dot(vNormal, normalize(lightDirection)), 0.0, 1.0);
          vec4 smpColor = texture2D(toonTexture, vec2(diffuse, 0.0));
          gl_FragColor = meshColor * smpColor * tColor;
        }
      `,
      uniforms: {
        lightDirection: {
          type: 'v3',
          value: SpotLight.getInstance().position
        },
        toonTexture: {
          type: 't',
          value: THREE.ImageUtils.loadTexture('assets/texture/toon.png')
        },
        meshColor: {
          type: 'v4',
          value: new THREE.Vector4(material.color.r, material.color.g, material.color.b, 0)
        }
      }
    });
  }
}
