import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

const objects = []; //list of scene objects
let raycaster; //raygun

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

let camera, scene, renderer, controls;

init();
animate();
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.y = 10;

    controls = new PointerLockControls(camera, document.body);

    const blocker = document.getElementById('blocker');
    const instructions = document.getElementById('instructions');

    instructions.addEventListener('click', function () {
        controls.lock();
    });
    controls.addEventListener('lock', function () {
        instructions.style.display = 'none';
        blocker.style.display = 'none';
    });
    controls.addEventListener('unlock', function () {
        blocker.style.display = 'block';
        instructions.style.display = '';
    });

    scene.add(controls.getObject());

    const onKeyDown = function (event) {
        switch (event.code) {
            case 'KeyW':
                moveForward = true;
                break;
            case 'KeyA':
                moveLeft = true;
                break;
            case 'KeyS':
                moveBackward = true;
                break;
            case 'KeyD':
                moveRight = true;
                break;
            case 'Space':
                if (canJump === true) velocity.y += 40;
                canJump = false;
                break;
        }
    }

    const onKeyUp = function (event) {
        switch (event.code) {
            case 'KeyW':
                moveForward = false;
                break;
            case 'KeyA':
                moveLeft = false;
                break;
            case 'KeyS':
                moveBackward = false;
                break;
            case 'KeyD':
                moveRight = false;
                break;
        }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 1);

    const planeGeometry = new THREE.PlaneGeometry(35, 35, 64, 64);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotateX(-1.57);
    scene.add(plane);
    objects.push(plane);

    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    // for (let i = 0; i < 40; i += 2) {
    //     let c1 = parseInt(Math.random() * 256);
    //     let c2 = parseInt(Math.random() * 256);
    //     let c3 = parseInt(Math.random() * 256);
    //     const color = new THREE.Color("rgb(" + c1 + "," + c2 + "," + c3 + ")")
    //     const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    //     const boxMat = new THREE.MeshLambertMaterial({ color: color });
    //     const box = new THREE.Mesh(boxGeo, boxMat);
    //     box.position.set(i + 2, 2, 0);
    //     scene.add(box);
    //     objects.push(box);
    // }

    const boxGeo = new THREE.BoxGeometry(1, 5, 1);
    const boxMat = new THREE.MeshLambertMaterial({ color: 0xaa0000 });
    const box = new THREE.Mesh(boxGeo, boxMat);
    box.position.set(-2, 2, 0);
    scene.add(box);
    objects.push(box);

    const boxGeo1 = new THREE.BoxGeometry(1, 10, 1);
    const boxMat1 = new THREE.MeshLambertMaterial({ color: 0xff0748 });
    const box1 = new THREE.Mesh(boxGeo1, boxMat1);
    box1.position.set(-5, 2, 0);
    scene.add(box1);
    objects.push(box1);

    const boxGeo2 = new THREE.BoxGeometry(1, 15, 1);
    const boxMat2 = new THREE.MeshLambertMaterial({ color: 0xaaff88 });
    const box2 = new THREE.Mesh(boxGeo2, boxMat2);
    box2.position.set(-8, 2, 0);
    scene.add(box2);
    objects.push(box2);

    const boxGeo3 = new THREE.BoxGeometry(1, 20, 1);
    const boxMat3 = new THREE.MeshLambertMaterial({ color: 0xff00ff });
    const box3 = new THREE.Mesh(boxGeo3, boxMat3);
    box3.position.set(-11, 2, 0);
    scene.add(box3);
    objects.push(box3);

    const boxGeo4 = new THREE.BoxGeometry(1, 25, 1);
    const boxMat4 = new THREE.MeshLambertMaterial({ color: 0xff00ee });
    const box4 = new THREE.Mesh(boxGeo4, boxMat4);
    box4.position.set(-14, 2, 0);
    scene.add(box4);
    objects.push(box4);

    const boxGeo5 = new THREE.BoxGeometry(1, 30, 1);
    const boxMat5 = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const box5 = new THREE.Mesh(boxGeo5, boxMat5);
    box5.position.set(-17, 2, 0);
    scene.add(box5);
    objects.push(box5);

    const boxGeo6 = new THREE.BoxGeometry(1, 35, 1);
    const boxMat6 = new THREE.MeshLambertMaterial({ color: 0xaa11aa });
    const box6 = new THREE.Mesh(boxGeo6, boxMat6);
    box6.position.set(-20, 2, 0);
    scene.add(box6);
    objects.push(box6);

    const boxGeo7 = new THREE.BoxGeometry(1, 40, 1);
    const boxMat7 = new THREE.MeshLambertMaterial({ color: 0xaa44aa });
    const box7 = new THREE.Mesh(boxGeo7, boxMat7);
    box7.position.set(-23, 2, -3);
    scene.add(box7);
    objects.push(box7);

    const boxGeo8 = new THREE.BoxGeometry(1, 45, 1);
    const boxMat8 = new THREE.MeshLambertMaterial({ color: 0xaa55aa });
    const box8 = new THREE.Mesh(boxGeo8, boxMat8);
    box8.position.set(-23, 2, -6);
    scene.add(box8);
    objects.push(box8);

    const boxGeo9 = new THREE.BoxGeometry(1, 50, 1);
    const boxMat9 = new THREE.MeshLambertMaterial({ color: 0xaa88aa });
    const box9 = new THREE.Mesh(boxGeo9, boxMat9);
    box9.position.set(-23, 2, -9);
    scene.add(box9);
    objects.push(box9);

    const boxGeo10 = new THREE.BoxGeometry(3, 50, 3);
    const boxMat10 = new THREE.MeshLambertMaterial({ color: 0xaa0000 });
    const box10 = new THREE.Mesh(boxGeo10, boxMat10);
    box10.position.set(-23, 2, -12);
    scene.add(box10);
    objects.push(box10);

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize',onWindowResize); 
}

function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight; 
    camera.updateProjectionMatrix(); 
    renderer.setSize(window.innerWidth,window.innerHeight); 
}

function animate() {
    requestAnimationFrame(animate);
    const time = performance.now(); 

    if(controls.isLocked === true){
        raycaster.ray.origin.copy(controls.getObject().position); 
        raycaster.ray.origin.y -= 1; 

        const intersections = raycaster.intersectObjects(objects,false); 
        const onObject = intersections.length > 0; 
        const delta = (time - prevTime) / 1000; 

        velocity.x -= velocity.x * 10.0 * delta; 
        velocity.z -= velocity.z * 10.0 * delta; 
        velocity.y -= 9.8 * 10.0 * delta; 

        direction.z = Number(moveForward) - Number(moveBackward); 
        direction.x = Number(moveRight) - Number(moveLeft); 
        direction.normalize(); 
        
        if(moveForward || moveBackward) velocity.z -= direction.z * 40.0 * delta;
        if(moveLeft || moveRight) velocity.x -= direction.x * 40.0 * delta;

        if(onObject === true){
            velocity.y = Math.max(0,velocity.y);
            canJump = true; 
        }

        controls.moveRight(-velocity.x * delta); 
        controls.moveForward(-velocity.z * delta); 

        controls.getObject().position.y += (velocity.y * delta); 
        if(controls.getObject().position.y < -1){
            velocity.y = 0; 
            controls.getObject().position.set(0,1,0)
            canJump = true; 
        }
    }
    prevTime = time; 
    renderer.render(scene, camera);
}