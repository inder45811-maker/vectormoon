export default function BorderBeam({
  className = '',
  size = 180,
  duration = 8,
  colorFrom = '#00C6FF',
  colorTo = '#7B61FF',
}) {
  return (
    <div
      className={`pointer-events-none absolute -inset-[1px] rounded-[inherit] overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className="absolute -inset-[100%] animate-[spin_8s_linear_infinite]"
        style={{
          animationDuration: `${duration}s`,
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 60deg, ${colorFrom} 120deg, ${colorTo} 160deg, transparent 200deg, transparent 360deg)`,
        }}
      />
      {/* Inner card backdrop cutout so only 1px - 2px perimeter glows */}
      <div className="absolute inset-[1px] rounded-[inherit] bg-inherit" />
    </div>
  )
}
