import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePromptStore } from '../store/usePromptStore';
import { generatePrompt } from '../utils/promptGenerator';
import { Button } from '../components/ui/Button';
import { Copy, Check, RotateCcw, ExternalLink, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  STYLE_OPTIONS, COMPOSITION_OPTIONS, WEATHER_OPTIONS, ENVIRONMENT_OPTIONS,
  COLOR_OPTIONS, MOOD_OPTIONS, LIGHTING_OPTIONS, CAMERA_OPTIONS, QUALITY_OPTIONS,
  ACTION_OPTIONS, PROP_OPTIONS
} from '../data/options';

// 帮助函数：从 options 数组中找到对应 value 的 label
const findLabel = (options: any[], value: string) => {
  if (!value) return null;
  const match = options.find(opt => opt.value === value);
  return match ? match.label : null;
};

export default function Result() {
  const navigate = useNavigate();
  const state = usePromptStore();
  const prompt = generatePrompt(state);
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  };

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(prompt);
      return;
    }
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      fallbackCopyTextToClipboard(prompt);
    }
  };

  const handleReset = () => {
    state.reset();
    navigate('/');
  };

  // 收集用户选择的所有标签用于展示
  const selectedTags = [
    { name: '主体', value: state.subject || '未填写' },
    { name: '动作', value: findLabel(ACTION_OPTIONS, state.action) },
    { name: '道具', value: findLabel(PROP_OPTIONS, state.prop) },
    { name: '画风', value: findLabel(STYLE_OPTIONS, state.style) },
    { name: '构图', value: findLabel(COMPOSITION_OPTIONS, state.composition) },
    { name: '环境', value: findLabel(ENVIRONMENT_OPTIONS, state.environment) },
    { name: '天气', value: findLabel(WEATHER_OPTIONS, state.weather) },
    { name: '色调', value: findLabel(COLOR_OPTIONS, state.color) },
    { name: '氛围', value: findLabel(MOOD_OPTIONS, state.mood) },
    { name: '打光', value: findLabel(LIGHTING_OPTIONS, state.lighting) },
    { name: '视角', value: findLabel(CAMERA_OPTIONS, state.camera) },
    { name: '画质', value: findLabel(QUALITY_OPTIONS, state.quality) },
    { name: '补充', value: state.extra },
  ].filter(tag => tag.value); // 过滤掉未选的

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center py-10 px-4 pb-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full glass-panel rounded-3xl p-6 sm:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-32 bg-purple-500/10 blur-[100px] pointer-events-none rounded-full" />
        
        {/* Header */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-4 mb-8 sm:mb-10">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20 mb-2">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            你的专属提示词已生成
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg">
            一键复制下方长文本，直接粘贴到各大 AI 绘画平台（如豆包、Midjourney）即可出图！
          </p>
        </div>

        {/* Prompt Result Box */}
        <div className="relative z-10 bg-black/40 border border-white/10 rounded-2xl p-5 sm:p-8 mb-6 group">
          <p className="text-base sm:text-xl text-slate-200 font-mono leading-relaxed break-words selection:bg-purple-500/30">
            {prompt}
          </p>
          
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className={`gap-2 transition-colors ${copied ? 'bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30' : 'bg-white/10 hover:bg-white/20'}`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? '复制成功！去粘贴吧' : '复制'}
            </Button>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-8">
          <Button
            size="lg"
            className={`w-full sm:w-auto gap-2 min-w-[240px] transition-all duration-300 ${copied ? 'bg-gradient-to-r from-green-600 to-emerald-600 shadow-green-500/30 border-green-500/20' : 'shadow-purple-500/50 hover:shadow-purple-500/80'}`}
            onClick={handleCopy}
          >
            {copied ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5" />}
            {copied ? '已复制！快去 AI 平台粘贴' : '一键复制提示词'}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto gap-2"
            onClick={handleReset}
          >
            <RotateCcw className="w-5 h-5" />
            再做一张
          </Button>
        </div>

        {/* Parameters Review (Educational for beginners) */}
        <div className="relative z-10 border border-white/10 rounded-2xl overflow-hidden mb-8">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="w-full bg-white/5 hover:bg-white/10 px-6 py-4 flex items-center justify-between transition-colors"
          >
            <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              这段提示词是怎么组合出来的？(点击查看你的配方)
            </span>
            {showDetails ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
          
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-black/20"
              >
                <div className="p-6 flex flex-wrap gap-2 sm:gap-3">
                  {selectedTags.map((tag, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/5">
                      <span className="text-xs text-slate-500">{tag.name}</span>
                      <span className="text-sm text-slate-200">{tag.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* External Links */}
        <div className="relative z-10 pt-8 border-t border-white/5 text-center">
          <h3 className="text-sm font-medium text-slate-400 mb-4">复制成功后，推荐在以下免费平台使用：</h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[
              { name: '豆包 (Doubao)', link: 'https://www.doubao.com' },
              { name: '腾讯元宝', link: 'https://yuanbao.tencent.com' },
              { name: '通义千问', link: 'https://tongyi.aliyun.com' },
              { name: 'Midjourney', link: '#' }
            ].map((platform) => (
              <a 
                key={platform.name} 
                href={platform.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs sm:text-sm transition-colors"
              >
                <span>{platform.name}</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
