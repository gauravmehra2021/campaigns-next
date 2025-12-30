import CampaignDetailsSection from "../components/CampaignDetailsSection";
import CampaignStatusChart from "../components/CampaignStatusChart";
import LiveCampaignInsights from "../components/LiveCampaignInsights";
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {['Total Campaigns', 'Total Clicks','Total Conversions','Total Impressions',"Total spend"].map((label, i) => (
          <div
            key={label}
            className="rounded-xl bg-white border p-4 flex flex-col gap-1"
          >
            <span className="text-xs font-medium text-slate-500">
              {label}
            </span>
            <span className="text-lg font-semibold text-slate-900">
              {i === 0 && insights?.insights?.total_campaigns}
              {i === 1 && insights?.insights?.total_clicks}
                {i === 2 && insights?.insights?.total_conversions}
                   {i === 3 && insights?.insights?.total_impressions}
                     {i === 4 && `$${insights?.insights?.total_spend}`}
            </span>
            <span className="text-xs text-emerald-600">
              +12.4% vs last period
            </span>
          </div>
        ))}
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section className="lg:col-span-2 rounded-xl bg-white border p-4">
          <h2 className="text-sm font-semibold text-slate-800 mb-5 ">
          Campaign Status Overview
          </h2>
          <div className="h-52 flex items-center justify-center text-xs text-slate-400 rounded-lg mt-5">
            <CampaignStatusChart campaigns={campaigns?.campaigns} />
          </div>
        </section>

        <section className="rounded-xl bg-white border p-4">
       <CampaignDetailsSection  campaigns={campaigns?.campaigns}/>
        </section>
      </div>

      <section className="rounded-xl bg-white border p-4">
        <LiveCampaignInsights  campaigns={campaigns?.campaigns}/>
      </section> 

    </div>
  );
}
