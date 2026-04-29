export interface CodeConfig {
  id: string;
  name: string;
  title: string;
  code: string;
  language: string;
  theme: string;
  padding: number;
  showBackground: boolean;
  backgroundClass: string;
  useCustomBackground?: boolean;
  customBackground?: string;
  backgroundType?: 'gradient' | 'solid' | 'image';
  backgroundImage?: string;
  terminalWidth?: 'auto' | 'sm' | 'md' | 'lg' | 'xl';
  exportScale?: number;
}

export type ExportFormat = 'png' | 'svg';
