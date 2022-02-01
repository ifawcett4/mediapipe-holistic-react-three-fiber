// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'

// const loader = new THREE.TextureLoader();
// console.log(loader)
// const texture = loader.load("./texture4.jpg")
// const height = loader.load("./noise.png")
// const alpha = loader.load("./noise.png")

// const Three = () => {

// // Debug
// const gui = new dat.GUI()

// // Canvas
// const canvas = document.querySelector('output_canvas')

// // Scene
// const scene = new THREE.Scene()

// // Objects
// const geometry = new THREE.PlaneBufferGeometry(2,2, 64, 64)

// // Materials
// const material = new THREE.MeshStandardMaterial({
//     color: 'aqua',
//     map: texture,
//     displacementMap: height,
//     displacementScale: 0.5,
//     alphaMap: alpha,
//     transparent: true,
//     depthTest:true,
// })
// const plane = new THREE.Mesh(geometry,material )
// scene.add(plane)

// gui.add(plane.rotation, 'x').min(0).max(10)

// plane.rotation.x = 2
// plane.rotation.y = 3
// plane.rotation.z = 4

// // Lights

// const pointLight = new THREE.PointLight(0xffffff, 5)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

// gui.add(pointLight.position, 'x')
// gui.add(pointLight.position, 'y')
// gui.add(pointLight.position, 'z')

// const color = {color: '#52ffff'}
// gui.addColor(color, 'color').onChange(() => {
//     pointLight.color.set(color.color)
// })


// /*** Sizes*/
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = 0
// camera.position.y = 0
// camera.position.z = 2
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     alpha: true
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// /**
//  * Animate
//  */

//  document.addEventListener('mousemove', logKey);

//  function logKey(e) {
//     // console.log(e.offsetY)
//     return plane.material.displacementScale = 0.3 + (- e.offsetY )/ 8000
//  }


// const clock = new THREE.Clock()

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//     plane.rotation.z = elapsedTime / 10

//     // Update objects
//     // sphere.rotation.y = .5 * elapsedTime

//     // Update Orbital Controls
//     controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()


// }

// export default Three;

