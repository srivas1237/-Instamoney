import Link from 'next/link'

interface BrandMarkProps {
  compact?: boolean
  href?: string
  className?: string
}

export default function BrandMark({
  compact = false,
  href = '/',
  className = '',
}: BrandMarkProps) {
  const logoSize = compact ? 'h-14 sm:h-16' : 'h-16 sm:h-20'

  return (
    <Link href={href} className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <img
        src="/kashless.png"
        alt="Kashless"
        className={`${logoSize} w-auto object-contain drop-shadow-[0_12px_30px_rgba(255,130,92,0.18)]`}
      />
    </Link>
  )
}
