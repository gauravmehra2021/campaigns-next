"use client";

import { useEffect, useState } from "react";
import { fetcher } from "../lib/utils";

export default function CampaignDetailsSection({ campaigns }: any) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(campaigns?.[0] || null);

  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selected?.id) return;

    async function fetchCampaignDetails() {
      try {
        setLoading(true);
        const data = await fetcher(`/campaigns/${selected.id}`);
        setCampaign(data.campaign);
      } catch (error) {
        console.error("Failed to fetch campaign details", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaignDetails();
  }, [selected]);

  return (
    <section className="rounded-xl bg-white border p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-800">
          Campaign details
        </h2>

        {/* Dropdown */}
        <div className="relative w-[180px] text-xs">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="w-full flex items-center justify-between border rounded-md px-2 py-1 bg-white text-slate-700"
          >
            <span className="truncate">
              {selected?.name || "Select campaign"}
            </span>
            <span className="text-slate-400">▾</span>
          </button>

          {open && (
            <div className="absolute z-30 mt-1 w-full bg-white border rounded-md shadow max-h-40 overflow-y-auto">
              {campaigns.map((ele: any) => (
                <div
                  key={ele.id}
                  onClick={() => {
                    setSelected(ele);
                    setOpen(false);
                  }}
                  className="px-2 py-1 cursor-pointer hover:bg-slate-100 text-black truncate "
                >
                  {ele.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {loading && (
        <div className="text-xs text-slate-400">
          Loading campaign details…
        </div>
      )}

      {!loading && campaign && (
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-slate-500">Campaign name</p>
            <p className="font-medium text-slate-800">
              {campaign.name}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Status</p>
            <span
              className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${
                campaign.status === "active"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {campaign.status}
            </span>
          </div>

          <div>
            <p className="text-slate-500">Total budget</p>
            <p className="font-medium text-slate-800">
              ${campaign.budget.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Daily budget</p>
            <p className="font-medium text-slate-800">
              ${campaign.daily_budget.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Platform</p>
            <p className="font-medium text-slate-800 capitalize">
              {campaign.platforms.join(", ")}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Created on</p>
            <p className="font-medium text-slate-800">
              {new Date(campaign.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {!loading && !campaign && (
        <p className="text-[11px] text-slate-400">
          Select a campaign from the dropdown to view its configuration and budget details.
        </p>
      )}
    </section>
  );
}
