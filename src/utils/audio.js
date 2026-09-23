// Procedural Web Audio Engine for VectorMoon — zero external audio files needed

let audioCtx = null
let droneGain = null
let osc1 = null
let osc2 = null
let isMuted = true

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export function toggleAudio() {
  const ctx = getAudioContext()
  if (!ctx) return false

  isMuted = !isMuted

  if (!isMuted) {
    startDrone()
    playChime(587.33) // D5 chime
  } else {
    stopDrone()
  }

  return !isMuted
}

export function isAudioActive() {
  return !isMuted
}

function startDrone() {
  const ctx = getAudioContext()
  if (!ctx || droneGain) return

  droneGain = ctx.createGain()
  droneGain.gain.setValueAtTime(0, ctx.currentTime)
  droneGain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 2.0)

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(140, ctx.currentTime)

  // Sub drone 55Hz
  osc1 = ctx.createOscillator()
  osc1.type = 'sine'
  osc1.frequency.setValueAtTime(55, ctx.currentTime)

  // Harmonic 110Hz
  osc2 = ctx.createOscillator()
  osc2.type = 'sine'
  osc2.frequency.setValueAtTime(110, ctx.currentTime)

  osc1.connect(filter)
  osc2.connect(filter)
  filter.connect(droneGain)
  droneGain.connect(ctx.destination)

  osc1.start()
  osc2.start()
}

function stopDrone() {
  const ctx = getAudioContext()
  if (!ctx || !droneGain) return

  droneGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.8)
  setTimeout(() => {
    try {
      osc1?.stop()
      osc2?.stop()
      osc1?.disconnect()
      osc2?.disconnect()
    } catch {
      // Ignored
    }
    osc1 = null
    osc2 = null
    droneGain = null
  }, 900)
}

/** Delicate sci-fi micro-click for magnetic buttons */
export function playHapticClick() {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'triangle'
  osc.frequency.setValueAtTime(1200, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.025)

  gain.gain.setValueAtTime(0.05, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start()
  osc.stop(ctx.currentTime + 0.025)
}

/** Pentatonic feedback chime for calculators & tabs */
export function playChime(freq = 440) {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(freq, ctx.currentTime)

  gain.gain.setValueAtTime(0.08, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start()
  osc.stop(ctx.currentTime + 0.4)
}

/** Futuristic camera swoop for 3D hotspots */
export function playCameraSwoop() {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const filter = ctx.createBiquadFilter()

  osc.type = 'sine'
  filter.type = 'bandpass'
  filter.Q.value = 4.0

  osc.frequency.setValueAtTime(180, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.3)
  osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.5)

  filter.frequency.setValueAtTime(220, ctx.currentTime)
  filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3)

  gain.gain.setValueAtTime(0.001, ctx.currentTime)
  gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.15)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)

  osc.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)

  osc.start()
  osc.stop(ctx.currentTime + 0.5)
}

/** Diagnostic terminal audit scan sweep */
export function playScanSweep() {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(300, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.18)

  gain.gain.setValueAtTime(0.03, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start()
  osc.stop(ctx.currentTime + 0.18)
}

/** High-frequency orbital telemetry ping */
export function playTelemetryPing(high = true) {
  if (isMuted) return
  const ctx = getAudioContext()
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(high ? 1760 : 880, ctx.currentTime) // A6 or A5

  gain.gain.setValueAtTime(0.05, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start()
  osc.stop(ctx.currentTime + 0.22)
}

