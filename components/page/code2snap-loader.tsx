import { Code2 } from 'lucide-react';

export function Code2SnapLoader() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.65)]">
          <Code2 className="w-8 h-8 text-white" />
        </div>
        <div className="text-2xl font-bold tracking-tight">Code2Snap</div>
        <div className="text-xs uppercase tracking-[0.35em] text-indigo-200/70">Loading</div>
      </div>
    </div>
  );
}