
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">
            Monitor campaign performance across channels.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs rounded-md border text-slate-700 hover:bg-slate-50">
            Last 7 days
          </button>
          <button className="px-3 py-1.5 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700">
            New campaign
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {['Campaigns', 'insights'].map((label, i) => (
          <div
            key={label}
            className="rounded-xl bg-white border p-4 flex flex-col gap-1"
          >
            <span className="text-xs font-medium text-slate-500">
              {label}
            </span>
            <span className="text-lg font-semibold text-slate-900">
              {i === 0 && '14'}
              {i === 1 && '8'}
          
            </span>
            <span className="text-xs text-emerald-600">
              +12.4% vs last period
            </span>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section className="lg:col-span-2 rounded-xl bg-white border p-4">
          <h2 className="text-sm font-semibold text-slate-800 mb-2">
            Performance over time
          </h2>
          <div className="h-52 flex items-center justify-center text-xs text-slate-400 border border-dashed rounded-lg">
            Chart placeholder
          </div>
        </section>

        <section className="rounded-xl bg-white border p-4">
          <h2 className="text-sm font-semibold text-slate-800 mb-2">
            Top campaigns
          </h2>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-700">Diwali Sale 2025</span>
              <span className="text-emerald-600 font-medium">ROAS 4.2x</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">New User Acquisition</span>
              <span className="text-emerald-600 font-medium">ROAS 3.1x</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700">Retargeting - Cart</span>
              <span className="text-amber-600 font-medium">ROAS 2.4x</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
