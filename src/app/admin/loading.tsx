import Skeleton from '@/components/ui/Skeleton';

export default function AdminLoading() {
  return (
    <div className="admin-loading" aria-label="Loading dashboard">
      <Skeleton className="admin-loading__title" />
      <div className="admin-loading__metrics">
        {Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="admin-loading__metric" />)}
      </div>
      <Skeleton className="admin-loading__table" />
    </div>
  );
}
