import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Tesla } from './Tesla'
import { Room } from './Room'
import { OrbitControls, BakeShadows, ContactShadows } from '@react-three/drei'
import { Env } from './Env'
import { Ground } from './Ground'
import { HeadLights } from './HeadLights'
import {
  EffectComposer,
  Bloom,
  ChromaticAberration
} from '@react-three/postprocessing'

import { BlendFunction } from 'postprocessing'

const App = () => {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [6.5, 3.5, 4], fov: 45 }}>
      <Env />

      <Suspense fallback={null}>
        <group>
          <Tesla position={[0, -0.08, 0]} name="tesla" />
          <HeadLights />
        </group>
        <Room scale={[1.2, 1.2, 1.2]} position={[0, -0.2, 0]} visible={false} />
        <Ground />
        <ContactShadows
          resolution={1024}
          frames={1}
          position={[0, -0.1, 0]}
          scale={15}
          blur={1}
          opacity={1}
          far={10}
        />
      </Suspense>

      <OrbitControls minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />

      <BakeShadows />

      <EffectComposer>
        {/* <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} /> */}
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={3.3} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.1} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.00012]} // color offset
        />
      </EffectComposer>
    </Canvas>
  )
}

export default App
