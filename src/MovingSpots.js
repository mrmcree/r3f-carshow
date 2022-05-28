import { Lightformer } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color } from 'three'

export const MovingSpots = ({ positions = [4, 0, 4, 0, 4, 0, 4, 0] }) => {
  const group = useRef()
  useFrame((state, delta) => {
    let z = group.current.position.z + delta * 30
    if (z > 50) {
      group.current.position.z = -50
    } else {
      group.current.position.z = z
    }
  })
  return (
    <group rotation={[0, 0.5, 0]}>
      <group ref={group}>
        {positions.map((x, i) => (
          <Lightformer
            key={i}
            color={new Color(i, i * 0.1, i * 0.5)}
            form="circle"
            intensity={5}
            rotation={[Math.PI / 2, 0, 0]}
            position={[x, 4, i * 8]}
            scale={[10, 1, 1]}
          />
        ))}
      </group>
    </group>
  )
}
