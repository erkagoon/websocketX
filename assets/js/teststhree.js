import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function addSpotLight(scene){
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 0, 20);
    spotLight.angle = Math.PI / 4;

    scene.add(spotLight);
    const slHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(spotLight, slHelper, spotLight.target);
}
function addlux(scene){
    const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );

    dirLight.color.setHSL( 0.1, 1, 0.95 );

    dirLight.position.set(0, 0, 20);
    dirLight.position.multiplyScalar( 30 );

    scene.add( dirLight );

    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    const d = 50;

    dirLight.shadow.camera.left = - d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = - d;

    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = - 0.0001;

    const dirLightHelper = new THREE.DirectionalLightHelper( dirLight, 10 );
    scene.add( dirLightHelper );
}		

function addRVBCubes(scene){
    // set up red box mesh
    const bg1 = new THREE.BoxGeometry(1, 1, 1);
    const bm1 = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const boxMesh1 = new THREE.Mesh(bg1, bm1);
    boxMesh1.castShadow = true;
    boxMesh1.position.x = -2;
    boxMesh1.position.y = 0;
    boxMesh1.position.z = 2;
    scene.add(boxMesh1);

    // set up green box mesh
    const bg2 = new THREE.BoxGeometry(1, 1, 1);
    const bm2 = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const boxMesh2 = new THREE.Mesh(bg2, bm2);
    boxMesh2.castShadow = true;
    boxMesh2.position.x = 0;
    boxMesh2.position.y = 0;
    boxMesh2.position.z = 2;
    scene.add(boxMesh2);

    // set up blue box mesh
    const bg3 = new THREE.BoxGeometry(1, 1, 1);
    const bm3 = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    const boxMesh3 = new THREE.Mesh(bg3, bm3);
    boxMesh3.castShadow = true;
    boxMesh3.position.x = 2;
    boxMesh3.position.y = 0;
    boxMesh3.position.z = 2;
    scene.add(boxMesh3);
}

function addFloor(scene){
    // set up ground
    const groundGeometry = new THREE.BoxGeometry(9, 9, .5);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xfafafa });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    
    groundMesh.receiveShadow = true;  
    groundMesh.position.z = -2;
    //groundMesh.rotation.x =( Math.PI/2);  

    scene.add(groundMesh);
    scene.receiveShadow = true;
    scene.castShadow = true;
}
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.x = -5;
camera.position.y = -5;
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

// OrbitControl - need camera and renderer
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// set up ambient light
const ambient = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambient);

addlux(scene)
addRVBCubes(scene)
addFloor(scene)
// addSpotLight(scene)

function animate() {
    requestAnimationFrame(animate);

    camera.updateProjectionMatrix();
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
