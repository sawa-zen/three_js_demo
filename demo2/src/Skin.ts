/**
 * スキンテストクラス
 */
export default class Skin extends THREE.Object3D {

  /** メッシュ */
  private _mesh:THREE.SkinnedMesh;
  /** ジオメトリ */
  private _geometry:THREE.CylinderGeometry;
  /** マテリアル */
  private _material:THREE.MeshPhongMaterial;
  /** スケルトン */
  private _skeleton:THREE.Skeleton;
  /** Boneリスト */
  private _bones:THREE.Bone[];

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();

    // ジオメトリ
    this._geometry = new THREE.CylinderGeometry(1, 1, 5, 3);

    // マテリアル
    this._material = new THREE.MeshPhongMaterial({
      color: 0xff00ff
    });

    // メッシュ
    this._mesh = new THREE.SkinnedMesh(
      this._geometry,
      this._material
    );
    this.add(this._mesh);

    // Boneリスト
    this._bones = this._createBone(this._mesh);
    // スケルトン
    this._skeleton = new THREE.Skeleton(this._bones);

    this._mesh.add(this._bones[0]);
    this._mesh.bind(this._skeleton);

    let skeletonHelper = new THREE.SkeletonHelper(this._mesh);
    this.add(skeletonHelper);
  }

  /**
   * Boneを生成します。
   */
  private _createBone(skinnedMesh:THREE.SkinnedMesh):THREE.Bone[] {
    let bones:THREE.Bone[] = [];

    var prevBone = new THREE.Bone(skinnedMesh);
    prevBone.position.y = 0;
    prevBone.rotation.z = 90 * Math.PI / 180;
    bones.push(prevBone);

    var bone = new THREE.Bone(skinnedMesh);
    bone.position.y = 1;
    bone.rotation.x = 90 * Math.PI / 180;
    bones.push( bone );
    prevBone.add( bone );
    //prevBone = bone;

    return bones;
  }

}
