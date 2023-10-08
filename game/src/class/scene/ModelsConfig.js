class ModelsConfig {
	_path
	constructor() {
		this._path = "/gameAssets/3dObjects/"
		this._init();
	}
	_init() {
		this.config = this.get_config();
	}
	get_config() {
		let config = {
			Kimono_Female:{
				name:'Kimono_Female',
				fullName:'Bob',
				category:'character',
				path:this._path+'Kimono_Female.gltf',
				positions:{x:2,y:0,z:0},
				rotations:{x:Math.PI/2,y:false,z:false},
				scales:false,
				anime:'idle'
			},
			Kimono_Male:{
				name:'Kimono_Male',
				fullName:'Bob',
				category:'character',
				path:this._path+'Kimono_Male.gltf',
				positions:{x:3,y:0,z:0},
				rotations:{x:Math.PI/2,y:false,z:false},
				scales:false,
				anime:'idle'
			},
			LunarShip:{
				name:'LunarShip',
				fullName:'LunarShip',
				category:'decor',
				path:this._path+'Rocket_Ship_01.gltf',
				positions:{x:0,y:30,z:0,theta:80},
				rotations:{x:Math.PI/2,y:false,z:false},
				scales:false,
				anime:'idle'
			},
			fire:{
				name:'fire',
				fullName:'Basic fire',
				category:'decor',
				path:this._path+'fire/fire.gltf',
				positions:{x:5,y:0,z:0},
				rotations:{x:Math.PI/2,y:false,z:false},
				scales:false,
				anime:'idle'
			}
		}
		return config
	}
}
export { ModelsConfig };
