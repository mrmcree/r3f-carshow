import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { useEffect } from 'react'
import { MeshPhysicalMaterial } from 'three'

export const Tesla = (props) => {
  const { scene, materials } = useLoader(
    GLTFLoader,
    '/models/tesla.glb',
    (loader) => {
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('/draco/')
      loader.setDRACOLoader(dracoLoader)
    }
  )

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.material.name === 'Glass_mid_tint') {
          child.material = new MeshPhysicalMaterial({
            envMapIntensity: 0.1,
            transmission: 1,
            roughness: 0.01,
            metalness: 0.7,
            reflectivity: 0.3,
            clearcoat: 1,
            sheen: 1
          })
        }
        if (child.material.name === 'Glass_Tint_max') {
          child.material = new MeshPhysicalMaterial({
            envMapIntensity: 0.1,
            transmission: 1,
            roughness: 0.01,
            metalness: 0.5,
            reflectivity: 0.3,
            clearcoat: 1,
            sheen: 1
          })
        }
      }
    })

    const bodyMaterial = materials['car_main_paint']
    bodyMaterial.roughness = 0.2
    bodyMaterial.metalness = 0.8

    materials['Thread'].roughness = 0.7
    materials['Thread'].envMapIntensity = 0.1
    materials['Sidewall'].roughness = 0.7
    materials['Sidewall'].envMapIntensity = 0.1
  }, [scene, materials])

  return <primitive object={scene} {...props} />
}
