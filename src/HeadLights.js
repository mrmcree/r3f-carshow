import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { AdditiveBlending, Raycaster } from 'three'

export const HeadLights = () => {
  const texture = useTexture('/textures/flare.png')
  const light1 = useRef()
  const light2 = useRef()
  const lights = []
  const raycaster = new Raycaster()

  useEffect(() => {
    lights.push(light1.current)
    lights.push(light2.current)
  })

  useFrame((state) => {
    if (lights.length === 0) return
    lights.forEach((light) => {
      const screenPosition = light.position.clone()
      screenPosition.project(state.camera)
      raycaster.setFromCamera(screenPosition, state.camera)
      const group = state.scene.getObjectByName('tesla')
      const intersects = raycaster.intersectObjects(group.children, true)
      if (intersects.length === 0) {
        light.visible = false
      } else {
        const intersectDistance = intersects[0].distance
        const pointDistance = light.position.distanceTo(state.camera.position)
        if (intersectDistance < pointDistance) {
          light.visible = false
        } else {
          light.visible = true
        }
      }
    })
  })

  return (
    <group>
      <sprite position={[0.62, 0.42, 2.1]} scale={1} ref={light1}>
        <spriteMaterial
          map={texture}
          transparent
          depthWrite={false}
          depthTest={false}
          blending={AdditiveBlending}
        />
      </sprite>
      <sprite position={[-0.62, 0.42, 2.1]} scale={1} ref={light2}>
        <spriteMaterial
          map={texture}
          transparent
          depthWrite={false}
          depthTest={false}
          blending={AdditiveBlending}
        />
      </sprite>
    </group>
  )
}
