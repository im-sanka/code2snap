"use client";

import React from 'react';
import { Trash2, X } from 'lucide-react';
import { CodeConfig } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PresetsModalProps {
  open: boolean;
  savedConfigs: CodeConfig[];
  activeConfigId: string;
  onClose: () => void;
  onCreateNew: () => void;
  onLoad: (config: CodeConfig) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onDeleteAll: () => void;
}

export function PresetsModal({ open, savedConfigs, activeConfigId, onClose, onCreateNew, onLoad, onDelete, onDeleteAll }: PresetsModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 flex flex-col max-h-[80vh] shadow-2xl shadow-black" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-white">Saved Presets</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors" title="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto pr-2 scrollbar-thin [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-800 [&::-webkit-scrollbar-thumb]:rounded-full">
          <button onClick={onCreateNew} className="w-full shrink-0 h-12 border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-xl flex items-center justify-center transition-colors group cursor-pointer focus:outline-none">
            <span className="text-xs text-slate-500 group-hover:text-slate-400 font-medium transition-colors">+ Create New Preset</span>
          </button>

          {savedConfigs.length === 0 && (
            <div className="text-center py-8 text-sm text-slate-600">No saved presets yet.<br />Click &quot;Save&quot; to save your current config.</div>
          )}

          {savedConfigs.map(c => (
            <div key={c.id} onClick={() => onLoad(c)} className={cn("w-full shrink-0 p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col group relative", activeConfigId === c.id ? "bg-indigo-500/10 border-indigo-500/50" : "bg-slate-950/50 border-slate-800/50 hover:border-slate-700/50")}>
              <div className="flex justify-between items-start mb-1 gap-2">
                <div className="text-sm font-semibold text-white truncate flex-1">{c.name || 'Untitled Snippet'}</div>
                <button onClick={(e) => onDelete(c.id, e)} className="text-slate-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded hover:bg-slate-800" title="Delete preset">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-slate-500 truncate w-full">{c.title} • {c.theme}</div>
            </div>
          ))}
        </div>

        {savedConfigs.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-800 text-right">
            <button onClick={onDeleteAll} className="text-xs font-medium text-red-500 hover:text-red-400 px-3 py-1.5 rounded-md hover:bg-red-500/10 transition-colors">
              Delete All Presets
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
