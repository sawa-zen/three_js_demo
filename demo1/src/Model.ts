import SpotLight from './SpotLight';

/**
 * 3Dモデルクラスです。
 */
export default class Model extends THREE.Object3D {

  /** Mesh */
  private _mesh:THREE.SkinnedMesh;
  /** Mixer */
  private _mixer:THREE.AnimationMixer;
  /** Mixer2 */
  private _mixer2:THREE.AnimationMixer;
  /** helper */
  private _helper:THREE.SkeletonHelper;
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

    // 本体
    let m = this._createBodyMaterial(materials);
    this._mesh = new THREE.SkinnedMesh(geometry, m, false);
    this.add(this._mesh);

    // エッジ
    this._edgeMesh = new THREE.SkinnedMesh(geometry, this._createEdgeMaterial(), false);
    this.add(this._edgeMesh);

    // ボーン
    this._helper = new THREE.SkeletonHelper(this._mesh);
    this.add(this._helper);

    // クロック
    this._clock = new THREE.Clock();

    // ミキサー
    this._mixer = new THREE.AnimationMixer(this._mesh);
    this._action.idle = this._mixer.clipAction(geometry.animations[0]);
    this._action.idle.setEffectiveWeight( 1 );

    // ミキサー2
    this._mixer2 = new THREE.AnimationMixer(this._edgeMesh);
    this._action.idle2 = this._mixer2.clipAction(geometry.animations[0]);
    this._action.idle2.setEffectiveWeight( 1 );
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
        #ifdef USE_SKINNING
          uniform mat4 bindMatrix;
          uniform mat4 bindMatrixInverse;
          uniform mat4 boneMatrices[MAX_BONES];
          mat4 getBoneMatrix( const in float i ) {
            mat4 bone = boneMatrices[ int(i) ];
            return bone;
          }
        #endif
        void main() {
          vec3 pos = position + normal * 0.05;
          #ifdef USE_SKINNING
            mat4 boneMatX = getBoneMatrix( skinIndex.x );
            mat4 boneMatY = getBoneMatrix( skinIndex.y );
            mat4 boneMatZ = getBoneMatrix( skinIndex.z );
            mat4 boneMatW = getBoneMatrix( skinIndex.w );
            mat4 skinMatrix = mat4( 0.0 );
            skinMatrix += skinWeight.x * boneMatX;
            skinMatrix += skinWeight.y * boneMatY;
            skinMatrix += skinWeight.z * boneMatZ;
            skinMatrix += skinWeight.w * boneMatW;
            skinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;
            vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );
            vec3 objectNormal = skinnedNormal.xyz;
            vec3 transformedNormal = normalMatrix * objectNormal;
            vec4 skinVertex = bindMatrix * vec4( pos, 1.0 );
            vec4 skinned = vec4( 0.0 );
            skinned += boneMatX * skinVertex * skinWeight.x;
            skinned += boneMatY * skinVertex * skinWeight.y;
            skinned += boneMatZ * skinVertex * skinWeight.z;
            skinned += boneMatW * skinVertex * skinWeight.w;
            skinned  = bindMatrixInverse * skinned;
            vec4 mvPosition = modelViewMatrix * skinned;
          #else
            vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
          #endif
          gl_Position = projectionMatrix * mvPosition;
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
      side: THREE.BackSide,
      skinning: true
    });
  }

  /**
   * 表面マテリアルを生成します。
   * @return THREE.ShaderMaterial
   */
  private _createFaceMaterial(material:THREE.MeshBasicMaterial):THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        #ifdef USE_SKINNING
          uniform mat4 bindMatrix;
          uniform mat4 bindMatrixInverse;
          uniform mat4 boneMatrices[MAX_BONES];
          mat4 getBoneMatrix( const in float i ) {
            mat4 bone = boneMatrices[ int(i) ];
            return bone;
          }
        #endif
        void main() {
          vUv = uv;
          vec3 pos = position;
          vNormal = normal;
          #ifdef USE_SKINNING
            mat4 boneMatX = getBoneMatrix( skinIndex.x );
            mat4 boneMatY = getBoneMatrix( skinIndex.y );
            mat4 boneMatZ = getBoneMatrix( skinIndex.z );
            mat4 boneMatW = getBoneMatrix( skinIndex.w );
            mat4 skinMatrix = mat4( 0.0 );
            skinMatrix += skinWeight.x * boneMatX;
            skinMatrix += skinWeight.y * boneMatY;
            skinMatrix += skinWeight.z * boneMatZ;
            skinMatrix += skinWeight.w * boneMatW;
            skinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;
            vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );
            vec3 objectNormal = skinnedNormal.xyz;
            vec3 transformedNormal = normalMatrix * objectNormal;
            vNormal = normalize( transformedNormal );
            vec4 skinVertex = bindMatrix * vec4( pos, 1.0 );
            vec4 skinned = vec4( 0.0 );
            skinned += boneMatX * skinVertex * skinWeight.x;
            skinned += boneMatY * skinVertex * skinWeight.y;
            skinned += boneMatZ * skinVertex * skinWeight.z;
            skinned += boneMatW * skinVertex * skinWeight.w;
            skinned  = bindMatrixInverse * skinned;
            vec4 mvPosition = modelViewMatrix * skinned;
          #else
            vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
          #endif
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 lightDirection;
        uniform sampler2D map;
        uniform sampler2D toonTexture;
        uniform vec4 meshColor;
        varying vec3 vNormal;
        varying vec2 vUv;
        void main() {
          vec4 tColor;
          tColor = texture2D(map, vUv);
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
        map: {
          type: 't',
          value: THREE.ImageUtils.loadTexture('assets/json/zensuke.png')
        },
        meshColor: {
          type: 'v4',
          value: new THREE.Vector4(material.color.r, material.color.g, material.color.b, 1)
        },
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() }
      }
    });
  }

  /**
   * フレーム毎のアニメーション
   */
  public update():void {
    let delta = this._clock.getDelta();
    let theta = this._clock.getElapsedTime();
    this._helper.update();
    this._mixer.update(delta);
    this._mixer2.update(delta);
  }

  /**
   * アニメーションを開始させる
   */
  public play():void {
		this._action.idle.play();
		this._action.idle2.play();
  }

  /**
   * アニメーションを停止させる
   */
  public stop():void {
		this._action.idle.stop();
		this._action.idle2.stop();
  }
}
