"use client";

import { Download, FolderOpen, Image as ImageIcon, Save } from 'lucide-react';

interface HeaderActionsProps {
  isExporting: boolean;
  onOpenPresets: () => void;
  onSave: () => void;
  onExportSvg: () => void;
  onExportPng: () => void;
}

export function HeaderActions({ isExporting, onOpenPresets, onSave, onExportSvg, onExportPng }: HeaderActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3 w-full md:w-auto">
      <button onClick={onOpenPresets} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-md text-sm font-medium border border-slate-700 flex items-center gap-2 text-white transition-colors">
        <FolderOpen className="w-4 h-4" /> Presets
      </button>
      <button onClick={onSave} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-md text-sm font-medium border border-slate-700 flex items-center gap-2 text-white transition-colors">
        <Save className="w-4 h-4" /> Save
      </button>
      <button onClick={onExportSvg} disabled={isExporting} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white border border-slate-700 rounded-md text-sm font-medium transition-colors">
        <ImageIcon className="w-4 h-4" /> SVG
      </button>
      <button onClick={onExportPng} disabled={isExporting} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md text-sm font-semibold shadow-lg shadow-indigo-900/20 text-white flex items-center gap-2 transition-all">
        <Download className="w-4 h-4" /> {isExporting ? 'Exporting...' : 'Export Image'}
      </button>
    </div>
  );
}
