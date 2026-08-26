import Link from 'next/link';

const links = [
  { href: '/admin', label: 'Overview' },
  { href: '#guests', label: 'Guests (RSVPs)' },
  { href: '#wishes', label: 'Wishes Wall' },
  { href: '#gallery', label: 'Gallery Manager' },
  { href: '#settings', label: 'Settings' },
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div>
        <h2>Admin Dashboard</h2>
        <nav aria-label="Admin navigation">
          {links.map(({ href, label }, index) => (
            <Link key={label} href={href} className={index === 0 ? 'is-active' : undefined}>{label}</Link>
          ))}
        </nav>
      </div>
      <button className="admin-logout" type="button">Logout</button>
    </aside>
  );
}
