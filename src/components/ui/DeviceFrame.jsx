/** Browser chrome frame for portfolio screenshots */
export default function DeviceFrame({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
}) {
  return (
    <div
      className={`device-frame group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e18] shadow-[0_40px_100px_rgba(0,0,0,0.55)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-[10px] tracking-wide text-text-secondary">
          {alt}
        </div>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-void">
        {src ? (
          <img
            src={src}
            alt={alt}
            width="2880"
            height="1800"
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            loading={loading}
            fetchPriority={fetchPriority}
            decoding="async"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-text-secondary text-sm">Preview</div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent opacity-60" />
      </div>
    </div>
  )
}
