class GameConfig {
	constructor() {
		this._Init();
	}
	_Init() {
		this.lights = {
			sunConfig: {
				name: "soleil",
				color: 0xffffff,
				power: 1,
				position: new THREE.Vector3(30, 30, 30),
				size: (5, 16, 5),
				// mat: {
				// 	color: 0xffffff00,
				// 	emissive: 0xffffff,
				// 	emissiveIntensity: 2,
				// },
			},
		};
	}
}
export { GameConfig };
