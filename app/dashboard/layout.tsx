// app/dashboard/layout.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean); // ["dashboard", "reports"]

  const breadcrumb = [
    { label: 'Dashboard', href: '/dashboard' },
    ...segments.slice(1).map((seg, idx) => ({
      label: seg.charAt(0).toUpperCase() + seg.slice(1),
      href: '/' + segments.slice(0, idx + 2).join('/'),
    })),
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-4 md:px-6 border-b bg-white">
        <div className="flex items-center gap-3">
          {/* Sidebar toggle (mobile) */}
          <button
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border bg-white hover:bg-slate-50"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle sidebar"
          >
            <span className="block w-4 border-t border-slate-700 mb-1" />
            <span className="block w-4 border-t border-slate-700 mb-1" />
            <span className="block w-4 border-t border-slate-700" />
          </button>

          <div className="hidden md:flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
              CM
            </span>
            <span className="font-semibold text-slate-800">Campaign Monitor</span>
          </div>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-xs md:text-sm text-slate-500">
            {breadcrumb.map((item, idx) => (
              <span key={item.href} className="flex items-center gap-1">
                {idx > 0 && <span>/</span>}
                <Link
                  href={item.href}
                  className={
                    idx === breadcrumb.length - 1
                      ? 'text-slate-900 font-medium'
                      : 'hover:text-slate-700'
                  }
                >
                  {/* {item.label} */}
                </Link>
              </span>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 text-xs md:text-sm text-slate-600">
          <span className="hidden sm:inline">Welcome, User</span>
          <button className="px-3 py-1 rounded-md border text-xs hover:bg-slate-50">
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - desktop */}
        <aside className="hidden md:flex w-60 bg-white border-r px-4 py-4 flex-col">
          <SidebarNav />
        </aside>

        {/* Sidebar - mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="relative z-50 w-64 bg-white border-r px-4 py-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-slate-800">Menu</span>
                <button
                  className="h-8 w-8 flex items-center justify-center rounded-md border hover:bg-slate-50"
                  onClick={() => setSidebarOpen(false)}
                >
                  ✕
                </button>
              </div>
              <SidebarNav onNavigate={() => setSidebarOpen(false)} />
            </aside>
          </div>
        )}

        {/* Main + Footer */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </div>

          <footer className="h-10 border-t bg-white flex items-center justify-between px-4 md:px-6 text-[11px] md:text-xs text-slate-500">
            <span>Campaign monitoring </span>
            <span>Built with Next.js & Tailwind</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void } = {}) {
  const pathname = usePathname();

  const linkBase =
    'w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between';

  const NavButton = ({
    href,
    label,
    active,
  }: {
    href: string;
    label: string;
    active?: boolean;
  }) => (
    <Link
      href={href}
      onClick={onNavigate}
      className={
        linkBase +
        ' ' +
        (active
          ? 'bg-slate-100 text-slate-900 font-medium'
          : 'text-slate-600 hover:bg-slate-50')
      }
    >
      <span>{label}</span>
    </Link>
  );

  return (
    <>
      <nav className="flex-1 space-y-1">
        <p className="mb-2 text-[11px] font-semibold text-slate-500 uppercase">
          Overview
        </p>
        <NavButton
          href="/dashboard"
          label="Dashboard"
          active={pathname === '/dashboard'}
        />
        <NavButton
          href="/dashboard"
          label="Campaigns"
          active={pathname.startsWith('/dashboard/campaigns')}
          
        />
        <NavButton
          href="/dashboard"
          label="Reports"
          active={pathname.startsWith('/dashboard/reports')}
          
        />

        <p className="mt-4 mb-2 text-[11px] font-semibold text-slate-500 uppercase">
          Settings
        </p>
        <NavButton
          href="/dashboard"
          label="Team"
          active={pathname.startsWith('/dashboard/team')}
        />
        <NavButton
          href="/dashboard"
          label="Billing"
          active={pathname.startsWith('/dashboard/billing')}
        />
      </nav>

      <div className="mt-4 text-[11px] text-slate-400">
        © {new Date().getFullYear()} Campaign Dashboard
      </div>
    </>
  );
}
