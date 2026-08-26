'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useToast } from '@/components/ui/ToastContext';
import ToastProvider from '@/components/ui/ToastProvider';
import QrInvitationManager from '@/components/diamond/QrInvitationManager';
import EntryPass from '@/components/diamond/EntryPass';
import { INVITATION_CONFIG } from '@/lib/invitation-config';

/* ── Mock data ── */
const metrics = [
  { title: 'Total Invited', value: '150', suffix: '',  color: 'var(--gold)',    icon: '👥', change: '+12%' },
  { title: 'Confirmed',     value: '85',  suffix: '',  color: '#6ee7b7',        icon: '✅', change: '+8%'  },
  { title: 'Declined',      value: '12',  suffix: '',  color: '#f87171',        icon: '❌', change: '-3%'  },
  { title: 'Pending',       value: '53',  suffix: '',  color: '#fcd34d',        icon: '⏳', change: '-5%'  },
  { title: 'Inv. Views',    value: '1.2k',suffix: '',  color: '#93c5fd',        icon: '👁', change: '+22%' },
  { title: 'QR Scans',      value: '89',  suffix: '',  color: '#c4b5fd',        icon: '📱', change: '+14%' },
];

const rsvpData = [
  { month: 'Oct', confirmed: 20, declined: 3, pending: 15 },
  { month: 'Nov', confirmed: 35, declined: 5, pending: 22 },
  { month: 'Dec', confirmed: 30, declined: 4, pending: 16 },
];

const statusPie = [
  { name: 'Confirmed', value: 85, color: '#6ee7b7' },
  { name: 'Declined',  value: 12, color: '#f87171' },
  { name: 'Pending',   value: 53, color: '#fcd34d' },
];

const viewsData = [
  { day: 'Mon', views: 42, scans: 8 },
  { day: 'Tue', views: 58, scans: 12 },
  { day: 'Wed', views: 73, scans: 19 },
  { day: 'Thu', views: 65, scans: 14 },
  { day: 'Fri', views: 89, scans: 23 },
  { day: 'Sat', views: 112, scans: 31 },
  { day: 'Sun', views: 97, scans: 27 },
];

const recentRsvps = [
  { name: 'John Doe',       phone: '+1 234 567 890', guests: 2, status: 'Confirmed', color: '#6ee7b7' },
  { name: 'Jane Smith',     phone: '+1 987 654 321', guests: 1, status: 'Declined',  color: '#f87171' },
  { name: 'Michael Scott',  phone: '+1 555 123 456', guests: 4, status: 'Pending',   color: '#fcd34d' },
  { name: 'Sara Johnson',   phone: '+1 444 987 654', guests: 2, status: 'Confirmed', color: '#6ee7b7' },
  { name: 'Ali Al-Mansoor', phone: '+971 50 123 456', guests: 3, status: 'Confirmed', color: '#6ee7b7' },
];

const SIDEBAR_LINKS = [
  { href: '#overview', label: 'Overview',        icon: '📊' },
  { href: '#guests',   label: 'Guests & RSVPs',  icon: '👥' },
  { href: '#analytics',label: 'Analytics',       icon: '📈' },
  { href: '#qr',       label: 'QR Invitations',  icon: '🔲' },
  { href: '#pass',     label: 'Entry Passes',     icon: '💎' },
  { href: '#settings', label: 'Settings',         icon: '⚙️' },
];

type FilterStatus = 'All' | 'Confirmed' | 'Declined' | 'Pending';

/* ── Tooltip ── */
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'rgba(32,30,23,0.97)', border: '1px solid rgba(193,102,59,0.25)', borderRadius: 12, padding: '0.75rem 1rem' }}>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', marginBottom: '0.5rem' }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color, fontSize: '0.85rem' }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  return (
    <ToastProvider>
      <AdminDashboardContent />
    </ToastProvider>
  );
}

function AdminDashboardContent() {
  const { notify } = useToast();
  const [activeLink, setActiveLink] = useState('#overview');
  const [filter, setFilter] = useState<FilterStatus>('All');
  const [search, setSearch] = useState('');
  const [musicUrl, setMusicUrl] = useState<string>(INVITATION_CONFIG.musicUrl);

  const filteredRsvps = recentRsvps.filter(r => {
    const matchFilter = filter === 'All' || r.status === filter;
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.phone.includes(search);
    return matchFilter && matchSearch;
  });

  return (
    <div className="admin-shell">
      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div>
          <h2>✦ Admin</h2>
          <nav aria-label="Admin navigation">
            {SIDEBAR_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={activeLink === link.href ? 'is-active' : ''}
                onClick={() => setActiveLink(link.href)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}
              >
                <span style={{ fontSize: '1rem' }}>{link.icon}</span>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <div style={{ padding: '0.75rem', border: '1px solid rgba(193,102,59,0.15)', borderRadius: 12, marginBottom: '0.75rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
            💎 Diamond Plan Active
          </div>
          <button className="admin-logout" type="button" onClick={() => notify('Logging out…', 'info')}>
            → Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="admin-main">

        {/* Header */}
        <div className="admin-dashboard__header" id="overview">
          <div>
            <p className="admin-dashboard__eyebrow">Wedding Management</p>
            <h1>Overview</h1>
          </div>
          <button
            className="admin-dashboard__export"
            onClick={() => notify('Your attendance export is being prepared.', 'info')}
          >
            ↓ Export RSVPs
          </button>
        </div>

        {/* Metrics */}
        <section className="admin-dashboard__metrics" aria-label="Key metrics" style={{ gridTemplateColumns: 'repeat(3, minmax(0,1fr))' }}>
          {metrics.map((m, i) => (
            <motion.article
              key={m.title}
              className="admin-stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3>{m.title}</h3>
                <span style={{ fontSize: '1.4rem' }}>{m.icon}</span>
              </div>
              <strong style={{ color: m.color, display: 'block', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 300 }}>
                {m.value}
              </strong>
              <span style={{ fontSize: '0.72rem', color: m.change.startsWith('+') ? '#6ee7b7' : '#f87171' }}>
                {m.change} this week
              </span>
            </motion.article>
          ))}
        </section>

        {/* ── Analytics Section ── */}
        <section id="analytics" style={{ marginBottom: 'clamp(2.5rem, 7vw, 4rem)' }}>
          <div className="admin-dashboard__section-heading">
            <div>
              <p>Diamond Analytics</p>
              <h2>Insights</h2>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>Live Data</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            {/* RSVP Bar Chart */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>RSVP by Month</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={rsvpData} barSize={16}>
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={11} />
                  <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="confirmed" fill="#6ee7b7" radius={4} name="Confirmed" />
                  <Bar dataKey="declined"  fill="#f87171" radius={4} name="Declined" />
                  <Bar dataKey="pending"   fill="#fcd34d" radius={4} name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Attendance Pie */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Attendance Status</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={statusPie} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                    {statusPie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v, n) => [v, n]} contentStyle={{ background: 'rgba(32,30,23,0.97)', border: '1px solid rgba(193,102,59,0.2)', borderRadius: 12 }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Views + QR Scans Line Chart */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)', padding: '1.5rem', gridColumn: 'span 2' }}>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Invitation Views & QR Scans (7 days)</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={viewsData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" fontSize={11} />
                  <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="views" stroke="var(--gold)" strokeWidth={2} dot={{ fill: 'var(--gold)', r: 3 }} name="Views" />
                  <Line type="monotone" dataKey="scans" stroke="#c4b5fd" strokeWidth={2} dot={{ fill: '#c4b5fd', r: 3 }} name="QR Scans" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* ── Guests Table ── */}
        <section id="guests" style={{ marginBottom: 'clamp(2.5rem, 7vw, 4rem)' }}>
          <div className="admin-dashboard__section-heading">
            <div>
              <p>Guest Management</p>
              <h2>Recent RSVPs</h2>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem' }}>{filteredRsvps.length} results</span>
          </div>

          {/* Search + Filter */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <input
              type="search"
              placeholder="Search guests…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1, minWidth: 200, padding: '0.7rem 1rem',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10, color: '#fff', fontSize: '0.88rem', outline: 'none',
              }}
            />
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {(['All', 'Confirmed', 'Declined', 'Pending'] as FilterStatus[]).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '0.6rem 1.1rem', borderRadius: 8, fontSize: '0.8rem', cursor: 'pointer',
                    border: filter === f ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.08)',
                    background: filter === f ? 'rgba(193,102,59,0.12)' : 'rgba(255,255,255,0.03)',
                    color: filter === f ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
                    transition: 'all 0.2s',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Guests</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredRsvps.map(guest => (
                    <motion.tr
                      key={guest.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td style={{ color: '#fff', fontWeight: 500 }}>{guest.name}</td>
                      <td>{guest.phone}</td>
                      <td>{guest.guests}</td>
                      <td>
                        <span style={{ background: `${guest.color}18`, color: guest.color }}>
                          {guest.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => notify(`QR invitation sent to ${guest.name}.`)}
                          style={{
                            padding: '0.35rem 0.75rem', borderRadius: 8, fontSize: '0.72rem',
                            background: 'rgba(193,102,59,0.1)', border: '1px solid rgba(193,102,59,0.25)',
                            color: 'var(--gold)', cursor: 'pointer',
                          }}
                        >
                          Send QR
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── QR Invitation Manager ── */}
        <section id="qr" style={{ marginBottom: 'clamp(2.5rem, 7vw, 4rem)' }}>
          <div className="admin-dashboard__section-heading" style={{ marginBottom: '1.5rem' }}>
            <div>
              <p>Diamond Feature</p>
              <h2>QR Invitations</h2>
            </div>
          </div>
          <QrInvitationManager guestId="00000000-0000-0000-0000-000000000001" guestName="Honoured Guest" />
        </section>

        {/* ── Digital Entry Pass ── */}
        <section id="pass" style={{ marginBottom: 'clamp(2.5rem, 7vw, 4rem)' }}>
          <div className="admin-dashboard__section-heading" style={{ marginBottom: '1.5rem' }}>
            <div>
              <p>Diamond Feature</p>
              <h2>Digital Entry Pass</h2>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            Generate Apple Wallet-style entry passes for your guests. Download as PNG or PDF.
          </p>
          <EntryPass
            guestName="Honoured Guest"
            guestId="00000000-0000-0000-0000-000000000001"
          />
        </section>

        {/* ── Settings ── */}
        <section id="settings" style={{ marginBottom: '4rem' }}>
          <div className="admin-dashboard__section-heading" style={{ marginBottom: '1.5rem' }}>
            <div>
              <p>Configuration</p>
              <h2>Settings</h2>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
          }}>
            <div style={{ maxWidth: 520 }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Background Music URL
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input
                  type="url"
                  value={musicUrl}
                  onChange={e => setMusicUrl(e.target.value)}
                  placeholder="https://example.com/wedding-music.mp3"
                  style={{
                    flex: 1, padding: '0.9rem 1rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(193,102,59,0.2)',
                    borderRadius: 10, color: '#fff', fontSize: '0.88rem', outline: 'none',
                  }}
                />
                <button
                  className="admin-dashboard__export"
                  onClick={() => notify('Music URL saved successfully.', 'info')}
                >
                  Save
                </button>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem', marginTop: '0.6rem' }}>
                Supports MP3, AAC, OGG formats. Music plays on the invitation page after guest interaction.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
