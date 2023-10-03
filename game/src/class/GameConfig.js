import * as THREE from "three";
export class GameConfig {
	constructor() {
		this._init();
	}
	_init() {
		this.lights = {
			sunConfig: {
				name: "soleil",
				color: 0xffffff,
				power: 1,
				size: (5, 16, 5),
				position: new THREE.Vector3(30, 30, 30),
			},
		};
		this.cameras = {
			cameraConfig: {
				name: "Camera One",
				fov: 75,
				aspect: window.innerWidth / window.innerHeight,
				near: 0.1,
				far: 1000,
				position: new THREE.Vector3(0, 0, 10),
			},
		};
	}
}
