
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
  Stars,
  Html,
} from "@react-three/drei";


//stylesheets
import './stylesheets/App.scss'

//components


function R3f() {


  function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
    // Return view, these are regular three.js elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }

  return (

    <React.Fragment >
    <h1> Hello World </h1> 
    <Canvas 
    // ref={canvasRef} 
    className="threedcanvas"
    shadows
    colorManagement 
    camera={{position: [-5, 2, 10], fov: 60}}
    >

      <group className="r3f"> 
      {/* ------------ LIGHTS ---------~---*/}
      <ambientLight intensity={0.3} />
      <pointLight position={[-10, 0, -20]} intensity={0.5} />
      <pointLight position={[0, -10, 0]} intensity={1.5} />
      <directionalLight 
        castShadow
        position={[0,10,0]} 
        intensity={1.5} 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
        shadow-camera-far={40}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <Box position={[-1.2, 0, 0]} />
      </group>



    </Canvas>

  </React.Fragment>
  );
}

export default R3f;
