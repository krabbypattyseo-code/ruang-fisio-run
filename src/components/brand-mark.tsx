/**
 * Placeholder mark bergaya aset asli: pintu terbuka dengan figur pelari di dalamnya.
 * Ganti dengan logo-07.svg dari brand folder Ruang Fisio saat berkasnya tersedia.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="Ruang Fisio Run"
      className={className}
      fill="none"
    >
      <rect x="2" y="2" width="44" height="44" rx="12" fill="var(--brand-teal)" />
      <path
        d="M14 38V14a4 4 0 0 1 4-4h12"
        stroke="var(--brand-cyan)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M34 10v28"
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="26.5" cy="17.5" r="2.6" fill="#ffffff" />
      <path
        d="M22 31.5l3.2-5.4 4.6 1.6-1.4 4"
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.2 26.1l-3.9-1.5 4.5-3 3.4 2.2"
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.4 31.7l2.6 4.3"
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
