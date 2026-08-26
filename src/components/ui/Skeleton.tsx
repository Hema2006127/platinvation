type SkeletonProps = { className?: string };

export default function Skeleton({ className = '' }: SkeletonProps) {
  return <span className={`skeleton ${className}`} aria-hidden="true" />;
}
