"use client";

import React, { useMemo, useState, useRef, useEffect } from 'react';
import { toPng, toSvg } from 'html-to-image';
import { TerminalPreview, bgGradients, themeMap } from '@/components/terminal-preview';
import { CustomSelect } from '@/components/ui/custom-select';
import { CodeConfig, ExportFormat } from '@/lib/types';
import { Code2, ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HeaderActions } from '@/components/page/header-actions';
import { PresetsModal } from '@/components/page/presets-modal';

const DEFAULT_CODE = `function launchConfetti(message: string): string {
  const sparkles = ["✨", "🎉", "🚀", "💜"];
  const party = sparkles.join(" ");

  return party + " " + message + " " + party;
}

console.log(launchConfetti("Welcome to Code2Snap — it's free!"));`;

const generateId = () => Math.random().toString(36).slice(2, 11);

const DEFAULT_CONFIG: CodeConfig = {
  id: generateId(), name: 'Welcome Snippet', title: 'welcome.ts', code: DEFAULT_CODE, language: 'typescript', theme: 'dracula', padding: 64,
  showBackground: true, backgroundClass: 'gradient-1', backgroundType: 'gradient', customBackground: '#000000', terminalWidth: 'md', exportScale: 2,
};

const LANGUAGE_OPTIONS = [
  { value: 'typescript', label: 'TypeScript' }, { value: 'javascript', label: 'JavaScript' }, { value: 'css', label: 'CSS' },
  { value: 'html', label: 'HTML' }, { value: 'python', label: 'Python' }, { value: 'rust', label: 'Rust' }, { value: 'go', label: 'Go' },
  { value: 'json', label: 'JSON' }, { value: 'bash', label: 'Bash' },
];

export function CodeSnapClient() {
  const [config, setConfig] = useState<CodeConfig>(DEFAULT_CONFIG);
  const [savedConfigs, setSavedConfigs] = useState<CodeConfig[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = window.localStorage.getItem('codesnap-configs');
    if (!saved) return [];
    try {
      return JSON.parse(saved) as CodeConfig[];
    } catch {
      return [];
    }
  });
  const THEME_OPTIONS = useMemo(() => Object.keys(themeMap).map(k => ({ value: k, label: k.charAt(0).toUpperCase() + k.slice(1).replace(/([A-Z])/g, ' $1').trim() })), []);
  const [isExporting, setIsExporting] = useState(false);
  const [showPresetsModal, setShowPresetsModal] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const updateConfig = (next: Partial<CodeConfig>) => setConfig(prev => ({ ...prev, ...next }));
  const handleBackgroundImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => updateConfig({ backgroundType: 'image', backgroundImage: reader.result as string });
    reader.readAsDataURL(file);
  };
  const saveConfigList = (configs: CodeConfig[]) => { setSavedConfigs(configs); localStorage.setItem('codesnap-configs', JSON.stringify(configs)); };
  const handleSave = () => { const i = savedConfigs.findIndex(c => c.id === config.id); const next = [...savedConfigs]; i >= 0 ? next.splice(i, 1, config) : next.push(config); saveConfigList(next); };
  const createNew = () => setConfig({ ...DEFAULT_CONFIG, id: generateId(), name: 'New Snippet', title: 'untitled.ts', code: '' });
  const handleDelete = (id: string, e: React.MouseEvent) => { e.stopPropagation(); const next = savedConfigs.filter(c => c.id !== id); saveConfigList(next); if (config.id === id) createNew(); };
  const handleExport = async (format: ExportFormat) => { if (!previewRef.current) return; try { setIsExporting(true); const el = previewRef.current; const dataUrl = format === 'png' ? await toPng(el, { quality: 1, pixelRatio: config.exportScale || 2 }) : await toSvg(el); const a = document.createElement('a'); a.download = `${config.title || 'snippet'}.${format}`; a.href = dataUrl; a.click(); } finally { setIsExporting(false); } };

  return <div className="bg-slate-950 text-slate-200 min-h-screen lg:h-screen p-4 lg:p-6 font-sans lg:overflow-hidden overflow-x-hidden overflow-y-auto flex flex-col">
    <header className="relative z-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 shrink-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full md:w-auto"><h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2"><div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]"><Code2 className="w-5 h-5 text-white shrink-0" /></div>Code2Snap</h1><div className="w-full sm:w-64 relative group sm:ml-2"><input type="text" value={config.name} onChange={(e) => updateConfig({ name: e.target.value })} className="bg-transparent border border-transparent hover:border-slate-800 rounded px-2 py-1 text-base font-medium text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-600 transition-all w-full" placeholder="Snippet Name" /></div></div>
      <HeaderActions isExporting={isExporting} onOpenPresets={() => setShowPresetsModal(true)} onSave={handleSave} onExportSvg={() => handleExport('svg')} onExportPng={() => handleExport('png')} />
    </header>
    <div className="relative z-10 flex flex-col lg:flex-row gap-4 flex-grow min-h-0"><div className="lg:w-[35%] flex-shrink-0 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 overflow-hidden min-h-[350px] lg:min-h-0"><div className="flex justify-between items-center shrink-0"><label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Script Input</label><div className="flex items-center gap-2"><input type="text" value={config.title} onChange={(e) => updateConfig({ title: e.target.value })} className="w-28 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[10px] text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Filename" /><CustomSelect value={config.language} onChange={(val: string) => updateConfig({ language: val })} options={LANGUAGE_OPTIONS} buttonClassName="bg-slate-800 border-slate-700 text-[10px] w-28 py-1 px-2.5 h-7" /></div></div><textarea value={config.code} onChange={(e) => updateConfig({ code: e.target.value })} className="flex-grow w-full bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-sm text-indigo-300 outline-none resize-none" /></div>
      <div className="lg:w-[65%] flex flex-col gap-4 min-h-0"><div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shrink-0 flex-none relative z-30"><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="space-y-4"><span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Terminal Theme</span><CustomSelect value={config.theme} onChange={(val: string) => updateConfig({ theme: val as any })} options={THEME_OPTIONS} buttonClassName="w-full bg-slate-950 border-slate-800 font-medium h-9 text-xs" /><div className="space-y-2"><div className="flex items-center justify-between"><span className="text-xs text-slate-400">Padding</span><span className="text-[10px] text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded">{config.padding}px</span></div><input type="range" min="0" max="128" step="16" value={config.padding} onChange={(e) => updateConfig({ padding: parseInt(e.target.value) })} className="accent-indigo-500 w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer" /></div></div><div className="space-y-3 md:border-l md:border-slate-800 md:pl-6"><span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Background</span><div className="flex gap-2"><button onClick={() => updateConfig({ backgroundType: 'gradient', showBackground: true })} className={cn("rounded-md px-2 py-1 text-[10px] font-medium border", config.backgroundType === 'gradient' ? "bg-indigo-500 border-indigo-400 text-white" : "bg-slate-950 border-slate-800 text-slate-300")}>Gradient</button><label className={cn("rounded-md px-2 py-1 text-[10px] font-medium border cursor-pointer", config.backgroundType === 'solid' ? "bg-indigo-500 border-indigo-400 text-white" : "bg-slate-950 border-slate-800 text-slate-300")}><input type="color" value={config.customBackground || '#000000'} onChange={(e) => updateConfig({ backgroundType: 'solid', showBackground: true, customBackground: e.target.value })} className="sr-only" />Color</label><label className={cn("rounded-md px-2 py-1 text-[10px] font-medium border cursor-pointer", config.backgroundType === 'image' ? "bg-indigo-500 border-indigo-400 text-white" : "bg-slate-950 border-slate-800 text-slate-300")}><input type="file" accept="image/*" onChange={handleBackgroundImageUpload} className="sr-only" />Upload</label></div><div className="grid grid-cols-5 gap-2">{Object.entries(bgGradients).map(([key, value]) => <button key={key} onClick={() => updateConfig({ backgroundType: 'gradient', showBackground: true, backgroundClass: key })} className={cn("h-7 rounded-md ring-offset-2 ring-offset-slate-900", value, config.backgroundType === 'gradient' && config.backgroundClass === key ? "ring-2 ring-white" : "")} title={key} />)}</div></div><div className="space-y-4 md:border-l md:border-slate-800 md:pl-6"><span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Terminal Size</span><CustomSelect value={config.terminalWidth || 'md'} onChange={(val: string) => updateConfig({ terminalWidth: val as any })} options={[{ value: 'auto', label: 'Auto (Fit)' }, { value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }, { value: 'xl', label: 'X-Large' }]} buttonClassName="bg-slate-950 border-slate-800 w-full h-9 text-xs" /><span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Export Scale</span><CustomSelect value={config.exportScale?.toString() || '2'} onChange={(val: string) => updateConfig({ exportScale: parseInt(val) })} options={[{ value: '1', label: '1x' }, { value: '2', label: '2x' }, { value: '3', label: '3x' }, { value: '4', label: '4x' }]} buttonClassName="bg-slate-950 border-slate-800 w-full h-9 text-xs" /></div></div></div>
      <div className="flex-1 overflow-hidden bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col relative min-h-0"><div className={cn("flex-1 relative z-10", config.terminalWidth === 'auto' ? "overflow-hidden" : "overflow-auto")}><div className="min-h-full w-full flex items-center justify-center p-4 lg:p-8"><div ref={previewRef} className="mx-auto my-auto flex justify-center transition-transform duration-300"><TerminalPreview config={config} /></div></div></div></div></div></div>
    <PresetsModal open={showPresetsModal} savedConfigs={savedConfigs} activeConfigId={config.id} onClose={() => setShowPresetsModal(false)} onCreateNew={() => { createNew(); setShowPresetsModal(false); }} onLoad={(c) => { setConfig(c); setShowPresetsModal(false); }} onDelete={handleDelete} onDeleteAll={() => saveConfigList([])} />
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
      <a href="https://im-sanka.github.io/" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-medium text-slate-200 shadow-2xl backdrop-blur transition hover:border-indigo-400 hover:bg-indigo-500 hover:text-white" aria-label="Visit Im Sanka website">
        <ExternalLink className="h-4 w-4" />
        <span className="hidden sm:inline">Im Sanka</span>
      </a>
      <a href="https://github.com/im-sanka/code2snap" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs font-medium text-slate-200 shadow-2xl backdrop-blur transition hover:border-indigo-400 hover:bg-indigo-500 hover:text-white" aria-label="View Code2Snap repository on GitHub">
        <Github className="h-4 w-4" />
        <span className="hidden sm:inline">Repo</span>
      </a>
    </div>
  </div>;
}
