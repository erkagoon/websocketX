import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ModelsConfig } from "./ModelsConfig.js";
class ModelsManager {
	conslog = true;
	_LOADER;
	_scene;
	_MeshDatasList;
	allMeshsAndDatas = {};
	mixers = [];
	allFbx = [];
	constructor(datas) {

		this._fonctionretour = datas.fonctionretour;

		this._LOADER = new GLTFLoader();
		this.ModelsConfig = new ModelsConfig();
		this._Init();
	}

	async _Init() {
		this._MeshDatasList = this.ModelsConfig.config;

		await this.LoadModelsFrom_list();
		const allModelsAndAnimations = this.AddModelsToSceneWithDefaultAnimation();
		this._fonctionretour(allModelsAndAnimations); // Call your callback function with loaded data
	}

	async LoadModelsFrom_list() {
		const indexedMeshs = [];
		for (const key in this._MeshDatasList) {
			if (this._MeshDatasList.hasOwnProperty.call(this._MeshDatasList, key)) {
				const meshAndDatas = this._MeshDatasList[key];
				indexedMeshs.push(this._LoadModel(meshAndDatas));
			}
		}
		await Promise.all(indexedMeshs);
	}

	async _LoadModel(meshAndDatas) {
		let positions = meshAndDatas.positions;
		let rotations = meshAndDatas.rotations;
		let scales = meshAndDatas.scales;
		let category = meshAndDatas.category;
		if (typeof meshAndDatas.path === "string") {
			await new Promise((resolve) => {
				this._LOADER.load(meshAndDatas.path, (gltf) => {
					gltf.scene.traverse((c) => (c.castShadow = true));
					if (positions) {
						gltf.scene.position.set(positions.x, positions.y, positions.z);
					}
					if (rotations) {
						if (rotations.x) gltf.scene.rotation.x = rotations.x;
						if (rotations.y) gltf.scene.rotation.y = rotations.y;
						if (rotations.z) gltf.scene.rotation.z = rotations.z;
					}
					if (scales) {
						if (scales.x) gltf.scene.scale.x = scales.x;
						if (scales.y) gltf.scene.scale.y = scales.y;
						if (scales.z) gltf.scene.scale.z = scales.z;
					}

					if (typeof this.allMeshsAndDatas[category] === "undefined") {
						this.allMeshsAndDatas[category] = {};
					}
					this.allMeshsAndDatas[category][meshAndDatas.name] = {
						mesh: gltf.scene,
						conf: meshAndDatas,
						gltf: gltf,
					};

					resolve();
				});
			});
		}
	}

	AddModelsToSceneWithDefaultAnimation() {
		for (const key in this.allMeshsAndDatas) {
			if (this.allMeshsAndDatas.hasOwnProperty(key)) {
				const category = this.allMeshsAndDatas[key];
				for (const modelKey in category) {
					if (category.hasOwnProperty(modelKey)) {
						const model = category[modelKey];
						// this._scene.add(model.mesh);
					}
				}
			}
		}
		return this.allMeshsAndDatas;
	}


}
export { ModelsManager };
