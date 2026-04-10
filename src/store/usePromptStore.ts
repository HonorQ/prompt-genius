import { create } from 'zustand';

export interface PromptState {
  language: 'en' | 'zh';
  subject: string;
  action: string;
  prop: string;
  style: string;
  composition: string;
  environment: string;
  weather: string;
  color: string;
  mood: string;
  lighting: string;
  camera: string;
  quality: string;
  extra: string;
  setField: (field: keyof Omit<PromptState, 'setField' | 'reset'>, value: string) => void;
  reset: () => void;
}

const initialState = {
  language: 'zh' as const,
  subject: '',
  action: '',
  prop: '',
  style: '',
  composition: '',
  environment: '',
  weather: '',
  color: '',
  mood: '',
  lighting: '',
  camera: '',
  quality: 'masterpiece, best quality, highly detailed, 8k resolution|杰作，最佳画质，极高细节，8k分辨率',
  extra: '',
};

export const usePromptStore = create<PromptState>((set) => ({
  ...initialState,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  reset: () => set(initialState),
}));
