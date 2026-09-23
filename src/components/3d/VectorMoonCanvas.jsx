import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { playCameraSwoop, playTelemetryPing, playHapticClick } from '../../utils/audio'

export const LUNAR_HOTSPOTS = [
  {
    id: 'vitals',
    number: '01',
    label: 'Core Web Vitals',
    shortLabel: '01 VITALS',
    location: 'Mare Serenitatis Basin',
    coords: { lat: 26, lon: 18 },
    metric: '100/100',
    metricLabel: 'Performance Score',
    spec: 'Sub-400ms First Contentful Paint. Zero CLS (Cumulative Layout Shift). Instantaneous perceived load on 4G/5G mobile.',
    color: '#00C6FF',
    accentClass: 'text-cyan border-cyan/40 bg-cyan/10',
  },
  {
    id: 'edge',
    number: '02',
    label: 'Global Edge CDN',
    shortLabel: '02 EDGE CDN',
    location: 'Oceanus Procellarum',
    coords: { lat: 18, lon: -52 },
    metric: '< 24ms',
    metricLabel: 'Time to First Byte',
    spec: 'Static & edge-rendered caching distributed to 275+ global cloud PoPs across London, Manchester, and worldwide.',
    color: '#3D5AFE',
    accentClass: 'text-electric border-electric/40 bg-electric/10',
  },
  {
    id: 'ai_citations',
    number: '03',
    label: 'AI Knowledge Graph',
    shortLabel: '03 AI GRAPH',
    location: 'Tycho High Crater',
    coords: { lat: -40, lon: -11 },
    metric: '100% Valid',
    metricLabel: 'Deep JSON-LD Schema',
    spec: 'Machine-readable semantic entities engineered so ChatGPT, Perplexity, and Google SGE cite your business directly.',
    color: '#7B61FF',
    accentClass: 'text-purple border-purple/40 bg-purple/10',
  },
  {
    id: 'zero_bloat',
    number: '04',
    label: '0-Bloat React Runtime',
    shortLabel: '04 0-BLOAT',
    location: 'Copernicus Crater',
    coords: { lat: 10, lon: -20 },
    metric: '184 KB',
    metricLabel: 'Initial Bundle Weight',
    spec: 'No 40MB WordPress themes, no fragile plugins. Handwritten React + Vite compiled to ultra-lean native bytecode.',
    color: '#00E676',
    accentClass: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
  },
]

export default function VectorMoonCanvas({ className = '', onLanded = null }) {
  const mountRef = useRef(null)
  const [activeHotspot, setActiveHotspot] = useState(null)
  const [telemetryCoords, setTelemetryCoords] = useState({
    lat: '+0.00°',
    lon: '+0.00°',
    mode: 'ORBIT FREE-FLIGHT',
  })

  // Safe camera distance constants: Guaranteed zero clipping
  const BASE_CAMERA_Z = 6.6
  const FOCUS_CAMERA_Z = 5.7

  // Bridge ref for Three.js state
  const threeBridgeRef = useRef({
    targetRotationX: null,
    targetRotationY: null,
    targetCameraZ: BASE_CAMERA_Z,
    isFocusing: false,
    baseZ: BASE_CAMERA_Z,
  })

  // Trigger hotspot focus
  const handleSelectHotspot = useCallback((spot) => {
    playCameraSwoop()
    playTelemetryPing(true)

    if (activeHotspot?.id === spot.id) {
      // Toggle off / reset to free orbit
      setActiveHotspot(null)
      threeBridgeRef.current.isFocusing = false
      threeBridgeRef.current.targetCameraZ = threeBridgeRef.current.baseZ
      threeBridgeRef.current.targetRotationX = null
      threeBridgeRef.current.targetRotationY = null
      setTelemetryCoords((c) => ({ ...c, mode: 'ORBIT FREE-FLIGHT' }))
      return
    }

    setActiveHotspot(spot)
    threeBridgeRef.current.isFocusing = true
    // Smooth focus distance with safe padding
    threeBridgeRef.current.targetCameraZ = FOCUS_CAMERA_Z

    // Calculate rotation angles to bring coordinates facing the camera (+Z)
    const latRad = (spot.coords.lat * Math.PI) / 180
    const lonRad = (spot.coords.lon * Math.PI) / 180

    threeBridgeRef.current.targetRotationX = latRad
    threeBridgeRef.current.targetRotationY = -lonRad

    setTelemetryCoords({
      lat: (spot.coords.lat >= 0 ? '+' : '') + spot.coords.lat.toFixed(2) + '° N',
      lon: (spot.coords.lon >= 0 ? '+' : '') + spot.coords.lon.toFixed(2) + '° E',
      mode: `LOCK // ${spot.shortLabel}`,
    })
  }, [activeHotspot])

  const handleResetOrbit = useCallback(() => {
    playHapticClick()
    setActiveHotspot(null)
    threeBridgeRef.current.isFocusing = false
    threeBridgeRef.current.targetCameraZ = threeBridgeRef.current.baseZ
    threeBridgeRef.current.targetRotationX = null
    threeBridgeRef.current.targetRotationY = null
    setTelemetryCoords((c) => ({ ...c, mode: 'ORBIT FREE-FLIGHT' }))
  }, [])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    let animationFrameId
    let isVisible = true

    const width = container.clientWidth || 600
    const height = container.clientHeight || 600

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)

    // Compute aspect-aware safe distance so moon NEVER clips
    const computeSafeZ = (aspect) => {
      const base = BASE_CAMERA_Z
      if (aspect < 1.0) {
        return base / aspect // Push camera back on narrow screens
      }
      return base
    }

    const initialSafeZ = computeSafeZ(width / height)
    threeBridgeRef.current.baseZ = initialSafeZ
    threeBridgeRef.current.targetCameraZ = initialSafeZ
    camera.position.set(0, 0, 26) // Starts deep in space for smooth zoom-in dive

    // Renderer (100% transparent alpha to avoid any square frame edges)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // Master Group for all objects
    const masterGroup = new THREE.Group()
    scene.add(masterGroup)

    // --- Texture Loading (Authentic NASA Lunar Map) ---
    const textureLoader = new THREE.TextureLoader()
    const moonTexture = textureLoader.load('/textures/moon_1024.jpg')
    moonTexture.colorSpace = THREE.SRGBColorSpace

    // 1. High-Detail Lunar Sphere (Scaled to 1.25 to leave 40% margin on all sides)
    const moonRadius = 1.25
    const moonGeo = new THREE.SphereGeometry(moonRadius, 128, 128)
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTexture,
      bumpMap: moonTexture,
      bumpScale: 0.024,
      roughness: 0.88,
      metalness: 0.02,
    })
    const moonMesh = new THREE.Mesh(moonGeo, moonMat)
    moonMesh.rotation.x = 0.22
    moonMesh.rotation.y = 1.6
    masterGroup.add(moonMesh)

    // 2. Subtle Atmospheric Fresnel Rim Glow
    const fresnelVertex = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `
    const fresnelFragment = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        float fresnel = clamp(1.0 - dot(normal, viewDir), 0.0, 1.0);
        fresnel = pow(fresnel, 3.2);

        vec3 rimCyan = vec3(0.0, 0.776, 1.0);
        vec3 rimViolet = vec3(0.482, 0.380, 1.0);
        vec3 glow = mix(rimCyan, rimViolet, normal.y * 0.5 + 0.5);

        gl_FragColor = vec4(glow, fresnel * 0.75);
      }
    `
    const haloGeo = new THREE.SphereGeometry(moonRadius * 1.02, 64, 64)
    const haloMat = new THREE.ShaderMaterial({
      vertexShader: fresnelVertex,
      fragmentShader: fresnelFragment,
      blending: THREE.AdditiveBlending,
      transparent: true,
      side: THREE.BackSide,
    })
    const haloMesh = new THREE.Mesh(haloGeo, haloMat)
    masterGroup.add(haloMesh)

    // 3. Delicate Luminous Holographic Orbit Rings (Safely scaled inside camera frustum)
    // Ring A (Cyan Primary Track)
    const ringGeoA = new THREE.TorusGeometry(1.80, 0.005, 16, 160)
    const ringMatA = new THREE.MeshBasicMaterial({
      color: 0x00c6ff,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    })
    const ringA = new THREE.Mesh(ringGeoA, ringMatA)
    ringA.rotation.x = Math.PI / 2.6
    ringA.rotation.y = Math.PI / 8
    masterGroup.add(ringA)

    // Ring B (Violet Secondary Gimbal)
    const ringGeoB = new THREE.TorusGeometry(2.10, 0.004, 16, 160)
    const ringMatB = new THREE.MeshBasicMaterial({
      color: 0x7b61ff,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    })
    const ringB = new THREE.Mesh(ringGeoB, ringMatB)
    ringB.rotation.x = -Math.PI / 3.2
    ringB.rotation.z = Math.PI / 6
    masterGroup.add(ringB)

    // 4. Orbiting Micro-Nodes (Satellite Beacons)
    const beaconGeo = new THREE.SphereGeometry(0.03, 16, 16)
    const beaconMatCyan = new THREE.MeshBasicMaterial({ color: 0x00c6ff })
    const beaconA = new THREE.Mesh(beaconGeo, beaconMatCyan)
    masterGroup.add(beaconA)

    const beaconMatViolet = new THREE.MeshBasicMaterial({ color: 0xb794f6 })
    const beaconB = new THREE.Mesh(beaconGeo, beaconMatViolet)
    masterGroup.add(beaconB)

    // 5. Hotspot Beacon Markers permanently attached to Moon Surface
    const hotspotGroups = []

    LUNAR_HOTSPOTS.forEach((spot) => {
      const latRad = (spot.coords.lat * Math.PI) / 180
      const lonRad = (spot.coords.lon * Math.PI) / 180

      const hGroup = new THREE.Group()
      const x = moonRadius * Math.cos(latRad) * Math.sin(lonRad)
      const y = moonRadius * Math.sin(latRad)
      const z = moonRadius * Math.cos(latRad) * Math.cos(lonRad)
      hGroup.position.set(x, y, z)
      hGroup.lookAt(x * 2, y * 2, z * 2)

      // Core point
      const coreGeo = new THREE.SphereGeometry(0.036, 16, 16)
      const coreMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(spot.color),
      })
      const coreMesh = new THREE.Mesh(coreGeo, coreMat)
      hGroup.add(coreMesh)

      // Pulsing Ring
      const pRingGeo = new THREE.RingGeometry(0.05, 0.075, 32)
      const pRingMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(spot.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      })
      const pRing = new THREE.Mesh(pRingGeo, pRingMat)
      hGroup.add(pRing)

      // Stem line
      const stemGeo = new THREE.CylinderGeometry(0.004, 0.004, 0.1, 8)
      const stemMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(spot.color) })
      const stem = new THREE.Mesh(stemGeo, stemMat)
      stem.position.z = 0.05
      stem.rotation.x = Math.PI / 2
      hGroup.add(stem)

      hGroup.userData = { spotId: spot.id, pRing }
      moonMesh.add(hGroup)
      hotspotGroups.push(hGroup)
    })

    // 6. Floating Celestial Dust Swarm (Kept within safe bounds)
    const dustCount = 80
    const dustGeo = new THREE.BufferGeometry()
    const dustPositions = new Float32Array(dustCount * 3)
    const dustColors = new Float32Array(dustCount * 3)

    for (let i = 0; i < dustCount; i++) {
      const angle = (i / dustCount) * Math.PI * 2
      const r = 1.6 + (Math.random() - 0.5) * 0.6
      dustPositions[i * 3] = Math.cos(angle) * r
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.4
      dustPositions[i * 3 + 2] = Math.sin(angle) * r

      const isCyan = Math.random() > 0.4
      dustColors[i * 3] = isCyan ? 0.0 : 0.48
      dustColors[i * 3 + 1] = isCyan ? 0.78 : 0.38
      dustColors[i * 3 + 2] = 1.0
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3))

    const dustMat = new THREE.PointsMaterial({
      size: 0.026,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    })
    const dustPoints = new THREE.Points(dustGeo, dustMat)
    dustPoints.rotation.x = Math.PI / 3.5
    masterGroup.add(dustPoints)

    // --- Cinematic Studio Lighting ---
    const sunLight = new THREE.DirectionalLight(0xffffff, 3.8)
    sunLight.position.set(5.5, 3.0, 4.2)
    scene.add(sunLight)

    const earthshine = new THREE.DirectionalLight(0x1a2e55, 1.4)
    earthshine.position.set(-5, -2, -3)
    scene.add(earthshine)

    const rimAccent = new THREE.PointLight(0x00c6ff, 2.5, 10)
    rimAccent.position.set(-2, 3, -2)
    scene.add(rimAccent)

    const ambient = new THREE.AmbientLight(0x0c1222, 1.2)
    scene.add(ambient)

    // --- Smooth Camera Dive State ---
    const startTime = performance.now()
    const diveDuration = 1200
    let hasLanded = false

    // Mouse & Touch Drag Physics
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    let isDragging = false
    let prevX = 0
    let prevY = 0
    let dragVelocityX = 0
    let dragVelocityY = 0

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouse.targetX = x * 0.35
      mouse.targetY = y * 0.2

      if (isDragging) {
        if (threeBridgeRef.current.isFocusing) {
          threeBridgeRef.current.isFocusing = false
          threeBridgeRef.current.targetRotationX = null
          threeBridgeRef.current.targetRotationY = null
        }

        const deltaX = e.clientX - prevX
        const deltaY = e.clientY - prevY
        dragVelocityX = deltaX * 0.006
        dragVelocityY = deltaY * 0.006
        moonMesh.rotation.y += dragVelocityX
        moonMesh.rotation.x += dragVelocityY
        prevX = e.clientX
        prevY = e.clientY
      }
    }

    const onPointerDown = (e) => {
      isDragging = true
      prevX = e.clientX
      prevY = e.clientY
      dragVelocityX = 0
      dragVelocityY = 0
    }

    const onPointerUp = () => {
      isDragging = false
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    container.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)

    // Resize Observer: Dynamically recalculates safe camera Z
    const resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry) return
      const { width: w, height: h } = entry.contentRect
      if (w > 0 && h > 0) {
        const aspect = w / h
        camera.aspect = aspect
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)

        const safeZ = computeSafeZ(aspect)
        threeBridgeRef.current.baseZ = safeZ
        if (!threeBridgeRef.current.isFocusing) {
          threeBridgeRef.current.targetCameraZ = safeZ
        }
      }
    })
    resizeObserver.observe(container)

    // Visibility Observer
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })
    intersectionObserver.observe(container)

    // Animation Loop
    const clock = new THREE.Clock()

    function animate(currentTime) {
      animationFrameId = requestAnimationFrame(animate)
      if (!isVisible) return

      const delta = clock.getDelta()
      const elapsed = clock.getElapsedTime()

      // 1. Initial Dive or Camera Zoom Interpolation
      const timePassed = currentTime - startTime
      const landingTargetZ = threeBridgeRef.current.targetCameraZ

      if (timePassed < diveDuration) {
        const p = Math.min(timePassed / diveDuration, 1.0)
        const ease = 1 - Math.pow(1 - p, 4)
        camera.position.z = 26 - (26 - landingTargetZ) * ease
      } else {
        if (!hasLanded) {
          hasLanded = true
          onLanded?.()
        }
        camera.position.z += (landingTargetZ - camera.position.z) * 0.06
      }

      // 2. Pulse Hotspot Rings
      hotspotGroups.forEach((h, idx) => {
        const pRing = h.userData.pRing
        if (pRing) {
          const pulse = (Math.sin(elapsed * 4.0 + idx * 1.5) + 1) * 0.5
          pRing.scale.setScalar(1.0 + pulse * 0.7)
          pRing.material.opacity = 0.9 - pulse * 0.4
        }
      })

      // 3. Focus Interpolation vs Free-Flight Drag Physics
      if (threeBridgeRef.current.isFocusing && threeBridgeRef.current.targetRotationY !== null) {
        const targetX = threeBridgeRef.current.targetRotationX
        const targetY = threeBridgeRef.current.targetRotationY

        moonMesh.rotation.x += (targetX - moonMesh.rotation.x) * 0.08
        moonMesh.rotation.y += (targetY - moonMesh.rotation.y) * 0.08
      } else {
        if (!isDragging) {
          dragVelocityX *= 0.94
          dragVelocityY *= 0.94
          moonMesh.rotation.y += dragVelocityX
          moonMesh.rotation.x += dragVelocityY
          moonMesh.rotation.y += delta * 0.08 // Continuous smooth axial rotation
        }
      }

      // Smooth mouse parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05

      // Orbiting ring counter-drifts
      ringA.rotation.z += delta * 0.06
      ringB.rotation.z -= delta * 0.04
      dustPoints.rotation.y += delta * 0.05

      // Orbiting beacon positions
      const angleA = elapsed * 0.4
      beaconA.position.set(Math.cos(angleA) * 1.80, Math.sin(angleA) * 0.4, Math.sin(angleA) * 1.80)

      const angleB = -elapsed * 0.35 + 2.0
      beaconB.position.set(Math.cos(angleB) * 2.10, Math.sin(angleB) * 0.5, Math.sin(angleB) * 2.10)

      // Gentle floating breathing motion
      masterGroup.position.y = Math.sin(elapsed * 1.2) * 0.05
      masterGroup.rotation.y = mouse.x * 0.3
      masterGroup.rotation.x = -mouse.y * 0.2

      renderer.render(scene, camera)
    }

    animationFrameId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      moonGeo.dispose()
      moonMat.dispose()
      haloGeo.dispose()
      haloMat.dispose()
      ringGeoA.dispose()
      ringMatA.dispose()
      ringGeoB.dispose()
      ringMatB.dispose()
      beaconGeo.dispose()
      beaconMatCyan.dispose()
      beaconMatViolet.dispose()
      dustGeo.dispose()
      dustMat.dispose()
      moonTexture.dispose()
      renderer.dispose()
    }
  }, [onLanded])

  return (
    <div className={`relative flex flex-col items-center w-full select-none overflow-visible ${className}`}>
      {/* 3D WebGL Viewport Container (Unconstrained, generous height, zero hard boundary) */}
      <div
        ref={mountRef}
        className="relative h-[480px] sm:h-[540px] lg:h-[600px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible"
        style={{ touchAction: 'none' }}
        title="Click and drag to rotate the photorealistic VectorMoon"
      />

      {/* Futuristic Telemetry Dock & Hotspot Switcher (Below the moon so moon is NEVER covered or clipped) */}
      <div className="w-full max-w-[560px] px-2 z-20">
        {/* Ticker & Coordinate Telemetry */}
        <div className="flex items-center justify-between px-4 py-2 rounded-t-2xl bg-white/[0.04] border-t border-x border-white/10 text-[11px] font-mono text-text-secondary backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
            <span className="text-white font-medium">{telemetryCoords.mode}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>LAT: <strong className="text-white/90">{telemetryCoords.lat}</strong></span>
            <span>LON: <strong className="text-white/90">{telemetryCoords.lon}</strong></span>
          </div>
        </div>

        {/* Hotspot Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 p-2 rounded-b-2xl border border-white/10 bg-nebula/80 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          {LUNAR_HOTSPOTS.map((spot) => {
            const isSelected = activeHotspot?.id === spot.id
            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => handleSelectHotspot(spot)}
                className={`flex-1 min-w-[95px] py-2 px-2.5 rounded-xl text-[10px] font-mono font-medium transition-all duration-300 text-center ${
                  isSelected
                    ? 'bg-cyan text-void font-bold shadow-[0_0_20px_rgba(0,198,255,0.5)] scale-[1.02]'
                    : 'text-text-secondary hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                }`}
                data-cursor="pointer"
              >
                {spot.shortLabel}
              </button>
            )
          })}
          {activeHotspot && (
            <button
              type="button"
              onClick={handleResetOrbit}
              className="py-2 px-3 rounded-xl text-[10px] font-mono text-text-secondary hover:text-white border border-white/10 hover:bg-white/5 transition"
              title="Reset to free continuous rotation"
            >
              FREE ORBIT ↺
            </button>
          )}
        </div>

        {/* Integrated Hotspot Disclosure Drawer: Sits cleanly BELOW the moon */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-2xl border border-cyan/40 bg-white/[0.04] p-5 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,198,255,0.15)]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${activeHotspot.accentClass}`}>
                    {activeHotspot.shortLabel}
                  </span>
                  <span className="font-mono text-xs text-text-secondary">{activeHotspot.location}</span>
                </div>
                <button
                  type="button"
                  onClick={handleResetOrbit}
                  className="text-white/50 hover:text-white text-xs font-mono p-1 transition"
                  aria-label="Close hotspot view"
                >
                  ✕
                </button>
              </div>

              <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-3xl font-bold font-mono text-white tracking-tight">
                    {activeHotspot.metric}
                  </div>
                  <div className="text-xs font-mono text-cyan uppercase tracking-wider">
                    {activeHotspot.metricLabel}
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-text-secondary max-w-sm">
                  {activeHotspot.spec}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
