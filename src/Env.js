import { Environment, Lightformer, Float } from '@react-three/drei'

import { MovingSpots } from './MovingSpots'

export const Env = (props) => {
  return (
    <>
      {/* <axesHelper args={[5]} /> */}
      <spotLight
        position={[0, 15, 0]}
        angle={0.3}
        penumbra={1}
        castShadow
        intensity={2}
        shadow-bias={-0.0001}
      />
      <ambientLight intensity={0.3} />
      <Environment
        frames={Infinity}
        resolution={1024}
        // files="/textures/studio_small_03_1k.hdr"
        {...props}
      >
        <Lightformer
          intensity={1.75}
          rotation-x={Math.PI / 2}
          position={[0, 50, -9]}
          scale={[10, 10, 1]}
        />
        {/* sides */}
        <Lightformer
          rotation-y={Math.PI / 2}
          intensity={1}
          position={[-5, 0, 0]}
          scale={[20, 5, 5]}
        />
        <Lightformer
          rotation-y={Math.PI / 2}
          intensity={1}
          position={[5, 0, 0]}
          scale={[20, 5, 5]}
        />
        <Float speed={5} floatIntensity={2} rotationIntensity={2}>
          <Lightformer
            form="ring"
            color="red"
            intensity={2}
            scale={5}
            position={[-10, 20, -10]}
            target={[0, 0, 0]}
          />
        </Float>
        <MovingSpots />
      </Environment>
    </>
  )
}
