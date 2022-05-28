import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { Suspense, useEffect, useLayoutEffect } from 'react'
import { MeshReflectorMaterial } from '@react-three/drei'
import { TextureLoader, RepeatWrapping, LinearEncoding } from 'three'

export const Ground = (props) => {
  const { nodes } = useLoader(GLTFLoader, '/models/room.glb', (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    loader.setDRACOLoader(dracoLoader)
  })

  const [roughness, normal] = useLoader(TextureLoader, [
    '/textures/terrain-roughness.jpg',
    '/textures/terrain-normal.jpg'
  ])

  useLayoutEffect(() => {
    ;[normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping
      t.wrapT = RepeatWrapping
      t.repeat.set(10, 10)
      t.offset.set(0, 0)
    })
    normal.encoding = LinearEncoding
  }, [normal, roughness])

  return (
    <mesh position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* <meshStandardMaterial
          roughness={0.1}
          envMapIntensity={0.2}
          metalness={0.6}
        /> */}
      <planeGeometry args={[35, 35]} />
      <MeshReflectorMaterial
        envMapIntensity={0.3}
        normalMap={normal}
        roughnessMap={roughness}
        blur={[300, 100]}
        resolution={2048}
        mixBlur={1}
        mixStrength={100}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#101010"
        metalness={1}
        mixContrast={1}
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}
