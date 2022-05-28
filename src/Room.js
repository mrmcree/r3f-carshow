import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { useEffect } from 'react'
import { Color } from 'three'

export const Room = (props) => {
  const { scene, materials } = useLoader(
    GLTFLoader,
    '/models/room.glb',
    (loader) => {
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('/draco/')
      loader.setDRACOLoader(dracoLoader)
    }
  )

  useEffect(() => {
    const groundMaterial = materials['lambert20']
    groundMaterial.metalness = 0.3
    groundMaterial.roughness = 0.1
    groundMaterial.envMapIntensity = 0.2

    // const ground = scene.getObjectByName('polySurface30_lambert20_0')
    // ground.parent.remove(ground)

    const wallMaterial = materials['lambert15']
    wallMaterial.metalness = 0.3
    wallMaterial.roughness = 0.7
    wallMaterial.envMapIntensity = 0.1

    const roofMaterial = materials['lambert19']
    roofMaterial.metalness = 1
    roofMaterial.roughness = 0.7
    roofMaterial.envMapIntensity = 0.1

    setTimeout(() => {
      scene.visible = true
    }, 300)
  }, [scene, materials])

  return <primitive object={scene} {...props} />
}
