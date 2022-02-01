//media pipe imports
import { FaceMesh } from "@mediapipe/face_mesh";
import * as Facemesh from "@mediapipe/face_mesh";
import {Holistic,POSE_CONNECTIONS, FACEMESH_TESSELATION, HAND_CONNECTIONS} from "@mediapipe/holistic";
import * as cam from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks} from '@mediapipe/drawing_utils'
import { Pose, LandmarkGrid, PoseConfig } from '@mediapipe/pose'

//react imports
import ReactDOM from 'react-dom'
import React, { useEffect, useRef, useState, Suspense } from 'react'
import Webcam from "react-webcam";

//react three fiber imports
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  softShadows, 
  MeshWobbleMaterial, 
  OrbitControls, 
  Stats,
  Html,
} from "@react-three/drei";

import { GPU } from 'gpu.js'

//stylesheets
import './stylesheets/App.scss'

//components`
// import Sphere from './components/Sphere'


//TODO: make the math for position is % on one canvas = % on the other


let landmark_x = -100;
let landmark_y = -100;
let landmark_z = -100;
let scale_x = 0.1;
let scale_y = 0.1;
let scale_z = 0.1;
let scale = 0.1;
let rotateZ = 0;
let rotateY = 0;
let rotateX = 0;
let hand_info = null;

//F1-F5 = finger 1-5 (staring at thumb)
//J1-J4 = joint 1-4 (starting at base)
//P = position 
//S = scale 
//R = rotation
//ex: F3J1PX = finger 3 joint 1 position x = the base of the middle finger 



function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const connect = window.drawConnectors;
  var camera = null;

  //finger 1 joint 1 PSR
  const [F3J1PX, setF3J1PX] = useState('')
  const [F3J1PY, setF3J1PY] = useState('')
  const [F3J1PZ, setF3J1PZ] = useState('')


  // var percentage = (rotXInv - min) / (max - min); //rotationX is x% between -2 (MinRotation) and 0.8 (MaxRotation)
  // var endSize = percentage * (endSizeMax - endSizeMin) + endSizeMin; //particle count is percentage between 0.05 (endSizeMin) and 2 (endSizeMax)


  function onResults(results) {
    if (results.leftHandLandmarks !== "undefined" && results.leftHandLandmarks !== undefined ){ //if handLandmark is found
      //set finger3 joint1 positions to current position
        setF3J1PX(-(results.leftHandLandmarks[9].x))
        setF3J1PY(-(results.leftHandLandmarks[9].y))
        setF3J1PZ(-(results.leftHandLandmarks[9].z))

    } else { //if handLandmark is undefined
        //set finger3 joint1 positions to 0
        console.log('hand not found')
        setF3J1PX(0)
        setF3J1PY(0)
        setF3J1PZ(0)  
    }
  }


  function Sphere() {

    //convert to % of browser dimensions
    // const max = window.innerWidth
    // const min = - window.innerWidth
    // const percentage = (F3J1PX - 0) / (max - min )//rotationX is x% between -2 (MinRotation) and 0.8 (MaxRotation)
    // console.log("F3J1PX", F3J1PX)
    // console.log( "%", percentage)
    // const F3J1currX = percentage * (max - min) + min; //particle count is percentage between 0.05 (endSizeMin) and 2 (endSizeMax)

  
    // console.log("F3J1PX", F3J1PX)

  
    const mesh = useRef()
  
    useFrame((state, delta) => {

      const ninety = .90 * window.innerWidth
      const percentOf = window.innerWidth / 100

      mesh.current.rotation.x += 0.01;
      mesh.current.position.x = (F3J1PX * percentOf) + (percentOf / 2);
      mesh.current.position.y = (F3J1PY * percentOf) + (percentOf / 2);
      mesh.current.position.z = (F3J1PZ * 10); 
      mesh.current.scale.x = mesh.current.position.z / 2
      mesh.current.scale.y = mesh.current.position.z / 2
      mesh.current.scale.z = mesh.current.position.z / 2


      console.log("z", mesh.current.position.z)

    })
  
    return (
      <mesh
        ref={mesh}
        scale="0.2"
        >
        <sphereGeometry args={[1, 32]} />
        <meshStandardMaterial color={'blue'} />
      </mesh>
    )
  }
  


  useEffect(() => {

    // const canvas = document.querySelector('.canvas')
    // const webcam = document.querySelector('.webcam')
  

    const holistic = new Holistic({locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
    }});


    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    holistic.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await holistic.send({ image: webcamRef.current.video });
        },
        // width: 1920,
        // height: 1080,
      });
      camera.start();
    }

  }, []);

  function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    // const [hovered, setHover] = useState(false)
    // const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (
      mesh.current.rotation.x += 0.01
      // mesh.current.position.x = 
      ))
    // Return view, these are regular three.js elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={mesh}
        // scale={active ? 1.5 : 1}
        // onClick={(event) => setActive(!active)}
        // onPointerOver={(event) => setHover(true)}
        // onPointerOut={(event) => setHover(false)}
        >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    )
  }


  // const sphere = document.querySelector('.sphere');
  // console.log(sphere)

  

  return (

    <React.Fragment>

      <div className="outer-container">
      <div className="content-container"> 
        <Webcam className="webcam" ref={webcamRef}/>
        <Canvas className="canvas">
          <ambientLight intensity={0.3} />
          <pointLight position={[-10, 0, -20]} intensity={0.5} />
          <pointLight position={[0, -10, 0]} intensity={1.5} />
          {/* <Box/> */}
          <Sphere className="sphere" />
        </Canvas>

        <Stats/>
    </div>
      </div>

    </React.Fragment >
  );
}

export default App;
