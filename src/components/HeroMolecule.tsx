'use client'

import { ContactShadows, Environment, Lightformer, Sparkles } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import * as THREE from 'three'

type Atom = {
  element: 'C' | 'N' | 'O' | 'H'
  position: [number, number, number]
}

type Bond = [number, number]

/**
 * Stylized caffeine-like topology (approx. Å units, scaled for hero).
 * Enough visual mass for a cinematic close-up without a heavy GLB.
 */
const ATOMS: Atom[] = [
  // six-membered ring
  { element: 'C', position: [1.21, 0.7, 0.05] },
  { element: 'C', position: [1.21, -0.7, -0.05] },
  { element: 'N', position: [0.0, -1.39, 0.08] },
  { element: 'C', position: [-1.21, -0.7, -0.04] },
  { element: 'C', position: [-1.21, 0.7, 0.06] },
  { element: 'N', position: [0.0, 1.39, -0.02] },
  // fused five-membered feel
  { element: 'C', position: [2.48, 1.28, 0.35] },
  { element: 'N', position: [3.35, 0.15, 0.42] },
  { element: 'C', position: [2.48, -1.05, 0.28] },
  // carbonyls / oxygens
  { element: 'O', position: [-2.35, -1.35, -0.55] },
  { element: 'O', position: [-2.32, 1.38, 0.62] },
  // methyls
  { element: 'C', position: [0.05, 2.82, -0.15] },
  { element: 'C', position: [4.72, 0.22, 0.85] },
  { element: 'C', position: [-0.08, -2.82, 0.22] },
  // hydrogens
  { element: 'H', position: [0.92, 3.28, 0.55] },
  { element: 'H', position: [-0.88, 3.22, 0.42] },
  { element: 'H', position: [0.12, 3.35, -1.05] },
  { element: 'H', position: [5.15, 1.05, 1.25] },
  { element: 'H', position: [5.35, -0.45, 0.35] },
  { element: 'H', position: [4.85, -0.15, 1.78] },
  { element: 'H', position: [0.82, -3.22, 0.65] },
  { element: 'H', position: [-0.95, -3.18, 0.55] },
  { element: 'H', position: [-0.05, -3.25, -0.7] },
  { element: 'H', position: [2.75, 2.15, 0.75] },
  { element: 'H', position: [2.72, -1.95, 0.65] },
]

const BONDS: Bond[] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [0, 6],
  [6, 7],
  [7, 8],
  [8, 1],
  [3, 9],
  [4, 10],
  [5, 11],
  [7, 12],
  [2, 13],
  [11, 14],
  [11, 15],
  [11, 16],
  [12, 17],
  [12, 18],
  [12, 19],
  [13, 20],
  [13, 21],
  [13, 22],
  [6, 23],
  [8, 24],
]

const ATOM_STYLE: Record<
  Atom['element'],
  {
    color: string
    emissive: string
    emissiveIntensity: number
    radius: number
    metalness: number
    roughness: number
  }
> = {
  C: {
    color: '#475569',
    emissive: '#0f172a',
    emissiveIntensity: 0.15,
    radius: 0.36,
    metalness: 0.55,
    roughness: 0.22,
  },
  N: {
    color: '#38bdf8',
    emissive: '#0284c7',
    emissiveIntensity: 1.05,
    radius: 0.34,
    metalness: 0.35,
    roughness: 0.12,
  },
  O: {
    color: '#7dd3fc',
    emissive: '#0ea5e9',
    emissiveIntensity: 1.35,
    radius: 0.33,
    metalness: 0.25,
    roughness: 0.1,
  },
  H: {
    color: '#f1f5f9',
    emissive: '#94a3b8',
    emissiveIntensity: 0.25,
    radius: 0.17,
    metalness: 0.1,
    roughness: 0.28,
  },
}

function BondMesh({ a, b }: { a: THREE.Vector3; b: THREE.Vector3 }) {
  const mesh = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(b, a)
    const len = dir.length()
    const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5)
    const quat = new THREE.Quaternion()
    quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())
    return { len, mid, quat }
  }, [a, b])

  return (
    <mesh position={mesh.mid} quaternion={mesh.quat}>
      <cylinderGeometry args={[0.055, 0.055, mesh.len, 24]} />
      <meshPhysicalMaterial
        color="#cbd5e1"
        metalness={0.7}
        roughness={0.18}
        clearcoat={0.85}
        clearcoatRoughness={0.12}
        emissive="#38bdf8"
        emissiveIntensity={0.08}
      />
    </mesh>
  )
}

function Molecule({
  pointer,
  hovering,
}: {
  pointer: MutableRefObject<{ x: number; y: number }>
  hovering: boolean
}) {
  const group = useRef<THREE.Group>(null)
  const tilt = useRef({ x: 0, y: 0 })

  const atoms = useMemo(
    () => ATOMS.map((atom) => ({ ...atom, vec: new THREE.Vector3(...atom.position) })),
    [],
  )

  const center = useMemo(() => {
    const c = new THREE.Vector3()
    for (const atom of atoms) c.add(atom.vec)
    return c.multiplyScalar(1 / atoms.length)
  }, [atoms])

  useFrame((state, delta) => {
    if (!group.current) return

    const damp = 1 - Math.exp(-delta * 6)
    const targetTiltX = hovering ? pointer.current.y * 0.18 : 0
    const targetTiltY = hovering ? pointer.current.x * 0.22 : 0
    tilt.current.x += (targetTiltX - tilt.current.x) * damp
    tilt.current.y += (targetTiltY - tilt.current.y) * damp

    group.current.rotation.y += delta * 0.2
    group.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.28) * 0.08 + tilt.current.x
    group.current.rotation.z =
      Math.cos(state.clock.elapsedTime * 0.2) * 0.04 + tilt.current.y * 0.2
  })

  return (
    <group ref={group} scale={0.5} position={[0, 0.05, 0]}>
      <group position={[-center.x, -center.y, -center.z]}>
        {BONDS.map(([i, j], key) => (
          <BondMesh key={key} a={atoms[i].vec} b={atoms[j].vec} />
        ))}
        {atoms.map((atom, i) => {
          const style = ATOM_STYLE[atom.element]
          return (
            <mesh key={i} position={atom.position}>
              <sphereGeometry args={[style.radius, 64, 64]} />
              <meshPhysicalMaterial
                color={style.color}
                emissive={style.emissive}
                emissiveIntensity={style.emissiveIntensity}
                metalness={style.metalness}
                roughness={style.roughness}
                clearcoat={1}
                clearcoatRoughness={0.08}
                reflectivity={0.85}
                ior={1.45}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

function PointerFx({
  pointer,
  hovering,
}: {
  pointer: MutableRefObject<{ x: number; y: number }>
  hovering: boolean
}) {
  const rim = useRef<THREE.PointLight>(null)
  const fill = useRef<THREE.PointLight>(null)
  const rimPos = useMemo(() => new THREE.Vector3(-2.5, -0.8, -2.5), [])
  const fillPos = useMemo(() => new THREE.Vector3(2.2, 1.8, 4), [])

  useFrame((_, delta) => {
    const damp = 1 - Math.exp(-delta * 12)
    const px = pointer.current.x
    const py = pointer.current.y

    fillPos.set(px * 3.6, py * 2.8 + 0.3, 4.2)
    rimPos.set(-px * 3.2, -py * 2.2, -2.8)

    if (fill.current) {
      fill.current.position.lerp(fillPos, damp)
      const goal = hovering ? 3.2 : 0
      fill.current.intensity += (goal - fill.current.intensity) * Math.min(1, delta * 7)
    }

    if (rim.current) {
      rim.current.position.lerp(rimPos, damp)
      const goal = hovering ? 4.2 : 0
      rim.current.intensity += (goal - rim.current.intensity) * Math.min(1, delta * 7)
    }
  })

  return (
    <>
      <pointLight ref={fill} color="#e0f2fe" intensity={0} distance={11} decay={2} />
      <pointLight ref={rim} color="#38bdf8" intensity={0} distance={12} decay={2} />
    </>
  )
}

function Scene({
  pointer,
  hovering,
}: {
  pointer: MutableRefObject<{ x: number; y: number }>
  hovering: boolean
}) {
  return (
    <>
      {/* Soft depth fog — tints only geometry, clear stays transparent */}
      <fog attach="fog" args={['#0b132b', 6.5, 13]} />

      <ambientLight intensity={0.16} />
      <directionalLight position={[5, 7, 4]} intensity={1.45} color="#f8fafc" />
      <directionalLight position={[-5, -1, -4]} intensity={0.7} color="#38bdf8" />
      <pointLight position={[-2.5, 1.5, 2]} intensity={1.2} color="#38bdf8" distance={10} />
      <pointLight position={[3, -1, -2]} intensity={0.7} color="#7dd3fc" distance={8} />
      <PointerFx pointer={pointer} hovering={hovering} />

      <Environment resolution={512} background={false}>
        <Lightformer intensity={3.2} position={[0, 5, 1]} scale={[10, 3, 1]} color="#e0f2fe" />
        <Lightformer intensity={2} position={[-5, 1, -2]} scale={5} color="#38bdf8" />
        <Lightformer intensity={1.2} position={[5, -2, 2]} scale={4} color="#94a3b8" />
        <Lightformer intensity={0.8} position={[0, -4, -3]} scale={[8, 2, 1]} color="#0ea5e9" />
      </Environment>

      <Sparkles
        count={42}
        scale={[7, 5, 4]}
        size={2.2}
        speed={hovering ? 0.55 : 0.25}
        opacity={hovering ? 0.7 : 0.45}
        color="#7dd3fc"
      />

      <Molecule pointer={pointer} hovering={hovering} />

      <ContactShadows
        position={[0, -2.1, 0]}
        opacity={hovering ? 0.28 : 0.18}
        scale={10}
        blur={2.8}
        far={4}
        color="#020617"
      />
    </>
  )
}

export function HeroMolecule() {
  const rootRef = useRef<HTMLDivElement>(null)
  const pointer = useRef({ x: 0.35, y: 0.25 })
  const [active, setActive] = useState(true)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting)
      },
      { threshold: 0.12 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
    pointer.current = { x, y }
  }

  return (
    <div
      ref={rootRef}
      className="hero-mark hero-mark--3d"
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onPointerMove={onPointerMove}
    >
      <Canvas
        dpr={[1, 2]}
        frameloop={active ? 'always' : 'demand'}
        camera={{ position: [0, 0.15, 8.8], fov: 28, near: 0.1, far: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <Suspense fallback={null}>
          <Scene pointer={pointer} hovering={hovering} />
        </Suspense>
      </Canvas>
    </div>
  )
}
