import * as THREE from "three";
import { Formula } from './Formula.js';

class KeyboardManager {
	_preventDefaultRightClick = false; // dev mod
	_GameConfig;
	_touchDeviceActive;
	mouse
	zooming
	constructor() {
		// this.conslog = GameConfig.conslog
		this._Formula = new Formula()
		this.order = 0;

		this._initProperties();
		this._setupDeviceControls();
	}
	_initProperties() {
		this.zooming = false
		this.mouse = new THREE.Vector2();
		this.thetaDeg = 0;

		this.forward = false;
		this.left = false;
		this.right = false;
		this.backward = false;
		this.sleft = false;
		this.sright = false;

		this.full = [
			this.forward,
			this.left,
			this.right,
			this.backward,
			this.sleft,
			this.sright,
		]
	}
	setCamera(camera) {
		this.camera = camera
	}
	_setupDeviceControls() {
		this.detectDevice = this._isTouchDevice();
		if (!this.detectDevice.isMousePointer && (this.detectDevice.touchEvent || this.detectDevice.ontouchstart || this.detectDevice.maxTouchPoints)) {
			this._touchDeviceActive = true;
			console.log('------------> Tactil device on ! 📱');
			this._TouchM = new TouchMe(this);
		}
		if (this.detectDevice.isMousePointer && this.detectDevice.maxTouchPoints === false) {
			this._touchDeviceActive = false;
			console.log('------------> Keyboard\'n\'mouse on ! 🖱️ + ⌨️');
			this._addKeyboardListeners();
			this._addMouseListeners();
		}
		if (this.detectDevice.isMousePointer && this.detectDevice.maxTouchPoints) {
			this._touchDeviceActive = false;
			console.log('------------> Keyboard\'n\'Pad on, Sorry you need to conect a Mouse and refresh [5] ! ⌨️');
			this._addKeyboardListeners();
			this._addMouseListeners();
		}
	}
	_isTouchDevice() {
		const ontouchstart = 'ontouchstart' in window;
		const maxTouchPoints = (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
		const isMousePointer = window.matchMedia('(pointer:fine)').matches;

		let touchEvent = false;
		try {
			touchEvent = document.createEvent("TouchEvent");
		} catch (e) { }

		const detectedDevice = { touchEvent, ontouchstart, maxTouchPoints, isMousePointer };

		console.table(detectedDevice);

		return detectedDevice;
	}
	_addMouseListeners() {
		const mire = document.createElement('div');
		mire.className = 'mire';
		document.body.appendChild(mire);

		let stringCss = '.mire,.target {position: absolute;height: 20px;width: 20px;left: calc(50% - 10px);top: calc(50% - 10px);border-radius: 50%;}.mire {display: none;background-color: rgba(153, 205, 50, 0.493);}.target {background-color: rgba(248, 234, 33, 0.459);}'
		this._Formula.addCss(stringCss, 'miretarget')


		const target = document.createElement('div');
		target.className = 'target';
		document.body.appendChild(target);

		// document.documentElement.oncontextmenu = event => {
		// 	if (this.conslog) console.log('right click');
		// 	if (this._preventDefaultRightClick) event.preventDefault();
		// 	// this.shoot2 = true;
		// };

		document.documentElement.onclick = () => {
			if (this.conslog) console.log('left click');
			// this.shoot1 = true;
		};
		// document.documentElement.onwheel = event => {
		// 	// event.preventDefault();
		// 	this._handleMouseWheel(event);
		// };

		document.getElementById('game').onmousemove = event => {
			this._handleMouseMove(event, target);
		};
	}
	// _handleMouseWheel(event) {
	// 	if (event.ctrlKey === false && event.altKey === false) {
	// 		if (this.conslog) console.info(event)
	// 		this.zooming = event.deltaY > 0 ? 'out' : 'in'
	// 	}
	// }
	_handleMouseMove(event, target) {
		// refresh div pos
		target.style.left = `${event.clientX - 5}px`;
		target.style.top = `${event.clientY - 5}px`;

		this.thetaDeg = this._Formula.get_DegreeWithTwoPos(window.innerWidth / 2, window.innerHeight / 2, event.clientX, event.clientY);
		this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	}
	_addKeyboardListeners() {
		document.onkeydown = event => this._handleKeyDown(event);
		document.onkeyup = event => this._handleKeyUp(event);
	}
	_handleKeyDown(event) {
		const KEY_MAP = {
			"ArrowLeft": () => this.left = true,
			"q": () => this.left = true,
			"a": () => this.sleft = true,
			"ArrowRight": () => this.right = true,
			"d": () => this.right = true,
			"e": () => this.sright = true,
			"ArrowUp": () => this.forward = true,
			"z": () => this.forward = true,
			"ArrowDown": () => this.backward = true,
			"s": () => this.backward = true,
			// " ": () => this.space = true,
			// "Space": () => this.space = true,
		};
		if (KEY_MAP[event.key]) {
			if (this._preventDefaultRightClick) event.preventDefault();
			KEY_MAP[event.key]();
		}
	}
	_handleKeyUp(event) {
		const KEY_MAP = {
			"ArrowLeft": () => this.left = false,
			"q": () => this.left = false,
			"a": () => this.sleft = false,
			"ArrowRight": () => this.right = false,
			"d": () => this.right = false,
			"e": () => this.sright = false,
			"ArrowUp": () => this.forward = false,
			"z": () => this.forward = false,
			"ArrowDown": () => this.backward = false,
			"s": () => this.backward = false,
			// " ": () => this.space = false,
			// "Space": () => this.space = false,
		};
		if (KEY_MAP[event.key]) KEY_MAP[event.key]();
	}
}
export { KeyboardManager }
