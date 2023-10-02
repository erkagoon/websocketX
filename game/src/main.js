import * as THREE from "three";
// import { GameConfig } from "./class/GameConfig.js";
// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
// import * as OrbitControls from "three/examples/jsm/controls/OrbitControls.js";
// import {OrbitControls} from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";

window.addEventListener("DOMContentLoaded", () => {
	document.getElementById("diverreur").remove();

	// const scene = new THREE.Scene();
	// const GameConfig = new GameConfig();
	// const sunConfig = GameConfig.lights.sunConfig;
	// console.log(sunConfig);
	// le SOLEIL
	// let soleil = new THREE.DirectionalLight(sunConfig.color, sunConfig.power);
	// soleil.position.set(
	// 	sunConfig.position.x,
	// 	sunConfig.position.y,
	// 	sunConfig.position.z
	// );

	// soleil.castShadow = true;
	// soleil.shadow.bias = -0.001;

	// soleil.shadow.mapSize.width = 2048;
	// soleil.shadow.mapSize.height = 2048;
	// soleil.shadow.camera.near = 0.5;
	// soleil.shadow.camera.far = 500.0;
	// soleil.shadow.camera.left = 100;
	// soleil.shadow.camera.right = -100;
	// soleil.shadow.camera.top = 100;
	// soleil.shadow.camera.bottom = -100;
	// soleil.direction = { x: 0, y: 0, z: 0 };
	// scene.add(soleil);

	// // une lumière d'ambiance
	// const ambiance = new THREE.AmbientLight(0xffffff, 0.3);
	// scene.add(ambiance);

	// // la camera
	// const camera = new THREE.PerspectiveCamera(
	// 	75,
	// 	window.innerWidth / window.innerHeight,
	// 	0.1,
	// 	1000
	// );
	// camera.position.x = 0;
	// camera.position.y = 0;
	// camera.position.z = 10;

	// // le RENDERER ou le canvas
	// const renderer = new THREE.WebGLRenderer({ antialias: true });
	// renderer.setSize(window.innerWidth, window.innerHeight);
	// // renderer.outputEncoding = THREE.sRGBEncoding;
	// renderer.shadowMap.enabled = true;
	// renderer.setPixelRatio(window.devicePixelRatio);

	// document.body.appendChild(renderer.domElement);

	// Pas d'OrbitControls our l'instant
	// todo Import qui marche ,(
	// const controls = new THREE.OrbitControls(camera, renderer.domElement);


	// const bg1 = new THREE.BoxGeometry(1, 1, 1);
	// const bm1 = new THREE.MeshPhongMaterial({ color: 0xff0000 });
	// const boxMesh1 = new THREE.Mesh(bg1, bm1);
	// boxMesh1.castShadow = true;
	// boxMesh1.position.x = -2;
	// boxMesh1.position.y = 0;
	// boxMesh1.position.z = 2;
	// scene.add(boxMesh1);

	// const bg2 = new THREE.BoxGeometry(1, 1, 1);
	// const bm2 = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
	// const boxMesh2 = new THREE.Mesh(bg2, bm2);
	// boxMesh2.castShadow = true;
	// boxMesh2.position.x = 0;
	// boxMesh2.position.y = 0;
	// boxMesh2.position.z = 2;
	// scene.add(boxMesh2);

	// const bg3 = new THREE.BoxGeometry(1, 1, 1);
	// const bm3 = new THREE.MeshPhongMaterial({ color: 0x0000ff });
	// const boxMesh3 = new THREE.Mesh(bg3, bm3);
	// boxMesh3.castShadow = true;
	// boxMesh3.position.x = 2;
	// boxMesh3.position.y = 0;
	// boxMesh3.position.z = 2;
	// scene.add(boxMesh3);

	// const groundGeometry = new THREE.BoxGeometry(9, 9, 0.5);
	// const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xfafafa });
	// const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
	// groundMesh.receiveShadow = true;
	// groundMesh.position.z = -2;

	// scene.add(groundMesh);

	// function animate() {
	// 	requestAnimationFrame(animate);
	// 	const vitesseDeRotation = 0.02;
	// 	boxMesh1.rotation.x += vitesseDeRotation;
	// 	boxMesh2.rotation.y += vitesseDeRotation;
	// 	boxMesh3.rotation.z += vitesseDeRotation;
	// 	camera.aspect = window.innerWidth / window.innerHeight;
	// 	camera.updateProjectionMatrix();
	// 	// controls.update();
	// 	renderer.render(scene, camera);
	// }

	// // Objet pour stocker l'état des touches
	// const keys = {};

	// // Vitesse de déplacement du cube vert
	// const deplacementCube = 0.1;

	// function handleKeydown(event) {
	// 	keys[event.key] = true;

	// 	// Déplacer le cube vert en fonction des touches
	// 	if (keys.ArrowUp) {
	// 		boxMesh2.position.y += deplacementCube;
	// 	}
	// 	if (keys.ArrowDown) {
	// 		boxMesh2.position.y -= deplacementCube;
	// 	}
	// 	if (keys.ArrowLeft) {
	// 		boxMesh2.position.x -= deplacementCube;
	// 	}
	// 	if (keys.ArrowRight) {
	// 		boxMesh2.position.x += deplacementCube;
	// 	}

	// 	// // Déplacement du cube vert avec les touches Q, S, D, Z
	// 	if (keys.KeyW) {
	// 		boxMesh2.position.z -= deplacementCube;
	// 	}
	// 	if (keys.KeyS) {
	// 		boxMesh2.position.z += deplacementCube;
	// 	}
	// 	if (keys.KeyA) {
	// 		boxMesh2.position.x -= deplacementCube;
	// 	}
	// 	if (keys.KeyD) {
	// 		boxMesh2.position.x += deplacementCube;
	// 	}
	// }

	// function handleKeyup(event) {
	// 	keys[event.key] = false;
	// }

	// window.addEventListener("keydown", handleKeydown);
	// window.addEventListener("keyup", handleKeyup);

	// animate();

	// window.addEventListener("resize", onWindowResize);

	// function onWindowResize() {
	// 	camera.aspect = window.innerWidth / window.innerHeight;
	// 	camera.updateProjectionMatrix();
	// 	renderer.setSize(window.innerWidth, window.innerHeight);
	// }
});
