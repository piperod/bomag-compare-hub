import { ArrowUpCircle } from 'lucide-react';

interface BomagAdvantageBadgeProps {
  title: string;
}

export function BomagAdvantageBadge({ title }: BomagAdvantageBadgeProps) {
  return (
    <span
      className="inline-flex shrink-0 items-center text-green-600"
      title={title}
      aria-label={title}
    >
      <ArrowUpCircle className="h-4 w-4" strokeWidth={2.25} />
    </span>
  );
}
