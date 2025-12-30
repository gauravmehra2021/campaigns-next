"use client";

import { useEffect, useRef, useState } from "react";

const BASE_URL = "https://mixo-fe-backend-task.vercel.app";

type Insight = {
  campaign_id: string;
  timestamp: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;
  cpc: number;
  conversion_rate: number;
};

export default function LiveCampaignInsights({ campaigns }: any) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(campaigns?.[0] || null);

  const [insights, setInsights] = useState<Insight[]>([]);
  const [paused, setPaused] = useState(false);

  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!selected?.id || paused) return;

    // Close previous stream if exists
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const source = new EventSource(
      `${BASE_URL}/campaigns/${selected.id}/insights/stream`
    );

    eventSourceRef.current = source;

    source.onmessage = (event) => {
      try {
        const parsed: Insight = JSON.parse(event.data);

        setInsights((prev) => {
          const next = [...prev, parsed];
          return next.slice(-20); // keep last 20 updates
        });
      } catch (err) {
        console.error("Failed to parse stream data", err);
      }
    };

    source.onerror = (err) => {
      console.error("SSE connection error", err);
      source.close();
    };

    return () => {
      source.close();
    };
  }, [selected, paused]);

  const latest = insights[insights.length - 1];

  return (
    <section className="rounded-xl bg-white border p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-800">
          Campaign Insights Stream
        </h2>

        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-600">● Live</span>

          <button
            onClick={() => setPaused((p) => !p)}
            className="text-xs px-2 py-1 border rounded-md text-black"
          >
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>

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
                  setInsights([]); // reset data on change
                  setOpen(false);
                }}
                className="px-2 py-1 cursor-pointer hover:bg-slate-100 text-black truncate"
              >
                {ele.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Live Snapshot */}
      {latest ? (
        <div className="grid grid-cols-2 gap-3 text-black">
          <div>
            Impressions: <b>{latest.impressions}</b>
          </div>
          <div>
            Clicks: <b>{latest.clicks}</b>
          </div>
          <div>
            Conversions: <b>{latest.conversions}</b>
          </div>
          <div>
            Spend: <b>${latest.spend}</b>
          </div>
          <div>
            CTR: <b>{latest.ctr}%</b>
          </div>
          <div>
            CPC: <b>${latest.cpc}</b>
          </div>
        </div>
      ) : (
        <div className="text-xs text-slate-400">
          Waiting for live data…
        </div>
      )}
    </section>
  );
}
