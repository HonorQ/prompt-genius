import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePromptStore } from '../store/usePromptStore';
import { Button } from '../components/ui/Button';
import { CardOption } from '../components/ui/CardOption';
import { 
  STYLE_OPTIONS, 
  COLOR_OPTIONS,
  MOOD_OPTIONS,
  LIGHTING_OPTIONS, 
  CAMERA_OPTIONS, 
  QUALITY_OPTIONS,
  COMPOSITION_OPTIONS,
  WEATHER_OPTIONS,
  ENVIRONMENT_OPTIONS,
  ACTION_OPTIONS,
  PROP_OPTIONS,
  RANDOM_SUBJECTS
} from '../data/options';
import { ChevronRight, ChevronLeft, CheckCircle2, Shuffle, Wand2 } from 'lucide-react';

const STEPS = [
  { id: 'subject', title: '画什么？' },
  { id: 'action', title: '加细节' },
  { id: 'style', title: '选画风' },
  { id: 'scene', title: '搭场景' },
  { id: 'feel', title: '定氛围' },
  { id: 'camera', title: '调光影' },
  { id: 'magic', title: '加魔法' },
];

// Helper to pick a random item from an array
const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export default function Wizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const state = usePromptStore();

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate('/result');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate('/');
    }
  };

  // "Surprise Me" feature for the current step
  const handleRandomizeCurrentStep = () => {
    switch (currentStep) {
      case 1: // Action & Prop
        state.setField('action', getRandomItem(ACTION_OPTIONS).value);
        state.setField('prop', getRandomItem(PROP_OPTIONS).value);
        break;
      case 2: // Style
        state.setField('style', getRandomItem(STYLE_OPTIONS).value);
        break;
      case 3: // Scene
        const setComp = Math.random() > 0.5;
        const setEnv = Math.random() > 0.5;
        const setWea = Math.random() > 0.5;
        
        if (!setComp && !setEnv && !setWea) {
           state.setField('environment', getRandomItem(ENVIRONMENT_OPTIONS).value);
        } else {
           if (setComp) state.setField('composition', getRandomItem(COMPOSITION_OPTIONS).value);
           if (setEnv) state.setField('environment', getRandomItem(ENVIRONMENT_OPTIONS).value);
           if (setWea) state.setField('weather', getRandomItem(WEATHER_OPTIONS).value);
        }
        break;
      case 4: // Mood
        state.setField('color', getRandomItem(COLOR_OPTIONS).value);
        state.setField('mood', getRandomItem(MOOD_OPTIONS).value);
        break;
      case 5: // Camera
        state.setField('lighting', getRandomItem(LIGHTING_OPTIONS).value);
        state.setField('camera', getRandomItem(CAMERA_OPTIONS).value);
        break;
      case 6: // Magic
        state.setField('quality', QUALITY_OPTIONS[0].value); // Always recommend the best
        break;
    }
  };

  // Quick preset for absolute beginners (fully randomized)
  const handleMagicPreset = () => {
    if (!state.subject) {
      state.setField('subject', getRandomItem(RANDOM_SUBJECTS));
    }
    
    if (Math.random() > 0.5) state.setField('action', getRandomItem(ACTION_OPTIONS).value);
    if (Math.random() > 0.5) state.setField('prop', getRandomItem(PROP_OPTIONS).value);
    state.setField('style', getRandomItem(STYLE_OPTIONS).value);
    state.setField('composition', getRandomItem(COMPOSITION_OPTIONS).value);
    
    if (Math.random() > 0.5) state.setField('environment', getRandomItem(ENVIRONMENT_OPTIONS).value);
    if (Math.random() > 0.5) state.setField('weather', getRandomItem(WEATHER_OPTIONS).value);
    
    state.setField('color', getRandomItem(COLOR_OPTIONS).value);
    state.setField('mood', getRandomItem(MOOD_OPTIONS).value);
    state.setField('lighting', getRandomItem(LIGHTING_OPTIONS).value);
    state.setField('camera', getRandomItem(CAMERA_OPTIONS).value);
    state.setField('quality', QUALITY_OPTIONS[0].value);
    
    navigate('/result');
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-full flex-1">
      {/* Progress Bar */}
      <div className="mb-8 sm:mb-12 overflow-x-auto pb-2">
        <div className="flex justify-between items-center mb-4 min-w-[600px]">
          {STEPS.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center gap-2 relative z-10 flex-1">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 shrink-0
                ${idx < currentStep ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]' : 
                  idx === currentStep ? 'bg-purple-500 text-white ring-4 ring-purple-500/20' : 
                  'bg-white/10 text-slate-500'}
              `}>
                {idx < currentStep ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : idx + 1}
              </div>
              <span className={`text-xs sm:text-sm font-medium whitespace-nowrap ${idx <= currentStep ? 'text-slate-200' : 'text-slate-500'}`}>
                {step.title}
              </span>
            </div>
          ))}
          {/* Connecting Line */}
          <div className="absolute top-4 sm:top-5 left-[5%] right-[5%] h-[2px] bg-white/10 -z-10">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 glass-panel rounded-3xl p-6 sm:p-10 min-h-[500px] flex flex-col relative overflow-hidden">
        
        {/* Magic preset button for absolute beginners - only show on step 1 */}
        {currentStep === 0 && (
           <div className="absolute top-6 right-6 z-20 hidden sm:block">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleMagicPreset}
                className="bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 transition-all hover:scale-105"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                我完全不懂，帮我一键盲盒！
              </Button>
           </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {/* Step 1: Subject */}
            {currentStep === 0 && (
              <div className="space-y-6 flex-1">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">第一步：你想画点什么？</h2>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                    告诉 AI 你的主角是谁，随便写点什么都可以！<br/>
                    <span className="text-purple-300 mt-2 block">
                      👉 比如：一只胖乎乎的橘猫 / 一个漂亮的赛博朋克女孩
                    </span>
                    <span className="text-slate-500 text-xs mt-1 block">（直接写中文即可）</span>
                  </p>
                </div>
                
                <div className="sm:hidden mb-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleMagicPreset}
                    className="w-full bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    我完全不懂，帮我一键盲盒！
                  </Button>
                </div>

                <textarea
                  value={state.subject}
                  onChange={(e) => state.setField('subject', e.target.value)}
                  placeholder="在这里输入你想画的主角..."
                  className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-6 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all text-lg shadow-inner"
                />
              </div>
            )}

            {/* Step 2: Action & Prop */}
            {currentStep === 1 && (
              <div className="space-y-6 flex-1 flex flex-col overflow-y-auto pr-2 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">第二步：加点动作和道具 <span className="text-sm font-normal text-slate-500 ml-2">(选填，可不选)</span></h2>
                    <p className="text-slate-400">主角在做什么？手里拿了什么？这会让画面更生动。</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleRandomizeCurrentStep} className="hidden sm:flex text-blue-300 hover:text-blue-200 shrink-0 ml-4">
                    <Shuffle className="w-4 h-4 mr-2" />
                    随便帮我搭配
                  </Button>
                </div>

                <div className="sm:hidden mb-2">
                   <Button variant="secondary" size="sm" onClick={handleRandomizeCurrentStep} className="w-full text-blue-300">
                      <Shuffle className="w-4 h-4 mr-2" />
                      随便帮我搭配
                   </Button>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-purple-300 mb-3">1. 主角在做什么？(动作)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {ACTION_OPTIONS.map((opt) => (
                        <CardOption
                          key={opt.id}
                          id={opt.id}
                          title={opt.label}
                          description={opt.description}
                          selected={state.action === opt.value}
                          onClick={() => state.setField('action', state.action === opt.value ? '' : opt.value)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-purple-300 mb-3">2. 手里拿了什么？(道具)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {PROP_OPTIONS.map((opt) => (
                        <CardOption
                          key={opt.id}
                          id={opt.id}
                          title={opt.label}
                          description={opt.description}
                          selected={state.prop === opt.value}
                          onClick={() => state.setField('prop', state.prop === opt.value ? '' : opt.value)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Style */}
            {currentStep === 2 && (
              <div className="space-y-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">第三步：选个喜欢的画风 <span className="text-sm font-normal text-slate-500 ml-2">(选填，可不选)</span></h2>
                    <p className="text-slate-400">你希望这张画长什么样？是像拍出来的真实照片，还是像动画片？</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleRandomizeCurrentStep} className="hidden sm:flex text-blue-300 hover:text-blue-200">
                    <Shuffle className="w-4 h-4 mr-2" />
                    随便帮我挑一个
                  </Button>
                </div>
                
                <div className="sm:hidden mb-2">
                   <Button variant="secondary" size="sm" onClick={handleRandomizeCurrentStep} className="w-full text-blue-300">
                      <Shuffle className="w-4 h-4 mr-2" />
                      不知道选哪个？随便挑一个
                   </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto pr-2 pb-4 flex-1 content-start">
                  {STYLE_OPTIONS.map((opt) => (
                    <CardOption
                      key={opt.id}
                      id={opt.id}
                      title={opt.label}
                      description={opt.description}
                      selected={state.style === opt.value}
                      onClick={() => state.setField('style', state.style === opt.value ? '' : opt.value)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Scene (Composition, Weather, Environment) */}
            {currentStep === 3 && (
              <div className="space-y-6 flex-1 flex flex-col overflow-y-auto pr-2 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">第四步：搭建场景 <span className="text-sm font-normal text-slate-500 ml-2">(选填，可全不选)</span></h2>
                    <p className="text-slate-400">给你的主角安排一个合适的环境和构图。</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleRandomizeCurrentStep} className="hidden sm:flex text-blue-300 hover:text-blue-200 shrink-0 ml-4">
                    <Shuffle className="w-4 h-4 mr-2" />
                    随便帮我搭配
                  </Button>
                </div>

                <div className="sm:hidden mb-2">
                   <Button variant="secondary" size="sm" onClick={handleRandomizeCurrentStep} className="w-full text-blue-300">
                      <Shuffle className="w-4 h-4 mr-2" />
                      不知道选哪个？随便帮我搭配
                   </Button>
                </div>
                  
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-purple-300 mb-3">1. 构图方式</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {COMPOSITION_OPTIONS.map((opt) => (
                        <CardOption
                          key={opt.id}
                          id={opt.id}
                          title={opt.label}
                          description={opt.description}
                          selected={state.composition === opt.value}
                          onClick={() => state.setField('composition', state.composition === opt.value ? '' : opt.value)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-purple-300 mb-3">2. 环境地点</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {ENVIRONMENT_OPTIONS.map((opt) => (
                        <CardOption
                          key={opt.id}
                          id={opt.id}
                          title={opt.label}
                          description={opt.description}
                          selected={state.environment === opt.value}
                          onClick={() => state.setField('environment', state.environment === opt.value ? '' : opt.value)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-purple-300 mb-3">3. 天气情况</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {WEATHER_OPTIONS.map((opt) => (
                        <CardOption
                          key={opt.id}
                          id={opt.id}
                          title={opt.label}
                          description={opt.description}
                          selected={state.weather === opt.value}
                          onClick={() => state.setField('weather', state.weather === opt.value ? '' : opt.value)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Color & Mood */}
            {currentStep === 4 && (
              <div className="space-y-6 flex-1 flex flex-col overflow-y-auto pr-2 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">第五步：定个色调和感觉 <span className="text-sm font-normal text-slate-500 ml-2">(选填，可全不选)</span></h2>
                    <p className="text-slate-400">颜色和感觉能决定画面的情绪，选一个你喜欢的调调。</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleRandomizeCurrentStep} className="hidden sm:flex text-blue-300 hover:text-blue-200 shrink-0 ml-4">
                    <Shuffle className="w-4 h-4 mr-2" />
                    随便帮我搭配
                  </Button>
                </div>

                <div className="sm:hidden mb-2">
                   <Button variant="secondary" size="sm" onClick={handleRandomizeCurrentStep} className="w-full text-blue-300">
                      <Shuffle className="w-4 h-4 mr-2" />
                      不知道选哪个？随便帮我搭配
                   </Button>
                </div>
                  
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-purple-300 mb-3">1. 画面颜色</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {COLOR_OPTIONS.map((opt) => (
                        <CardOption
                          key={opt.id}
                          id={opt.id}
                          title={opt.label}
                          description={opt.description}
                          selected={state.color === opt.value}
                          onClick={() => state.setField('color', state.color === opt.value ? '' : opt.value)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-purple-300 mb-3">2. 画面氛围</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {MOOD_OPTIONS.map((opt) => (
                        <CardOption
                          key={opt.id}
                          id={opt.id}
                          title={opt.label}
                          description={opt.description}
                          selected={state.mood === opt.value}
                          onClick={() => state.setField('mood', state.mood === opt.value ? '' : opt.value)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Environment & Camera */}
            {currentStep === 5 && (
              <div className="space-y-6 flex-1 flex flex-col overflow-y-auto pr-2 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">第六步：怎么打光？从哪拍？ <span className="text-sm font-normal text-slate-500 ml-2">(选填，可全不选)</span></h2>
                    <p className="text-slate-400">就像拍照一样，好光线和好角度能让画面瞬间变高级！</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleRandomizeCurrentStep} className="hidden sm:flex text-blue-300 hover:text-blue-200 shrink-0 ml-4">
                    <Shuffle className="w-4 h-4 mr-2" />
                    随便帮我搭配
                  </Button>
                </div>

                <div className="sm:hidden mb-2">
                   <Button variant="secondary" size="sm" onClick={handleRandomizeCurrentStep} className="w-full text-blue-300">
                      <Shuffle className="w-4 h-4 mr-2" />
                      不知道选哪个？随便帮我搭配
                   </Button>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-purple-300 mb-3">1. 打光方式</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {LIGHTING_OPTIONS.map((opt) => (
                        <CardOption
                          key={opt.id}
                          id={opt.id}
                          title={opt.label}
                          description={opt.description}
                          selected={state.lighting === opt.value}
                          onClick={() => state.setField('lighting', state.lighting === opt.value ? '' : opt.value)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-purple-300 mb-3">2. 镜头角度</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {CAMERA_OPTIONS.map((opt) => (
                        <CardOption
                          key={opt.id}
                          id={opt.id}
                          title={opt.label}
                          description={opt.description}
                          selected={state.camera === opt.value}
                          onClick={() => state.setField('camera', state.camera === opt.value ? '' : opt.value)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Quality & Extra */}
            {currentStep === 6 && (
              <div className="space-y-8 flex-1 overflow-y-auto pr-2 pb-4 max-h-[55vh]">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">第七步：加点魔法！ <span className="text-sm font-normal text-slate-500 ml-2">(选填，默认顶级画质)</span></h2>
                    <p className="text-slate-400">给 AI 下最后一道命令，让它把画质拉满，画面更好看！</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {QUALITY_OPTIONS.map((opt) => (
                      <CardOption
                        key={opt.id}
                        id={opt.id}
                        title={opt.label}
                        description={opt.description}
                        selected={state.quality === opt.value}
                        onClick={() => state.setField('quality', state.quality === opt.value ? '' : opt.value)}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">生成语言偏好</h2>
                    <p className="text-slate-400 text-sm mb-4">你想让 AI 生成中文提示词还是英文提示词？（目前大多数专业 AI 更懂英文）</p>
                    <div className="flex gap-4">
                      <Button 
                        variant={state.language === 'zh' ? 'primary' : 'outline'} 
                        onClick={() => state.setField('language', 'zh')}
                        className="flex-1"
                      >
                        生成中文提示词
                      </Button>
                      <Button 
                        variant={state.language === 'en' ? 'primary' : 'outline'} 
                        onClick={() => state.setField('language', 'en')}
                        className="flex-1"
                      >
                        生成英文提示词 (推荐)
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">还有什么想补充的？ (选填)</h2>
                    <p className="text-slate-400 text-sm">输入其他你想补充的细节...</p>
                  </div>
                  <input
                    type="text"
                    value={state.extra}
                    onChange={(e) => state.setField('extra', e.target.value)}
                    placeholder="例如：背景有飞翔的白鸽..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-6 border-t border-white/10 shrink-0 gap-4">
          <Button variant="ghost" onClick={handleBack} className="gap-2 w-full sm:w-auto order-2 sm:order-1">
            <ChevronLeft className="w-5 h-5" />
            {currentStep === 0 ? '返回首页' : '上一步'}
          </Button>
          
          <div className="flex gap-3 w-full sm:w-auto order-1 sm:order-2">
            {currentStep > 0 && currentStep < STEPS.length - 1 && (
               <Button 
                 variant="secondary" 
                 onClick={handleNext} 
                 className="flex-1 sm:flex-none"
               >
                 跳过这步
               </Button>
            )}
            <Button 
              onClick={handleNext} 
              className="gap-2 flex-1 sm:min-w-[140px] shadow-purple-500/50 hover:shadow-purple-500/80"
            >
              {currentStep === STEPS.length - 1 ? '✨ 生成提示词' : '下一步'}
              {currentStep < STEPS.length - 1 && <ChevronRight className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
