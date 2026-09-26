/* Three stacked plates: casing, trench, face. */
export function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <svg className="brand-mark" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="2" y="9" width="24" height="20" rx="5" className="brand-mark__casing" />
      <rect x="4.5" y="6" width="23" height="19" rx="4" className="brand-mark__trench" />
      <rect x="7" y="3" width="22" height="18" rx="3.5" className="brand-mark__face" />
    </svg>
  );
}
