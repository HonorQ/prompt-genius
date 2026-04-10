import { PromptState } from '../store/usePromptStore';

export const generatePrompt = (state: PromptState): string => {
  const parts: string[] = [];

  const getVal = (field: string, isZh: boolean) => {
    if (!field) return '';
    const split = field.split('|');
    return isZh ? (split[1] || split[0] || '') : (split[0] || '');
  };

  const isZh = state.language === 'zh';

  // 1. 主体 (Subject)
  if (state.subject.trim()) {
    parts.push(state.subject.trim());
  } else {
    parts.push(isZh ? '一个美丽的场景' : 'a beautiful scene');
  }

  // 1.5 动作与道具 (Action & Prop)
  if (state.action) parts.push(getVal(state.action, isZh));
  if (state.prop) parts.push(getVal(state.prop, isZh));

  // 2. 风格 (Style)
  if (state.style) parts.push(getVal(state.style, isZh));

  // 3. 构图/视角 (Composition/Camera)
  if (state.composition) parts.push(getVal(state.composition, isZh));
  if (state.camera) parts.push(getVal(state.camera, isZh));

  // 4. 环境/天气 (Environment)
  if (state.environment) parts.push(getVal(state.environment, isZh));
  if (state.weather) parts.push(getVal(state.weather, isZh));

  // 5. 色调 (Color)
  if (state.color) parts.push(getVal(state.color, isZh));

  // 6. 氛围/情感 (Mood)
  if (state.mood) parts.push(getVal(state.mood, isZh));

  // 7. 环境与光影 (Lighting)
  if (state.lighting) parts.push(getVal(state.lighting, isZh));

  // 8. 补充细节 (Extra)
  if (state.extra && state.extra.trim()) parts.push(state.extra.trim());

  // 9. 画质增强 (Quality)
  if (state.quality) parts.push(getVal(state.quality, isZh));

  return parts.filter(Boolean).join(isZh ? '，' : ', ');
};
