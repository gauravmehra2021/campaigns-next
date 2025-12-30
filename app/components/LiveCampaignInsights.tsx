"use client";

import { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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
  const [connected, setConnected] = useState(false);

  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (paused) {
      eventSourceRef.current?.close();
      eventSourceRef.current = null;
      setConnected(false);
      return;
    }

    if (!selected?.id) return;

    eventSourceRef.current?.close();

    const source = new EventSource(
      `${BASE_URL}/campaigns/${selected.id}/insights/stream`
    );

    eventSourceRef.current = source;

    source.onopen = () => {
      setConnected(true);
    };

    source.onmessage = (event) => {
      try {
        const parsed: Insight = JSON.parse(event.data);

        setInsights((prev) => {
          if (prev.at(-1)?.timestamp === parsed.timestamp) return prev;
          return [...prev, parsed].slice(-20);
        });
      } catch (err) {
        console.error("Failed to parse stream data", err);
      }
    };

    source.onerror = () => {
      setConnected(false);
      source.close();
    };

    return () => {
      source.close();
    };
  }, [selected?.id, paused]);

  const latest = insights.at(-1);

  const chartData = insights.map((item) => ({
    ...item,
    time: new Date(item.timestamp).toLocaleTimeString(),
  }));

  return (
    <section className="rounded-xl bg-white border p-4 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-800">
          Campaign Insights
        </h2>

        <div className="flex items-center gap-3">
          <span
            className={`text-xs ${
              connected ? "text-emerald-600" : "text-red-500"
            }`}
          >
            ● {connected ? "Live" : "Disconnected"}
          </span>

          <button
            onClick={() => setPaused((p) => !p)}
            className=" px-2 py-1 border rounded-md text-black "
          >
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative w-full sm:w-[220px] text-xs">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="w-full flex items-center justify-between border rounded-md px-3 py-2 bg-white text-black "
          >
            <span className="truncate">
              {selected?.name || "Select campaign"}
            </span>
            <span className="text-slate-400">▾</span>
          </button>

          {open && (
            <div className="absolute z-30 mt-1 w-full bg-white border rounded-md  text-black shadow max-h-40 overflow-y-auto">
              {campaigns.map((ele: any) => (
                <div
                  key={ele.id}
                  onClick={() => {
                    setSelected(ele);
                    setInsights([]);
                    setOpen(false);
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-slate-100 truncate"
                >
                  {ele.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      {latest ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-sm">
          <KPI label="Impressions" value={latest.impressions} />
          <KPI label="Clicks" value={latest.clicks} />
          <KPI label="Conversions" value={latest.conversions} />
          <KPI label="Spend" value={`$${latest.spend}`} />
          <KPI label="CTR" value={`${latest.ctr}%`} />
          <KPI label="CPC" value={`$${latest.cpc}`} />
        </div>
      ) : (
        <div className="text-xs text-slate-400">Waiting for live data…</div>
      )}

      {/* Chart */}
      {insights.length > 1 && (
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="conversions"
                stroke="#16a34a"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

/* KPI Component */
function KPI({ label, value }: { label: string; value: any }) {
  return (
    <div className="border rounded-lg p-3 bg-slate-50">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="font-semibold text-slate-900">{value}</div>
    </div>
  );
}
