// import React, { useEffect, useRef, useState, Suspense } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'


// export default function Sphere() {

//     console.log( "x" , F3J1PX)
//     console.log( "y" , F3J1PY)
//     console.log( "z" , F3J1PZ)
  

//     const mesh = useRef()
  
//     useFrame((state, delta) => {
//       mesh.current.rotation.x += 0.01;
  
//       // mesh.current.position.x = f_mid_base_x;
//     //   mesh.current.position.y = -(landmark_y - 0.5)*0.75;
//     //   mesh.current.rotation.z = -(rotateZ) + Math.PI/2;
//     })
  
//     return (
//       <mesh
//         ref={mesh}
//         scale="0.5"
//         >
//         <sphereGeometry args={[1, 32]} />
//         <meshStandardMaterial color={'blue'} />
//       </mesh>
//     )
//   }
