import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { GameConfig } from "./class/GameConfig.js";
import { ModelsManager } from "./class/scene/ModelsManager.js";
import { KeyboardManager } from "./class/scene/KeyboardManager.js";

class gameCore {
	canvasId = 'game';
	ModelsManager = null;
	KeyboardManager = null;
	constructor() {
		this.init();
	}
	init() {
		this.gameConfig = new GameConfig(); // Config
		this.sunConfig = this.gameConfig.lights.sunConfig;
		this.cameraConfig = this.gameConfig.cameras.cameraConfig;
		this.Phase_1();
	}
	checkKeyboard = () => {
		let vitesse = 0.02
		if (this.KeyboardManager.left) this.boxMesh2.position.x -= vitesse;
		if (this.KeyboardManager.right) this.boxMesh2.position.x += vitesse;
		if (this.KeyboardManager.backward) this.boxMesh2.position.y -= vitesse;
		if (this.KeyboardManager.forward) this.boxMesh2.position.y += vitesse;
	}
	animate = () => {
		requestAnimationFrame(this.animate);


		this.checkKeyboard()
		
		// si OrbitControls marche
		if (typeof controls != "undefined") controls.update();
		this.camera.updateProjectionMatrix();
		this.renderer.render(this.scene, this.camera);
	};
	Phase_1() {
		// MODEL MANAGER
		this.ModelsManager = new ModelsManager({
			fonctionretour: (allModelsAndAnimations) => {
				this.allModels = allModelsAndAnimations;
				this.Phase_2();
			},
		});
	}
	Phase_2() {
		this.scene = new THREE.Scene(); // scene
		this.set_basics();
		this.add_basicsToScene();
		this.set_Renderer();
		document.body.appendChild(this.renderer.domElement);

		// set_CameraLookAt(this.boxMesh2.position);
		// set_CameraFollow(this.boxMesh2.position);

		document.getElementById("diverreur").textContent = "en cours";
		document.getElementById("diverreur").remove();
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.KeyboardManager = new KeyboardManager();

		this.animate();


		window.addEventListener("resize", this.onWindowResize);
	}

	// -----------------------------------------------------------
	onWindowResize = () => {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	};
	set_Renderer() {
		// le RENDERER (le canvas)
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		// this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.shadowMap.enabled = true;
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.domElement.id = this.canvasId
	}
	set_basics() {
		// la camera
		this.camera = new THREE.PerspectiveCamera(
			this.cameraConfig.fov,
			this.cameraConfig.aspect,
			this.cameraConfig.near,
			this.cameraConfig.far
		);
		this.camera.position.x = this.cameraConfig.position.x;
		this.camera.position.y = this.cameraConfig.position.y;
		this.camera.position.z = this.cameraConfig.position.z;

		// le SOLEIL
		this.soleil = new THREE.DirectionalLight(
			this.sunConfig.color,
			this.sunConfig.power
		);
		this.soleil.position.set(
			this.sunConfig.position.x,
			this.sunConfig.position.y,
			this.sunConfig.position.z
		);
		this.soleil.castShadow = true;
		this.soleil.shadow.bias = -0.001;

		this.soleil.shadow.mapSize.width = 2048;
		this.soleil.shadow.mapSize.height = 2048;
		this.soleil.shadow.camera.near = 0.5;
		this.soleil.shadow.camera.far = 500.0;
		this.soleil.shadow.camera.left = 100;
		this.soleil.shadow.camera.right = -100;
		this.soleil.shadow.camera.top = 100;
		this.soleil.shadow.camera.bottom = -100;

		// une lumière d'ambiance
		this.ambiance = new THREE.AmbientLight(0xffffff, 0.4);

		// cubes
		this.boxMesh2 = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.MeshPhongMaterial({ color: 0x00ff00 })
		);
		this.boxMesh2.castShadow = true;
		this.boxMesh2.receiveShadow = true;
		this.boxMesh2.position.x = 0;
		this.boxMesh2.position.y = 0;
		this.boxMesh2.position.z = 0.5;

		// Le Sol - The Floor
		this.groundMesh = new THREE.Mesh(
			new THREE.BoxGeometry(9, 9, 0.5),
			new THREE.MeshPhongMaterial({ color: 0xfafafa })
		);
		this.groundMesh.receiveShadow = true;
		this.groundMesh.position.z = -0.5;
	}
	add_basicsToScene() {
		this.scene.add(this.boxMesh2);
		this.scene.add(this.groundMesh);
		this.scene.add(this.ambiance);
		this.scene.add(this.soleil);
	}
	set_CameraFollow(posV3) {
		this.camera.position.x = this.cameraConfig.position.x = posV3.x;
		this.camera.position.y = this.cameraConfig.position.y = posV3.y;
		if (typeof controls != "undefined") controls.update();
	}
	// set_CameraLookAt(posV3) {
	// 	this.cameraConfig.lookAt = posV3;
	// 	this.camera.lookAt(posV3);
	// }
}
window.addEventListener("DOMContentLoaded", () => {
	let gamecore = new gameCore();
});
