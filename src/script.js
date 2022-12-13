import './style.css'
//import React from 'react';
//import {Canvas} from 'react-three-fiber'; 
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'lil-gui'
import { SpotLight, WebGLDepthBuffer } from 'three'
import gsap from 'gsap'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/*// Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 500
const positions = new Float32Array(count * 3) // Multiply by 3 because each position is composed of 3 values (x, y, z)

for(let i = 0; i < count * 3; i++) // Multiply by 3 for same reason
{
    positions[i] = (Math.random() - 0.5) * 10 // Math.random() - 0.5 to have a random value between -0.5 and +0.5
    scene.add(particles)
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) */

// Create the Three.js BufferAttribute and specify that each information is composed of 3 values

// Models

// const gltfLoader = new GLTFLoader()
// gltfLoader.load(
//     '/models/Duck/glTF/Duck.gltf',
//     (gltf) =>{
//         scene.add(gltf.scene.children[0])
//     }
// )

function dumpObject(obj, lines = [], isLast = true, prefix = '') {
    const localPrefix = isLast ? '└─' : '├─';
    lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
    const newPrefix = prefix + (isLast ? '  ' : '│ ');
    const lastNdx = obj.children.length - 1;
    obj.children.forEach((child, ndx) => {
      const isLast = ndx === lastNdx;
      dumpObject(child, lines, isLast, newPrefix);
    });
    return lines;
  }

/**
 * Models
 */

const gltfLoader = new GLTFLoader()
gltfLoader.load(
'/models/spiderman1/scene.gltf',
(gltf) =>{
    gltf.scene.position.set(5,4,2)
    gltf.scene.scale.set(0.1,0.1,0.1)
    scene.add(gltf.scene)
}
)
 
gltfLoader.load(
'/models/avengers/scene.gltf',
(gltf) =>{
    console.log(gltf)
    gltf.scene.position.set(0,4,2)
    gltf.scene.scale.set(4.5,4.5,4.5)
    scene.add(gltf.scene)
}
)

// const fnf = new 
gltfLoader.load(
    '/models/Fnf/scene.gltf',
    (gltf) =>{
        console.log(gltf)
        gltf.scene.position.set(-5,4,2)
        gltf.scene.scale.set(0.5,0.5,0.5)
        scene.add(gltf.scene)
    }
    )

    //    const venom = new 
       gltfLoader.load(
        '/models/venom/scene.gltf',
        (gltf) =>{
            console.log(gltf)
            gltf.scene.position.set(-5,-4,2)
            gltf.scene.scale.set(0.2,0.2,0.2)
            //gltf.scene.rotateX(180)
            scene.add(gltf.scene)
        }
        )
    
    //    const topGun = new 
       gltfLoader.load(
            '/models/top gun/scene.gltf',
            (gltf) =>{
                console.log(gltf)
                gltf.scene.position.set(0,-4,2)
                gltf.scene.scale.set(0.02,0.02,0.02)
                //gltf.scene.rotateX(180)
                scene.add(gltf.scene)
            }
            )

        //    const harryPotter = new 
           gltfLoader.load(
                '/models/harry potter/scene.gltf',
                (gltf) =>{
                    console.log(gltf)
                    gltf.scene.position.set(5,-4,2)
                    gltf.scene.scale.set(0.5,0.5,0.5)
                    //gltf.scene.rotateX(180)
                    scene.add(gltf.scene)
                   
                }
                )
    
        


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 4)
scene.add(ambientLight)
const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 5,5,5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(3, 3, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))





/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

//const clock = new THREE.Clock()
const tick = () =>
{
    // const elapsedTime = clock.getElapsedTime()
    

    //rotation
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

// for (gltf1)
//     {
        // gltf1.rotation.x += deltaTime * 0.1
        //   spidey.rotation.y += deltaTime * 0.12
        
    

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


tick()