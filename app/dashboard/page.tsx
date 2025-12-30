import { getCampaignInsights, getCampaigns } from "../lib/query";

export default async function DashboardPage() {

     const [campaigns, insights] = await Promise.all([
    getCampaigns(),
    getCampaignInsights(),
  ]);

  console.log(campaigns, insights);


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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['Total Campaigns', 'Active Campaigns','Paused Campaigns','Completed Campaigns'].map((label, i) => (
          <div
            key={label}
            className="rounded-xl bg-white border p-4 flex flex-col gap-1"
          >
            <span className="text-xs font-medium text-slate-500">
              {label}
            </span>
            <span className="text-lg font-semibold text-slate-900">
              {i === 0 && insights?.insights?.total_campaigns}
              {i === 1 && insights?.insights?.active_campaigns}
                {i === 2 && insights?.insights?.paused_campaigns}
                   {i === 3 && insights?.insights?.completed_campaigns}
            </span>
            <span className="text-xs text-emerald-600">
              +12.4% vs last period
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
