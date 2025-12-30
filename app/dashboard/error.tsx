"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
      <h2 className="text-lg font-semibold text-slate-800">
        Something went wrong
      </h2>

      <p className="text-sm text-slate-500">
        Failed to load dashboard data.
      </p>

      <button
        onClick={() => reset()}
        className="px-4 py-2 text-sm rounded-md bg-[#155dfc] text-white"
      >
        Retry
      </button>
    </div>
  );
}
