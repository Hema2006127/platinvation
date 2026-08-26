import Skeleton from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <main className="page-skeleton" aria-label="Loading invitation">
      <Skeleton className="page-skeleton__hero" />
      <section className="page-skeleton__content">
        <Skeleton className="page-skeleton__heading" />
        <Skeleton className="page-skeleton__text" />
        <Skeleton className="page-skeleton__text page-skeleton__text--short" />
      </section>
    </main>
  );
}
