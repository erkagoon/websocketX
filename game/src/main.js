import * as THREE from "three";
import { GameConfig } from "./class/GameConfig.js";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


window.addEventListener("DOMContentLoaded", () => {
	let ok = false;

	if (typeof GameConfig === "function" && typeof THREE === "object") {
		document.getElementById("diverreur").remove();

		const gameConfig = new GameConfig();
		const sunConfig = gameConfig.lights.sunConfig;
		const cameraConfig = gameConfig.cameras.cameraConfig;

		console.log("🤍 sunConfig:", sunConfig);
		console.log("🤍 cameraConfig:", cameraConfig);

		const scene = new THREE.Scene();

		// le SOLEIL
		let soleil = new THREE.DirectionalLight(sunConfig.color, sunConfig.power);
		soleil.position.set(
			sunConfig.position.x,
			sunConfig.position.y,
			sunConfig.position.z
		);
		soleil.castShadow = true;
		soleil.shadow.bias = -0.001;

		soleil.shadow.mapSize.width = 2048;
		soleil.shadow.mapSize.height = 2048;
		soleil.shadow.camera.near = 0.5;
		soleil.shadow.camera.far = 500.0;
		soleil.shadow.camera.left = 100;
		soleil.shadow.camera.right = -100;
		soleil.shadow.camera.top = 100;
		soleil.shadow.camera.bottom = -100;

		// une lumière d'ambiance
		const ambiance = new THREE.AmbientLight(0xffffFF, 0.4);

		const bg1 = new THREE.BoxGeometry(1, 1, 1);
		const bm1 = new THREE.MeshPhongMaterial({ color: 0xff0000 });
		const boxMesh1 = new THREE.Mesh(bg1, bm1);
		boxMesh1.castShadow = true;
		boxMesh1.receiveShadow = true;
		boxMesh1.position.x = -2;
		boxMesh1.position.y = 0;
		boxMesh1.position.z = 2;

		const bg2 = new THREE.BoxGeometry(1, 1, 1);
		const bm2 = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
		const boxMesh2 = new THREE.Mesh(bg2, bm2);
		boxMesh2.castShadow = true;
		boxMesh2.receiveShadow = true;
		boxMesh2.position.x = 0;
		boxMesh2.position.y = 0;
		boxMesh2.position.z = 0.5;

		const bg3 = new THREE.BoxGeometry(1, 1, 1);
		const bm3 = new THREE.MeshPhongMaterial({ color: 0x0000ff });
		const boxMesh3 = new THREE.Mesh(bg3, bm3);
		boxMesh3.castShadow = true;
		boxMesh3.receiveShadow = true;
		boxMesh3.position.x = 2;
		boxMesh3.position.y = 0;
		boxMesh3.position.z = 2;

		// Le Sol - The Floor
		const groundGeometry = new THREE.BoxGeometry(9, 9, 0.5);
		const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xfafafa });
		const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
		groundMesh.receiveShadow = true;
		groundMesh.position.z = 0.5;

		// la camera
		let camera = new THREE.PerspectiveCamera(
			cameraConfig.fov,
			cameraConfig.aspect,
			cameraConfig.near,
			cameraConfig.far
		);
		camera.position.x = cameraConfig.position.x;
		camera.position.y = cameraConfig.position.y;
		camera.position.z = cameraConfig.position.z;

		function set_CameraFollow(posV3) {
			camera.position.x = cameraConfig.position.x = posV3.x;
			camera.position.y = cameraConfig.position.y = posV3.y;
		}
		function set_CameraLookAt(posV3) {
			cameraConfig.lookAt = posV3;
			camera.lookAt(posV3);
		}
		set_CameraLookAt(boxMesh2.position);
		set_CameraFollow(boxMesh2.position);

		scene.add(boxMesh1);
		scene.add(boxMesh2);
		scene.add(boxMesh3);
		scene.add(groundMesh);
		scene.add(ambiance);
		scene.add(soleil);
		// pas de scene.add(camera) ici mais plutot dans le renderer

		// le RENDERER (le canvas)
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		// renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.shadowMap.enabled = true;
		renderer.setPixelRatio(window.devicePixelRatio);

		document.body.appendChild(renderer.domElement);

		if (!typeof THREE.OrbitControls === "undefined") {
			console.log("🤍 OrbitControls defined:");
			// Pas d'OrbitControls pour l'instant
			// todo Import qui marche ,(
			const controls = new THREE.OrbitControls(camera, renderer.domElement);
		} else {
			console.log(
				"💀 export 'OrbitControls' (imported as 'THREE') was not found in 'three"
			);
		}

		// Objet pour stocker l'état des touches
		const keys = {};

		// Vitesse de déplacement du cube vert
		const deplacementCube = 0.1;

		function handleKeydown(event) {
			keys[event.key] = true;

			// Déplacer le cube vert en fonction des touches
			if (keys.ArrowUp) {
				boxMesh2.position.y += deplacementCube;
			}
			if (keys.ArrowDown) {
				boxMesh2.position.y -= deplacementCube;
			}
			if (keys.ArrowLeft) {
				boxMesh2.position.x -= deplacementCube;
			}
			if (keys.ArrowRight) {
				boxMesh2.position.x += deplacementCube;
			}

			// // Déplacement du cube vert avec les touches Q, S, D, Z
			if (keys.KeyW) {
				boxMesh2.position.z -= deplacementCube;
			}
			if (keys.KeyS) {
				boxMesh2.position.z += deplacementCube;
			}
			if (keys.KeyA) {
				boxMesh2.position.x -= deplacementCube;
			}
			if (keys.KeyD) {
				boxMesh2.position.x += deplacementCube;
			}
		}

		function handleKeyup(event) {
			keys[event.key] = false;
		}

		window.addEventListener("keydown", handleKeydown);
		window.addEventListener("keyup", handleKeyup);

		function animate() {
			requestAnimationFrame(animate);

			const vitesseDeRotation = 0.02;

			boxMesh1.rotation.x += vitesseDeRotation;
			// boxMesh2.rotation.y += vitesseDeRotation;
			boxMesh3.rotation.z += vitesseDeRotation;
			cameraConfig.lookAt = boxMesh2.position;
			// set_CameraLookAt(boxMesh2.position);
			set_CameraFollow(boxMesh2.position);
			camera.updateProjectionMatrix();

			// si OrbitControls marche
			if (typeof controls != "undefined") controls.update();
			renderer.render(scene, camera);
		}
		animate();

		window.addEventListener("resize", onWindowResize);

		function onWindowResize() {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		}
	}
});
