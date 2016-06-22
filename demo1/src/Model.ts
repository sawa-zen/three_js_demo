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
    this._edgeMesh = new THREE.SkinnedMesh(geometry, this._createEdgeMaterial());
    this.add(this._edgeMesh);

    // ボーン
    let helper = new THREE.SkeletonHelper(this._mesh);
    //this.add(helper);

    // クロック
    this._clock = new THREE.Clock();

    // ミキサー
    this._mixer = new THREE.AnimationMixer(this._mesh);
    this._action.idle = this._mixer.clipAction(geometry.animations[0]);
    this._action.idle.setEffectiveWeight( 1 );
		this._action.idle.play();

    // ミキサー2
    this._mixer2 = new THREE.AnimationMixer(this._edgeMesh);
    this._action.idle2 = this._mixer.clipAction(geometry.animations[0]);
    this._action.idle2.setEffectiveWeight( 1 );
		this._action.idle2.play();
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
        // #ifdef USE_SKINNING
          // varying vec3 vViewPosition;
          varying vec3 vNormal;
          uniform mat4 bindMatrix;
          uniform mat4 bindMatrixInverse;
          // uniform mat4 boneMatrices[ MAX_BONES ];
          // mat4 getBoneMatrix( const in float i ) {
          //   mat4 bone = boneMatrices[ int(i) ];
          //   return bone;
          // }
        // #endif
        void main() {
          vUv = uv;
          // #ifdef USE_SKINNING
          //   mat4 boneMatX = getBoneMatrix( skinIndex.x );
          //   mat4 boneMatY = getBoneMatrix( skinIndex.y );
          //   mat4 boneMatZ = getBoneMatrix( skinIndex.z );
          //   mat4 boneMatW = getBoneMatrix( skinIndex.w );
          //   mat4 skinMatrix = mat4( 0.0 );
          //   skinMatrix += skinWeight.x * boneMatX;
          //   skinMatrix += skinWeight.y * boneMatY;
          //   skinMatrix += skinWeight.z * boneMatZ;
          //   skinMatrix += skinWeight.w * boneMatW;
          //   skinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;
          //   vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );
          //   vec3 objectNormal = skinnedNormal.xyz;
          //   vec3 transformedNormal = normalMatrix * objectNormal;
          //   vNormal = normalize( transformedNormal );
          //   vec4 skinVertex = bindMatrix * vec4( position, 1.0 );
          //   vec4 skinned = vec4( 0.0 );
          //   skinned += boneMatX * skinVertex * skinWeight.x;
          //   skinned += boneMatY * skinVertex * skinWeight.y;
          //   skinned += boneMatZ * skinVertex * skinWeight.z;
          //   skinned += boneMatW * skinVertex * skinWeight.w;
          //   skinned  = bindMatrixInverse * skinned;
          //   vec4 mvPosition = modelViewMatrix * skinned;
          // #else
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          // #endif
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec2 resolution;
        uniform float time;
        varying vec2 vUv;
        void main() {
          vec2 p = -1.0 + 2.0 * vUv;
          float a = time*40.0;
          float d,e,f,g=1.0/40.0,h,i,r,q;
          e=400.0*(p.x*0.5+0.5);
          f=400.0*(p.y*0.5+0.5);
          i=200.0+sin(e*g+a/150.0)*20.0;
          d=200.0+cos(f*g/2.0)*18.0+cos(e*g)*7.0;
          r=sqrt(pow(i-e,2.0)+pow(d-f,2.0));
          q=f/r;
          e=(r*cos(q))-a/2.0;f=(r*sin(q))-a/2.0;
          d=sin(e*g)*176.0+sin(e*g)*164.0+r;
          h=((f+d)+a/2.0)*g;
          i=cos(h+r*p.x/1.3)*(e+e+a)+cos(q*g*6.0)*(r+h/3.0);
          h=sin(f*g)*144.0-sin(e*g)*212.0*p.x;
          h=(h+(f-e)*q+sin(r-(a+h)/7.0)*10.0+i/4.0)*g;
          i+=cos(h*2.3*sin(a/350.0-q))*184.0*sin(q-(r*4.3+a/12.0)*g)+tan(r*g+h)*184.0*cos(r*g+h);
          i=mod(i/5.6,256.0)/64.0;
          if(i<0.0) i+=4.0;
          if(i>=2.0) i=4.0-i;
          d=r/350.0;
          d+=sin(d*d*8.0)*0.52;
          f=(sin(a*g)+1.0)/2.0;
          gl_FragColor=vec4(vec3(f*i/1.6,i/2.0+d/13.0,i)*d*p.x+vec3(i/1.3+d/8.0,i/2.0+d/18.0,i)*d*(1.0-p.x),1.0);
        }
      `,
      uniforms: {
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() }
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
