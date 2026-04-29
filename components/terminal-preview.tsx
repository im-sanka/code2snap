"use client";

import React, { forwardRef } from 'react';
import { Highlight, themes, PrismTheme } from 'prism-react-renderer';
import { CodeConfig } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TerminalPreviewProps {
  config: CodeConfig;
}

export const themeMap: Record<string, PrismTheme> = {
  dracula: themes.dracula,
  duotoneDark: themes.duotoneDark,
  duotoneLight: themes.duotoneLight,
  github: themes.github,
  nightOwl: themes.nightOwl,
  nightOwlLight: themes.nightOwlLight,
  oceanicNext: themes.oceanicNext,
  okaidia: themes.okaidia,
  palenight: themes.palenight,
  shadesOfPurple: themes.shadesOfPurple,
  synthwave84: themes.synthwave84,
  vsDark: themes.vsDark,
  vsLight: themes.vsLight,
};

export const bgGradients: Record<string, string> = {
  'gradient-1': 'bg-gradient-to-br from-indigo-500 to-purple-600',
  'gradient-2': 'bg-gradient-to-br from-pink-500 to-rose-500',
  'gradient-3': 'bg-gradient-to-br from-cyan-400 to-blue-500',
  'gradient-4': 'bg-gradient-to-br from-emerald-400 to-cyan-500',
  'gradient-5': 'bg-gradient-to-br from-amber-400 to-orange-500',
  'solid-1': 'bg-neutral-900',
  'solid-2': 'bg-white',
  'solid-3': 'bg-slate-300',
  'solid-4': 'bg-[#1e1e1e]',
};

export const TerminalPreview = forwardRef<HTMLDivElement, TerminalPreviewProps>(
  ({ config }, ref) => {
    const theme = themeMap[config.theme] || themes.okaidia;
    const isLargeTerminal = config.terminalWidth === 'lg' || config.terminalWidth === 'xl';
    
    return (
      <div 
        ref={ref}
        className={cn(
          "box-border w-full max-w-full sm:w-fit sm:max-w-none relative flex items-center justify-center transition-all duration-300 bg-cover bg-center",
          config.showBackground && config.backgroundType === 'gradient' ? bgGradients[config.backgroundClass] : 'bg-transparent'
        )}
        style={{ 
          padding: `${config.padding}px`,
          paddingBottom: `${(config.padding ?? 64) + 14}px`,
          backgroundColor: config.showBackground && config.backgroundType === 'solid' ? (config.customBackground || '#000000') : undefined,
          backgroundImage: config.showBackground && config.backgroundType === 'image' && config.backgroundImage ? `url(${config.backgroundImage})` : undefined,
        }}
      >
        <div 
          className={cn(
            "flex min-w-0 flex-col shadow-2xl transition-all duration-300 max-w-full sm:max-w-none",
            config.terminalWidth === 'auto' ? 'w-auto min-w-[300px]' : 
            config.terminalWidth === 'sm' ? 'w-full sm:min-w-[512px]' : 
            config.terminalWidth === 'lg' ? 'w-full sm:w-[1024px] sm:min-w-[1024px]' : 
            config.terminalWidth === 'xl' ? 'w-full sm:w-[1280px] sm:min-w-[1280px]' : 
            'w-full sm:min-w-[768px]' // md/default
          )}
        >
          {/* Inner wrapper handles border, radius, and strict clipping */}
          <div 
            className="flex flex-col w-full min-w-max h-full rounded-xl overflow-hidden ring-1 ring-white/10"
            style={{ backgroundColor: theme.plain.backgroundColor as string || '#1e1e1e' }}
          >
            {/* Mac-like Window Controls */}
            <div className="flex items-center gap-2 px-4 py-3 bg-black/20 border-b border-white/5 relative z-10 shrink-0">
              <div className="h-3 w-3 rounded-full bg-[#ff5f56] border border-black/10" />
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-black/10" />
              <div className="h-3 w-3 rounded-full bg-[#27c93f] border border-black/10" />
              {config.title && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <span className="text-xs font-medium text-white/50">{config.title || 'untitled'}</span>
                </div>
              )}
            </div>

            {/* Code Area */}
            <div className={cn("flex-1 p-4 md:p-6 selection:bg-white/20", isLargeTerminal ? "text-xs md:text-sm" : "text-sm md:text-base")}>
              <Highlight
                theme={theme}
                code={config.code}
                language={config.language}
              >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre
                    className={cn(className, "font-mono focus:outline-none bg-transparent")}
                    style={{ ...style, backgroundColor: 'transparent' }}
                  >
                    {tokens.map((line, i) => {
                      const { key: lineKey, ...lineProps } = getLineProps({ line, key: i });
                      return (
                        <div key={(lineKey as React.Key) || i} {...lineProps} className={cn(lineProps.className, "table-row")}>
                          <span className={cn("table-cell text-right select-none opacity-40 pr-4 font-mono align-middle", isLargeTerminal ? "text-[10px] md:text-xs" : "text-xs")}>
                            {i + 1}
                          </span>
                          <span className="table-cell">
                            {line.map((token, key) => {
                              const { key: tokenKey, ...tokenProps } = getTokenProps({ token, key });
                              return <span key={(tokenKey as React.Key) || key} {...tokenProps} />;
                            })}
                          </span>
                        </div>
                      );
                    })}
                  </pre>
                )}
              </Highlight>
            </div>
          </div>

        </div>
        <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] leading-none font-mono tracking-wide text-white/60 select-none whitespace-nowrap">
          {'>>Code2Snap<<'}
        </span>
      </div>
    );
  }
);

TerminalPreview.displayName = 'TerminalPreview';
