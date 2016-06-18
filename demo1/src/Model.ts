import SpotLight from './SpotLight';

/**
 * 3Dモデルクラスです。
 */
export default class Model extends THREE.Object3D {

  /** Mesh */
  private _mesh:THREE.SkinnedMesh;
  /** Mixer */
  private _mixer:THREE.AnimationMixer;
  /** count */
  private _clock:THREE.Clock;
  /** 縁線Mesh */
  private _edgeMesh:THREE.Mesh;
  /** アクション */
  private _action:any = {};

  /**
   * コンストラクター
   * @constructor
   */
  constructor(geometry:THREE.Geometry, materials:Array<THREE.MeshBasicMaterial>) {
    super();

    // 法線の狂いを修正
    geometry.computeVertexNormals();
    geometry.normalsNeedUpdate = true;

    materials.forEach(function(material) {
      material.skinning = true;
      console.info(material);
    });

    // 本体
    let m = this._createBodyMaterial(materials);
    //let m = new THREE.MeshFaceMaterial(materials);
    this._mesh = new THREE.SkinnedMesh(geometry, m);
    this.add(this._mesh);

    // エッジ
    //this._edgeMesh = new THREE.Mesh(geometry, this._createEdgeMaterial());
    //this.add(this._edgeMesh);

    // ボーン
    let helper = new THREE.SkeletonHelper(this._mesh);
    this.add(helper);

    // クロック
    this._clock = new THREE.Clock();

    // ミキサー
    this._mixer = new THREE.AnimationMixer(this._mesh);
    this._action.idle = this._mixer.clipAction(geometry.animations[0]);
    this._action.idle.setEffectiveWeight( 1 );
		this._action.idle.play();
  }

  /**
   * 本体用マテリアルを生成します。
   * @return THREE.ShaderMaterial
   */
  private _createBodyMaterial(materials:Array<THREE.MeshBasicMaterial>):THREE.MeshFaceMaterial {
    let fixMaterials:Array<THREE.ShaderMaterial> = [];
    for (let i=0; i < materials.length; i++) {
      let material:THREE.ShaderMaterial = this._createFaceMaterial(materials[i]);
      material.needsUpdate = true;
      material.skinning = true;
      fixMaterials.push(material);
    }
    return new THREE.MeshFaceMaterial(fixMaterials);
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
          value: new THREE.Vector4(0, 0, 0, 1)
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
          value: new THREE.Vector4(material.color.r, material.color.g, material.color.b, 1)
        }
      },
      skinning: true
    });
  }

  /**
   * フレーム毎のアニメーション
   */
  public update():void {
    var delta = this._clock.getDelta();
    var theta = this._clock.getElapsedTime();
    this._mixer.update(delta*5);
  }
}
