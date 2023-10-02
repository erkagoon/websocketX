import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

export class Cube {
  constructor() {
    this.geometry = new BoxGeometry(1, 1, 1);
    this.material = new MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new Mesh(this.geometry, this.material);
  }
  
  rotateCube() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  }
}