/** Decorative orbital rings — signature VectorMoon graphic */
export default function OrbitRing({ className = '', size = 520 }) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width={size}
      height={size}
      viewBox="0 0 520 520"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C6FF" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#3D5AFE" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#7B61FF" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <circle cx="260" cy="260" r="240" stroke="url(#orbitGrad)" strokeWidth="1" strokeDasharray="4 10" opacity="0.5" />
      <circle cx="260" cy="260" r="180" stroke="url(#orbitGrad)" strokeWidth="1" opacity="0.35" />
      <circle cx="260" cy="260" r="110" stroke="url(#orbitGrad)" strokeWidth="1.5" opacity="0.45" />
      <circle cx="260" cy="50" r="5" fill="#00C6FF" className="orbit-sat" />
      <circle cx="440" cy="300" r="4" fill="#7B61FF" opacity="0.9" />
      <circle cx="120" cy="380" r="3" fill="#3D5AFE" />
    </svg>
  )
}
