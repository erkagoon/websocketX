import * as THREE from "three";
class Formula {
	order = 0
	constructor() {

	}
	get_NextHtmlPos = (x, y, theta, speed) => {
		theta = this.degToRad(theta)

		let neo = {
			x: x - Math.sin(theta) * speed,
			y: y + Math.cos(theta) * speed
		}

		neo.x = Math.round(neo.x * 10) / 10;
		neo.y = Math.round(neo.y * 10) / 10;

		neo = {
			x: neo.x > window.innerWidth
				? neo.x - window.innerWidth
				: neo.x < 0
					? window.innerWidth - neo.x
					: neo.x,
			y: neo.y > window.innerHeight
				? neo.y - window.innerHeight
				: neo.y < 0
					? window.innerHeight - neo.y
					: neo.y
		}

		return neo
	}
	get_NextThreePos = (x, y, theta, speed) => {
		// console.log('avant', x, y)
		x = x - Math.sin(theta) * speed
		y = y + Math.cos(theta) * speed
		// console.log('après', x, y)
		return { x: x, y: y }
	}
	getNextOrbit(x, y, theta) {
		return {
			x: (x * Math.cos(theta)) - (y * Math.sin(theta)),
			y: (x * Math.sin(theta)) + (y * Math.cos(theta))
		}
	}
	getDistanceXY = (from, destination) => {
		let AB = (destination.position.x) - (from.position.x)
		let AC = (destination.position.y) - (from.position.y)
		let distance = Math.sqrt((AB * AB) + (AC * AC))
		return distance
	}
	getDistanceXYZ = (A, B) => {
		{
			if (!B) { B = { position: { x: 0, y: 0, z: 0 } } }
			let AB = (B.position.x) - (A.position.x)
			let AC = (B.position.y) - (A.position.y)
			let BC = (B.position.z) - (A.position.z)
			let distance = Math.floor(Math.sqrt((AB * AB) + (AC * AC) + (BC * BC)))
			// console.log("distanceXYZ:", distance);
			return distance
		}
	}

	rand = (min, max) => { return Math.floor(Math.random() * (max - min + 1) + min) }
	degToRad = (deg) => { return deg * (Math.PI / 180); }
	radToDeg = (rad) => { return rad * (180 / Math.PI); }
	
	faireTournerAutourDuCentre = (soleil, sensDeRotation) => {
		// Obtenez le centre de la scène en supposant que votre scène est nommée "scene".
		const centreScene = new THREE.Vector3(0, 0, 0);
	
		// Définissez la position de départ du soleil par rapport au centre.
		const positionInitiale = soleil.position.clone();
	
		// Calculez la circonférence du cercle que le Soleil décrit en une minute.
		const circonference = 2 * Math.PI * positionInitiale.distanceTo(centreScene);
	
		// Calculez la vitesse de rotation nécessaire pour effectuer un tour par minute.
		const vitesseRotation = (2 * Math.PI) / 60; // 2 * Pi radian par minute
	
		// Fonction de mise à jour pour faire tourner le soleil.
		function upDate() {
			// Calculez la nouvelle position du soleil en utilisant la formule de rotation.
			const angleRotation = vitesseRotation * (1 / 60); // 1/60 car une minute a 60 secondes
			const rotationMatrix = new THREE.Matrix4().makeRotationAxis(sensDeRotation, angleRotation);
			const nouvellePosition = positionInitiale.clone().applyMatrix4(rotationMatrix);
	
			// Mettez à jour la position du soleil.
			soleil.position.copy(nouvellePosition);
	
			// Vous devrez peut-être ajouter d'autres transformations selon les besoins.
	
			// Appelez cette fonction de mise à jour à chaque trame d'animation.
			// requestAnimationFrame(miseAJour);
		}
	
		// Lancez la mise à jour.
		// upDate();
	}
	
	
	get_aleaPosOnScreen(size) {

		let maxX = window.innerWidth;
		let maxY = window.innerHeight;

		let pos = {
			x: this.rand(0, maxX - (size.x / 2)),
			y: this.rand(0, maxY - (size.y / 2)),
			z: 0//this.rand(-1, 1)
		}
		// console.log(size, pos)
		return pos
	}
	get_aleaPosOnFloor(floorSize) {
		let pos = {
			x: this.rand(0, floorSize.x) - (floorSize.x / 2),
			y: this.rand(0, floorSize.y) - (floorSize.y / 2),
			z: 0//this.rand(-1, 1)
		}
		// console.log(0 - ("x", floorSize.x / 2), 'to', floorSize.x - (floorSize.x / 2), ':', pos.x)
		// console.log(0 - ("y", floorSize.y / 2), 'to', floorSize.y - (floorSize.y / 2), ':', pos.y)
		return pos
	}
	get_NextOrbitPosXYZZ = (obj, centerObj = false) => {
		console.log(obj.position);
		let distance = 0;

		if (centerObj === false) { 
			centerObj = { position: { x: 0, y: 0, z: 0 } }
			distance = obj.position.distanceTo({ x: 0, y: 0, z: 0 })
		}
		else {
			distance = centerObj.position.distanceTo(obj.position)
		}
		console.log(centerObj.position);
		console.log(distance);


				// 	// new pos
		let xx2 = 0;
		let yy2 = 0;
		let zz2 = 0;
		// 	if (obj.objtype === 'player') {
		// 	}
		if (distance > 0) {
			// console.log('player check orbital force')
			xx2 = obj.position.x+ ((distance) * (Math.cos(obj.theta.x[0])));
			yy2 = obj.position.y+ ((distance) * (Math.sin(obj.theta.y[0])));
			zz2 = obj.position.z+ ((distance) * (Math.sin(obj.theta.z[0])));
		}
		// else {
		// 	xx2 = centerX + (centerW * (Math.cos(obj.theta.x[0])));
		// 	yy2 = centerY + (centerH * (Math.sin(obj.theta.y[0])));
		// 	zz2 = centerZ + (centerD * (Math.sin(obj.theta.z[0])));
		// }
		console.log(xx2);



		return 0
		// this.getDistanceXYZ(obj, centerObj)
		console.log(obj.position)
		console.log(distance)
		// let distance = this.getDistanceXYZ(obj, centerObj);

		if (obj.theta[0] > obj.theta[1]) {
			obj.theta[0] = obj.theta[0] - obj.theta[1]
		}
		// if (obj.theta && centerObj) {
		// 	// sun pos
		let centerX = 0;
		let centerY = 0;
		let centerZ = 0;
		let centerW = .1;
		let centerH = .1;
		let centerD = .1;
		// 	// new pos
		let x2 = 0
		let y2 = 0
		let z2 = 0
		// 	if (obj.objtype === 'player') {
		// 	}
		if (distance > 0) {
			// console.log('player check orbital force')
			x2 = centerX + ((distance) * (Math.cos(obj.theta.x[0])));
			y2 = centerY + ((distance) * (Math.sin(obj.theta.y[0])));
			z2 = centerZ + ((distance) * (Math.sin(obj.theta.z[0])));
		}
		else {
			x2 = centerX + (centerW * (Math.cos(obj.theta.x[0])));
			y2 = centerY + (centerH * (Math.sin(obj.theta.y[0])));
			z2 = centerZ + (centerD * (Math.sin(obj.theta.z[0])));
		}
		obj.position.set((x2,y2,z2))
		// console.log(obj)
		// 	// saving new pos in obj
		// 	if (obj.orbitdir && obj.orbitdir > 0) {
		// if (obj.theta.x[2] > 0) {
		// 	obj.position.x = x2// - (obj.geometry.parameters.width / 2)
		// 	obj.theta.x[0] = obj.theta.x[0] + obj.theta.x[2];
		// 	obj.rotation.x = THREE.MathUtils.degToRad(obj.theta.x[0])
		// }
		// if (obj.theta.y[2] > 0) {
		// 	obj.position.y = y2// - (obj.geometry.parameters.height / 2)
		// 	obj.theta.y[0] = obj.theta.y[0] + obj.theta.y[2];
		// 	obj.rotation.y = THREE.MathUtils.degToRad(obj.theta.y[0])
		// }
		// if (obj.theta.z[2] > 0) {
		// 	obj.position.z = z2// - (obj.geometry.parameters.depth/ 2)
		// 	obj.theta.z[0] = obj.theta.z[0] + obj.theta.z[2];
		// 	obj.rotation.z = THREE.MathUtils.degToRad(obj.theta.z[0])
		// }
		// if (obj.target) {
		// 	obj.target.position.set(0, 0, 0);
		// }


		// 	}
		// 	else {
		// 		obj.theta[0] = obj.theta[0] - obj.theta[2]
		// 	}
	}
	get_NextOrbitPosOrbiter = (obj, centerObj = false) => {

		if (centerObj === false) { centerObj = { position: { x: 0, y: 0, z: 0 } } }

		let distance = this.getDistanceXY(obj, centerObj)

		if (obj.theta[0] > obj.theta[1]) obj.theta[0] = obj.theta[0] - obj.theta[1];

		// center pos
		let centerX = 0;
		let centerY = 0;
		let centerZ = 0;

		let centerW = .1;
		let centerH = .1;
		let centerD = .1;
		// new pos
		let x2 = 0
		let y2 = 0
		let z2 = 0

		if (distance > 0) {
			x2 = centerX + ((distance) * (Math.cos(obj.theta.x[0] * 5)));
			y2 = centerY + ((distance) * (Math.sin(obj.theta.y[0] * 5)));
			z2 = centerZ + ((distance) * (Math.cos(obj.theta.z[0] * 5)));
		}
		else {
			x2 = centerX + (centerW * (Math.cos(obj.theta.x[0])));
			y2 = centerY + (centerH * (Math.sin(obj.theta.y[0])));
			z2 = centerZ + (centerD * (Math.sin(obj.theta.z[0])));
		}


		// console.log(obj)
		// 	// saving new pos in obj
		if (obj.theta.x[2] > 0) {
			obj.position.x = x2// - (obj.geometry.parameters.width / 2)
			obj.theta.x[0] = obj.theta.x[0] + obj.theta.x[2];
			// obj.rotation.x = THREE.MathUtils.degToRad(obj.theta.x[0])
		}
		if (obj.theta.y[2] > 0) {
			obj.position.y = y2// - (obj.geometry.parameters.height / 2)
			obj.theta.y[0] = obj.theta.y[0] + obj.theta.y[2];
			// obj.rotation.y = THREE.MathUtils.degToRad(obj.theta.y[0])
		}
		if (obj.theta.z[2] > 0) {
			obj.position.z = z2// - (obj.geometry.parameters.depth/ 2)
			obj.theta.z[0] = obj.theta.z[0] + obj.theta.z[2];
			// obj.rotation.z = THREE.MathUtils.degToRad(obj.theta.z[0])
		}
		if (obj.target) {
			obj.target.position.set(centerObj.positions);
		}
	}
	get_CartesianFromLatLngDist = (pt) => {
		let lat = (90 - pt.lat) * Math.PI / 180
		let lng = (180 + pt.lng) * Math.PI / 180
		// let x = pt.alt + (Math.sin(lat) * Math.cos(lng))
		// let y = pt.alt + (-Math.sin(lat) * Math.sin(lng))
		// let z = pt.alt + (-Math.cos(lat))
		let x = pt.alt + (Math.sin(lat) * Math.cos(lng));
		let y = pt.alt + (Math.sin(lat) * Math.sin(lng));
		let z = pt.alt + Math.cos(lat);
		let retour = new THREE.Vector3(x, y, z);
		return retour
	}
	get_DegreeWithTwoPos(fromX, fromY, destX, destY,) {
		var nextY = fromY - destY;
		var nextX = fromX - destX;
		var theta = Math.atan2(nextX, nextY); // 0° = east
		theta = (theta * 180 / Math.PI); // radians to degrees
		// if (theta < 0) {
		// 	theta += 360; // negative case
		// }
		// console.log(
		// 	theta
		// )
		return theta;
	}

	addCss(stringcss, styleid = false) {
		let style = document.createElement('style');
		// style.type = 'text/css';
		style.textContent = this.sanitize(stringcss)
		style.id = styleid
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	sanitize = (string) => {
		// Tableau de correspondance pour les caractères spéciaux
		const map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#x27;',
			"./": '&#x2F;',
		};
		// Expression régulière pour rechercher les caractères spéciaux
		const reg = /[&<>"'/]/ig;
		// Remplace les caractères spéciaux par leur équivalent HTML
		return string.replace(reg, (match) => (map[match]));
	}
	generateToken = (length) => {
		var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		var token = '';
		for (var i = 0; i < length; i++) {
			token += chars[Math.floor(Math.random() * chars.length)];
		}
		return token;
	}
}
export { Formula }