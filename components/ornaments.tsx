export function OrnamentalDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold md:w-32" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold">
        <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8Z" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.5" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold md:w-32" />
    </div>
  );
}

export function PaisleyPattern({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <pattern id="paisley" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M25 5C15 5 10 15 15 25C18 32 25 35 25 45C25 35 32 32 35 25C40 15 35 5 25 5Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="25" cy="22" r="3" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </pattern>
      <rect width="100" height="50" fill="url(#paisley)" />
    </svg>
  );
}

export function TempleBorder({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="none">
      <pattern id="temple" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M0 20L0 8L5 3L10 8L10 20Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <path d="M10 20L10 12L15 7L20 12L20 20Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
      </pattern>
      <rect width="200" height="20" fill="url(#temple)" />
    </svg>
  );
}

export function MandalaSpinner({ className = '' }: { className?: string }) {
  return (
    <svg className={`animate-spin-slow ${className}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" fill="none" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <path d="M50 5C55 15 55 25 50 35C45 25 45 15 50 5Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </g>
      ))}
      <circle cx="50" cy="50" r="5" fill="currentColor" />
    </svg>
  );
}
